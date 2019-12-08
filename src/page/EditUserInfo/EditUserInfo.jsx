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
            requirementKey: Math.random()
        };
        this.phoneNumber = React.createRef();
        this.email = React.createRef();
        this.cardHolderName = React.createRef();
        this.cardNumber = React.createRef();
        this.zipcode = React.createRef();
        this.mm = React.createRef();
        this.yy = React.createRef();
        this.cvv = React.createRef();
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



    addNewPayment(){
        this.setState({
            showNewPayment: 'block',
            showWallet: 'none'
        })
    }


    doUpdatePayment(){
        const res = axios.post("http://localhost:8080/koowakchai/user/updatePaymentInfo", null,
            {
                headers: {
                    'Authorization': user.authorization
                },
                params: {
                    authorization: user.authorization,
                    cardholderName: this.cardHolderName.current.value,
                    cardNum: this.cardNumber.current.value,
                    zipcode: this.zipcode.current.value,
                    cvv: this.cvv.current.value,
                    expDate: this.mm.current.value + this.yy.current.value
                },
            }
        ).then(res => {
            console.log("tried addToCart: " + res.data);
            // Force a render with a simulated state change
            this.setState({
                requirementKey: Math.random(),
                showNewPayment: 'none',
                showWallet:'block'
            });
            this.notify();
        })
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
                                <div style={{display: this.state.showWallet}}>
                                    <div className="flex-container">
                                        <Wallet key={this.state.requirementKey}/>
                                    </div>
                                    <Image src="https://static.thenounproject.com/png/3012947-200.png" style={{width: '2rem', height: '2rem', marginTop: '3rem'}} onClick={this.addNewPayment.bind(this)}/>


                                </div>

                                <div style={{display: this.state.showNewPayment}}>
                                    <form role="form">
                                        <div className="form-group">
                                            <label htmlFor="username">Cardholder's name</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <Image src="https://static.thenounproject.com/png/1325922-200.png" style={{width: '1.5rem', height: '1.5rem'}}/>
                                                </span>
                                                </div>
                                                <input type="text" className="form-control" name="username" placeholder=""
                                                       required="" ref={this.cardHolderName}/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="cardNumber">Card number</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <Image src="https://static.thenounproject.com/png/2643818-200.png" style={{width: '1.5rem', height: '1.5rem'}}/>
                                                </span>
                                                </div>
                                                <input type="text" className="form-control" name="cardNumber"
                                                       placeholder="" ref={this.cardNumber}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <label data-toggle="tooltip" title=""
                                                           data-original-title="3 digits code on back side of the card">ZipCode <i
                                                        className="fa fa-question-circle"></i></label>
                                                    <input className="form-control" required="" type="text" ref={this.zipcode}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-8">
                                                <div className="form-group">
                                                    <label><span className="hidden-xs">Expiration</span> </label>
                                                    <div className="form-inline">
                                                        <select className="form-control" style={{width:"45%"}} ref={this.mm}>
                                                            <option>01</option>
                                                            <option>02</option>
                                                            <option>03</option>
                                                            <option>04</option>
                                                            <option>05</option>
                                                            <option>06</option>
                                                            <option>07</option>
                                                            <option>08</option>
                                                            <option>09</option>
                                                            <option>10</option>
                                                            <option>11</option>
                                                            <option>12</option>

                                                        </select>
                                                        <span style={{width:"10%", textAlign: "center"}}> / </span>
                                                        <select className="form-control" style={{width:"45%"}} ref={this.yy}>
                                                            <option>19</option>
                                                            <option>20</option>
                                                            <option>21</option>
                                                            <option>22</option>
                                                            <option>23</option>
                                                            <option>24</option>
                                                            <option>25</option>

                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <label data-toggle="tooltip" title=""
                                                           data-original-title="3 digits code on back side of the card" id="cvvLabel">
                                                        CVV <Image id="cvvQuestion" src="https://static.thenounproject.com/png/949374-200.png" style={{width: '1rem', height: '1rem'}}/>
                                                        <span id = "cvvText">3 digits code on back side of the card</span>

                                                    </label>
                                                    <input className="form-control" required="" type="text" ref={this.cvv}/>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="subscribe btn btn-primary btn-block" type="button" onClick={this.doUpdatePayment.bind(this)}> Confirm
                                        </button>
                                    </form>

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