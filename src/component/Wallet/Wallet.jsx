import React, {Component} from 'react'
import user from "../../Model/user";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import Card from "react-bootstrap/Card";
import './Wallet.css';

class Wallet extends Component{
    constructor(props){
        super(props);
        this.state = {
            paymentList: []
        };
    };

    componentWillMount(){
        const res = axios.get("http://localhost:8080/koowakchai//user/getUserPaymentList",
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
                paymentList: res.data.data
            });
            console.log('paymentList: ' + this.state.paymentList);
        })
    }

    createPaymentCards(){
        let cards = [];
        for (const [index, value] of this.state.paymentList.entries()) {
            cards.push(
                <Card style={{ width: '15rem', marginRight: '10px', marginBottom: '1rem'}} key={index}>
                    <Card.Body>
                        <Card.Title>Cardholder: {value["cardholderName"]}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{value["cardNum"]}</Card.Subtitle>

                        <Card.Link href="#">Edit</Card.Link>
                        <Card.Link href="#">Delete</Card.Link>
                    </Card.Body>
                </Card>
            )
        }
        return cards;
    }


    render(){

        return(
            <div className="flex-container">
                {this.createPaymentCards()}
            </div>
        )
    }


}

export default Wallet;
