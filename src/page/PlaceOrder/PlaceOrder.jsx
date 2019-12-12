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
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import placedProductsCache from "../../Model/placedProducts";
import Form from "react-bootstrap/Form";
import Wallet from "../../Component/Wallet/Wallet";
import Container from "react-bootstrap/Container";
import { Redirect } from 'react-router-dom';


class PlaceOrder extends Component{
    constructor(props){
        super(props);
        this.state = {
            placedProducts: placedProductsCache,
            addrId: 0,
            addrBorder: '',
            paymentBorder: '',
            redirect: false,
            hasError: false
        };
        console.log(this.state.placedProducts)
        this.recipName = React.createRef();
        this.recipPhone = React.createRef();
        this.recipAddress = React.createRef();
    };


    componentWillMount(){
        if (user.authorization.length == 0){
            this.setState({ redirect: true, hasError: true });
        }
    }


    createPlacedProductsCards(){
        let cards = [];
        for (const [index, value] of this.state.placedProducts.entries()) {
            cards.push(
                <ListGroup.Item key={index}>{value["itemName"] + " $" + value["price"] + " quantity: " + value["quantity"]}</ListGroup.Item>
            );
        }

        return cards;
    }

    notify(){
        toast.info("Thanks! Your orders are completed 🎆");
    };

    makePayment(){
        let orderIds = this.props.location.state.placedOrderIds;
        let completeOrdeIdsStr = orderIds.join(',');
        console.log('yoyoyo: ' + completeOrdeIdsStr);
        const res = axios.post("http://localhost:8080/koowakchai/user/updateOrders", null,
            {
                headers: {
                    'Authorization': user.authorization
                },
                params: {
                    authorization: user.authorization,
                    orderIds: completeOrdeIdsStr,
                    paymentId: user.currentPayment["id"],
                    addrId: this.state.addrId
                },
            }
        ).then(res => {
            alert("Order completed!")
            this.notify();
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

    saveAddress(){
        const res = axios.post("http://localhost:8080/koowakchai/user/updateAddress", null,
            {
                headers: {
                    'Authorization': user.authorization
                },
                params: {
                    authorization: user.authorization,
                    recipientPhone: this.recipPhone.current.value,
                    recipientName: this.recipName.current.value,
                    fullAddr: this.recipAddress.current.value
                },
            }
        ).then(res => {
            this.setState({ addrId: res.data.data, addrBorder: '3px solid green' });
            console.log("your address Id: " + this.state.addrId);
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

    render(){
        const redirect = this.state.redirect;
        const hasError = this.state.hasError;
        if (redirect) {
            if (hasError) {
                return <Redirect to={{
                    pathname: '/errorPage',
                    state: {authorization: user.authorization, yourError: "authentication"}
                }}/>
            }
        }
        return(
            <div>
                <Header authorization={user.authorization} backBtn="visible" userBtn="visible" currentPath="/placeOrder"/>
                <div className="flex-container">
                    <ToastContainer  position={toast.POSITION.TOP_CENTER} autoClose={3000} style={{fontSize: '20px'}}/>
                    <Card body style={{width: '40rem'}}>
                        <h2><Badge variant="secondary">Your orders:</Badge></h2>
                        <ListGroup>
                            {this.createPlacedProductsCards()}
                        </ListGroup>
                    </Card >
                    <Card body style={{width: '40rem', marginBottom: '1.5rem', marginTop: '1.5rem', border: this.state.addrBorder}}>
                        <h2><Badge variant="secondary">Shipping Address:</Badge></h2>
                        <Form>
                            <Form.Control type="text" id="recipName" placeholder="Recipient name" ref={this.recipName}/>
                            <br />
                            <Form.Control type="text" id="recipPhone" placeholder="Recipient phone number" ref={this.recipPhone}/>
                            <br />
                            <Form.Control type="text" id="recipAddr" placeholder="Recipient full address" ref={this.recipAddress}/>
                            <Button variant="info" type="button" onClick={this.saveAddress.bind(this)}>
                                Save
                            </Button>
                        </Form>
                    </Card>

                    <Card body>
                        <h2><Badge variant="secondary">Your Payment</Badge></h2>
                        <Wallet placeOrder="block" editInfo="none"/>
                    </Card>

                </div>
                <br/>
                <Button variant="dark" size="lg" onClick={this.makePayment.bind(this)} style={{marginBottom: '1rem'}}>Make payment</Button>
                <br/>
            </div>

        );
    }

}

export default PlaceOrder;