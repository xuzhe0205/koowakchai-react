import React, {Component} from 'react';
import './Home.css';
import axios from 'axios';
import user from '../../Model/user';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Header from '../../Component/Header/Header';
import Image from "react-bootstrap/Image";
import { Redirect } from 'react-router-dom';
import historyUrl from '../../History/history';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible: true,
            businessTypes:[],
            redirect: false,
            url: '',
            hasError: false
        }

    }

    componentWillMount(){
        if (user.authorization.length == 0){
            this.setState({ redirect: true, hasError: true });
        }
        const res = axios.get("http://localhost:8080/koowakchai/getAllBusinessTypes",
            {
                headers: {
                    'Authorization': user.authorization
                }
            }
        ).then(res => {
            this.setState({
               businessTypes: res.data.data
            });
            console.log(this.state.businessTypes);
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

    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    goBusiness(businessUrl){
        this.setState({
            url: businessUrl,
            redirect: true
        });
    }

    createBusinessCards(){
        let cards = [];
        let urls = [
            'https://static.thenounproject.com/png/27683-200.png',
            'https://static.thenounproject.com/png/148595-200.png',
            'https://static.thenounproject.com/png/713282-200.png'
        ];
        let businessTypes = [
            {
                image: "https://static.thenounproject.com/png/27683-200.png",
                desc: "Explore e-cigarette and alcohol!",
                url: "/store"
            },
            {
                image: "https://static.thenounproject.com/png/148595-200.png",
                desc: "We can take errands off your hands!",
                url: "/errands"
            },
            {
                image: "https://static.thenounproject.com/png/713282-200.png",
                desc: "Hop on and enjoy a speedy-safe ride!",
                url: "/travel"
            }
        ]
        for (const [index, value] of this.state.businessTypes.entries()) {
            cards.push(
                <div key={index} style={{marginTop: '2rem', height: '20rem' }}>
                    <Card style={{ width: '18rem' }} key={index}>
                        <Card.Img variant="top" src={businessTypes[index].image} style={{width:'8rem', height:'8rem', marginLeft: '5rem', marginTop: '1rem'}}/>
                        <Card.Body>
                            <Card.Title>{this.Capitalize(value)}</Card.Title>
                            <Card.Text>
                                {businessTypes[index].desc}
                            </Card.Text>
                            <Button variant="outline-success" onClick={this.goBusiness.bind(this,businessTypes[index].url)}>
                                <Image src="https://static.thenounproject.com/png/689826-200.png" rounded style={{width: '2rem', height: '2rem', cursor: 'pointer'}}/>
                            </Button>

                        </Card.Body>
                    </Card>
                </div>
            )
        }
        return cards;
    }

    render(){
        const redirect = this.state.redirect;
        const hasError = this.state.hasError;
        if (redirect) {
            if (hasError){
                return <Redirect to={{ pathname: '/errorPage', state: { authorization: user.authorization, yourError: "authentication"} }}/>
            }
            historyUrl.push("/home");
            return <Redirect to={{ pathname: this.state.url, state: { authorization: user.authorization} }}/>
        }
        return(
            <div>
                <Header authorization={user.authorization} backBtn="hidden" userBtn="visible" currentPath="/home"/>
                <div className="flex-container">
                    {this.createBusinessCards()}
                </div>
            </div>
        );
    }

}

export default Home;