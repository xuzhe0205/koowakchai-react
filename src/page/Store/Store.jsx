import React, {Component} from 'react';
import './Store.css';
import axios from 'axios';
import Header from '../../Component/Header/Header';
import historyUrl from '../../History/history';
import Image from "react-bootstrap/Image";
import user from "../../Model/user";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';


class Store extends Component{
    constructor(props){
        super(props);
        this.state = {
            storeProductTypes: [],
            redirect: false,
            url: '',
            hasError: false
        };
        this.phoneNumber = React.createRef();
        this.profileUrl = React.createRef();
    }

    componentWillMount(){
        if (user.authorization.length == 0){
            this.setState({ redirect: true, hasError: true });
        }
        const res = axios.get("http://localhost:8080/koowakchai/store/getProductTypes",
            {
                headers: {
                    'Authorization': user.authorization
                },
                params: {
                    subtypeId: 1
                },
            }
        ).then(res => {
            this.setState({
                storeProductTypes: res.data.data
            });
            console.log(this.state.storeProductTypes);
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

    goProductPage(path){
        this.setState({
            redirect: true,
            url: path
        })
    }

    createStoreCards(){
        let cards = [];
        let profileUrl = [
            "https://static.thenounproject.com/png/532799-200.png",
            "https://static.thenounproject.com/png/1417054-200.png"
        ]
        let pathUrl = [
            "/eCigarette",
            "/liquor"
        ]
        for (const [index, value] of this.state.storeProductTypes.entries()) {
            cards.push(
                <div key={index} style={{marginTop: '3rem'}}>
                    <Card style={{ width: '20rem' }} key={index}>
                        <Card.Img variant="top" src={profileUrl[index]} onClick={this.goProductPage.bind(this, pathUrl[index])} style={{width:'8rem', height:'8rem', marginLeft: '5rem', marginTop: '1rem'}}/>
                        <Card.Body>
                            <Card.Title>{this.Capitalize(value['subBusinessName'])}</Card.Title>
                            <Card.Text>
                            </Card.Text>
                            {/*<Button variant="outline-success">*/}
                            {/*    <Image src="https://static.thenounproject.com/png/689826-200.png" rounded style={{width: '2rem', height: '2rem', cursor: 'pointer'}}/>*/}
                            {/*</Button>*/}

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
            if (hasError) {
                return <Redirect to={{
                    pathname: '/errorPage',
                    state: {authorization: user.authorization, yourError: "authentication"}
                }}/>
            }
            else{
                historyUrl.push("/store");
                return <Redirect to={{ pathname: this.state.url, state: { authorization: user.authorization} }}/>
            }

        }
        return(
            <div>
                <Header authorization={this.props.location.state.authorization} backBtn="visible" userBtn="visible" currentPath="/store"/>
                <p>path: {historyUrl[historyUrl.length-1]}</p>
                <div className="flex-container">
                    {this.createStoreCards()}
                </div>

            </div>
        );
    }
}

export default Store;