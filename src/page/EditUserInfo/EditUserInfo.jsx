import React, {Component} from 'react';
import './EditUserInfo.css';
import axios from 'axios';
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import Header from "../../Component/Header/Header";
import user from "../../Model/user";
import historyUrl from "../../History/history";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { ToastContainer, toast } from 'react-toastify';
import Wallet from "../../Component/Wallet/Wallet";

class EditUserInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: user.userUrl,
            selectedFile: null,
            showNewPayment: 'none',
            showWallet: 'block',
        };

    }

    notify(){
        toast.info("Your account info has been updated 😬");
    };



    doUpdateUser(){

        const formData = new FormData()
        formData.append(
            'myFile',
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        console.log('???!!!  ' + formData);
        const res = axios.post("http://localhost:8080/koowakchai/user/updateUserInfo", null,
            {
                headers: {
                    'Authorization': user.authorization
                },
                params: {
                    authorization: user.authorization,
                    userPhone: this.phoneNumber.current.value,
                    email: this.email.current.value,
                    userUrl: this.state.imagePreviewUrl
                },
            }
        ).then(res => {
            user.email = this.email.current.value;
            user.phoneNum = this.phoneNumber.current.value;
            this.notify();
        })
    }

    fileChangedHandler(event){
        // let file = event.target.files[0];
        // var x = document.getElementById("myFile");
        // var txt = "";
        // if ('files' in x) {
        //     for (var i = 0; i < x.files.length; i++) {
        //         var myFile = x.files[i];
        //         if ('name' in myFile) {
        //             txt += myFile.name;
        //         }
        //     }
        // }
        let file = event.target.files[0];
        this.setState({ selectedFile: file })

        let reader = new FileReader();
        reader.onloadend= () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        console.log(this.state.imagePreviewUrl);
        reader.readAsDataURL(file)

    }





    render(){
        return(
            <div >
                <Header authorization={user.authorization} backBtn="visible" userBtn="hidden" currentPath="/editUserInfo"/>
                <p>heiheihei: {historyUrl}</p>
                <ToastContainer  position={toast.POSITION.TOP_CENTER} autoClose={3000} style={{fontSize: '20px'}}/>
                <Accordion defaultActiveKey="0" style={{marginTop: '3rem'}}>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            <Image src="https://static.thenounproject.com/png/2511431-200.png" rounded style={{width: '2rem', height: '2rem', marginRight: '1rem'}}/>
                            Edit Account Info
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <div style={{border: '1px dashed black', width: '10rem', height: '11rem', marginLeft: '40%'}}>
                                    <Image src={this.state.imagePreviewUrl} thumbnail/>
                                </div>
                                <Form>
                                    <div style={{alignItems: 'center'}}>
                                        <Form.Group>
                                            <FormControl type="text" id="phoneNumber"  placeholder={user.phoneNum} className="mr-sm-2" ref={this.phoneNumber}/>
                                        </Form.Group>
                                        <Form.Group>
                                            <FormControl type="email" id="email"  placeholder={user.email} className="mr-sm-2" ref={this.email}/>
                                        </Form.Group>
                                        <Form.Group id="fileUpload">
                                            <Badge variant="light" style={{fontSize: '15px'}}>Upload your profile: </Badge>
                                            <input type="file" className="mr-sm-2" id="myFile" onChange={this.fileChangedHandler.bind(this)}/>
                                        </Form.Group>
                                        <Button variant="outline-warning" id="saveBtn" type="button" onClick={this.doUpdateUser.bind(this)}>Save</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            <Image src="https://static.thenounproject.com/png/848311-200.png" rounded style={{width: '2rem', height: '2rem', marginRight: '1rem'}}/>
                            Edit Payment Info
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <div>
                                    <div className="flex-container">
                                        <Wallet key={this.state.requirementKey} placeOrder="none" editInfo="block"/>
                                    </div>
                                </div>



                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>

            </div>
        );
    }
}

export default EditUserInfo;