import React, {Component} from 'react'
import user from "../../Model/user";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Header from "../../Component/Header/Header";

class ShoppingCart extends Component{
    constructor(props){
        super(props);
        this.state = {
            cartItems: []
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
            console.log('page cart items: '+this.state.cartItems);
        })
    }

    createCartCards(){
        let cards = [];
        for (const [index, value] of this.state.cartItems.entries()) {
            cards.push(
                <InputGroup className="mb-3" key={index}>
                    <InputGroup.Prepend>
                        <InputGroup.Checkbox aria-label="Checkbox for following text input"/>
                    </InputGroup.Prepend>
                    <FormControl aria-label="Text input with checkbox" value={value["itemName"]+"  $"+value["price"]+"  quantity: " + value["quantity"]} />
                </InputGroup>
            );

        }
        return cards;

    }

    render(){
        return(
            <div>
                <Header authorization={user.authorization} backBtn="visible" userBtn="visible" currentPath="/shoppingCart"/>
                {this.createCartCards()}
            </div>
        );
    }
}

export default ShoppingCart;