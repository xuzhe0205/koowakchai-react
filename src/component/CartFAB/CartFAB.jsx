import React, {Component} from 'react'
import { Container, Button, lightColors, darkColors, Link } from 'react-floating-action-button'
import user from "../../Model/user";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import ShoppingCart from "../../Page/ShoppingCart/ShoppingCart";
import { Redirect } from 'react-router-dom';
import historyUrl from "../../History/history";

class CartFAB extends Component{
    constructor(props){
        super(props);
        this.state = {
            cartItems: [],
            redirect: false,
            url: ''
        };
    };

    goShoppingCart(){
        this.setState({
            redirect: true,
            url: '/shoppingCart'
        })
    }




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
            console.log(this.state.cartItems);
        })
    }



    render(){
        const redirect = this.state.redirect;
        if (redirect){
            historyUrl.push(this.props.productPageUrl);
            return <Redirect to={{ pathname: 'shoppingCart', state: { authorization: user.authorization} }}/>
        }
        return (
            <Container>
                <Button
                    tooltip="Go to shopping cart page!"
                    styles={{backgroundColor: darkColors.lighterRed, color: lightColors.white, width: '5rem', height: '5em'}}
                    onClick={this.goShoppingCart.bind(this)}
                >
                    <Image src="https://static.thenounproject.com/png/2339141-200.png" rounded style={{width: '3rem', height: '3em'}} onClick={this.goShoppingCart.bind(this)}/>
                    <Badge variant="light" onClick={this.goShoppingCart.bind(this)}>{this.state.cartItems.length}</Badge>

                </Button>

            </Container>
        )
    }

}

export default CartFAB;