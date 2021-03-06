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
            placedOrderIds: [],
            hasError: false
        };
    };

    componentWillMount(){
        if (user.authorization.length == 0){
            this.setState({ redirect: true, hasError: true });
        }
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
        }).catch(error => {
            let errStr = "";
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                errStr = "response data: " + error.response.data + "; response status: " + error.response.status + "; response headers: " + error.response.headers;


            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the
                // browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                errStr = "error request: " + error.request;
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                errStr = "error message: " + error.message;
            }
            console.log(error.config);
            return <Redirect to={{ pathname: '/errorPage', state: { authorization: user.authorization, yourError: errStr} }}/>
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

        }).catch(error => {
            let errStr = "";
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                errStr = "response data: " + error.response.data + "; response status: " + error.response.status + "; response headers: " + error.response.headers;


            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the
                // browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                errStr = "error request: " + error.request;
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                errStr = "error message: " + error.message;
            }
            console.log(error.config);
            return <Redirect to={{ pathname: '/errorPage', state: { authorization: user.authorization, yourError: errStr} }}/>
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
        const redirect  = this.state.redirect;
        const hasError = this.state.hasError;
        if (redirect) {
            if (hasError) {
                return <Redirect to={{
                    pathname: '/errorPage',
                    state: {authorization: user.authorization, yourError: "authentication"}
                }}/>
            }
            else{
                historyUrl.push("/shoppingCart");
                return <Redirect to={{ pathname: '/placeOrder', state: { authorization: user.authorization, placedOrderIds: this.state.placedOrderIds} }}/>;
            }

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