import React, {Component} from 'react'
import user from "../../Model/user";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Header from "../../Component/Header/Header";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import historyUrl from "../../History/history";
import placedProductsCache from "../../Model/placedProducts";


class ShoppingCart extends Component{
    constructor(props){
        super(props);
        this.state = {
            cartItems: [],
            checkItemsMap:{},
            redirect: false,
            placedProducts: [],
            placedOrderIds: []
        };
    };

    componentWillMount(){
        const res = axios.get("http://localhost:8080/koowakchai/store/getCartItem",
            {
                headers: {
                    'Authorization': user.authorization
                },
                params: {
                    authorization: user.authorization
                },
            }
        ).then(res => {
            this.setState({
                cartItems: res.data.data
            });
            let tempMap = {};
            for (const [index, value] of this.state.cartItems.entries()) {
                tempMap[value["cartId"]] = false;
            }
            this.setState({
                checkItemsMap: tempMap
            })
            // console.log(this.state.checkItemsMap);
        })
    }

    notify(){
        toast.success("Selected items have been placed, go to checkout 💰");
    };

    handleCheck(cartId){
        let tempMap = this.state.checkItemsMap;
        tempMap[cartId] = !this.state.checkItemsMap[cartId]

        this.setState({
            checkItemsMap: tempMap
        })
        console.log(this.state.checkItemsMap);
    }

    doPlaceOrder(){
        let placeItems = [];
        let finalPlacedItems = [];
        while(placedProductsCache.length > 0) {
            placedProductsCache.pop();
        }
        for (let cartId of Object.keys(this.state.checkItemsMap)){
            if (this.state.checkItemsMap[cartId]){
                placeItems.push(Number(cartId));
                for (const [index, value] of this.state.cartItems.entries()) {
                    if (value["cartId"] == Number(cartId)){
                        finalPlacedItems.push(value);
                        placedProductsCache.push(value);
                    }
                }
            }
        }
        let cartIdsStr = placeItems.join(',');
        console.log(cartIdsStr);
        const res = axios.post("http://localhost:8080/koowakchai/store/placeOrder", null,
            {
                headers: {
                    'Authorization': user.authorization
                },
                params: {
                    cartEntityId: cartIdsStr,
                    remark: "???"
                }
            }
        ).then(res => {
            this.notify();
            console.log("tried place order: " + res.data);
            this.setState({ redirect: true, placedOrderIds: res.data.data });

        })
    }

    createCartCards(){
        let cards = [];
        for (const [index, value] of this.state.cartItems.entries()) {
            cards.push(
                <InputGroup className="mb-3" key={index}>
                    <InputGroup.Prepend>
                        <InputGroup.Checkbox aria-label="Checkbox for following text input" onChange={this.handleCheck.bind(this, value["cartId"])}/>
                    </InputGroup.Prepend>
                    <FormControl aria-label="Text input with checkbox" value={value["itemName"]+"  $"+value["price"]+"  quantity: " + value["quantity"]} />
                </InputGroup>
            );

        }
        return cards;

    }

    render(){
        const { redirect } = this.state;

        if (redirect) {
            historyUrl.push("/shoppingCart");
            return <Redirect to={{ pathname: '/placeOrder', state: { authorization: user.authorization, placedOrderIds: this.state.placedOrderIds} }}/>;
        }
        return(
            <div>
                <Header authorization={user.authorization} backBtn="visible" userBtn="visible" currentPath="/shoppingCart"/>
                <ToastContainer  position={toast.POSITION.TOP_CENTER} autoClose={3000} style={{fontSize: '20px'}}/>
                <div style={{alignItems: 'center', width: '80%'}}>
                    {this.createCartCards()}

                </div>
                <Button variant="outline-warning" id="saveBtn" type="button" onClick={this.doPlaceOrder.bind(this)}>Place Order</Button>
            </div>
        );
    }
}

export default ShoppingCart;