import React, {Component} from 'react'
import user from "../../Model/user";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import Card from "react-bootstrap/Card";
import './Wallet.css';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { ToastContainer, toast } from 'react-toastify';
import payment from "../../Model/payment";

class Wallet extends Component{
    constructor(props){
        super(props);
        this.state = {
            paymentList: [],
            showNewPayment: 'none',
            showWallet: 'block',
            requirementKey: Math.random(),
            showCurrentPayment:'none'
        };
        this.phoneNumber = React.createRef();
        this.email = React.createRef();
        this.cardHolderName = React.createRef();
        this.cardNumber = React.createRef();
        this.zipcode = React.createRef();
        this.mm = React.createRef();
        this.yy = React.createRef();
        this.cvv = React.createRef();
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

    selectPayment(selectedPayment){
        user.currentPayment = selectedPayment;
        this.setState({ showCurrentPayment: 'block', showWallet: 'none', showNewPayment: 'none'});
        this.notify("New payment has been saved and selected 😜")
    }

    addNewPayment(){
        this.setState({
            showNewPayment: 'block',
            showWallet: 'none'
        })
    }

    chooseAgain(){
        this.setState({ showWallet: 'block', showCurrentPayment: 'none'});
        user.currentPayment = {};
    }

    notify(message){
        toast.info(message);
    };

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
                showWallet:'block',
            });
            this.notify("New payment has been added 😬");
            this.componentWillMount();
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
                        <span style={{display: this.props.editInfo}}>
                            <Card.Link href="#">Edit</Card.Link>
                            <Card.Link href="#">Delete</Card.Link>
                        </span>
                        <span style={{display: this.props.placeOrder}}>
                            <Button onClick={this.selectPayment.bind(this, value)}>Select</Button>
                        </span>

                    </Card.Body>
                </Card>
            )
        }
        return cards;
    }

    cancelAddNew(){
        this.setState({ showWallet: 'block', showNewPayment: 'none' });
    }


    render(){

        return(
            <Container>
                <ToastContainer  position={toast.POSITION.TOP_CENTER} autoClose={3000} style={{fontSize: '20px'}}/>
                <div style={{display: this.state.showCurrentPayment}}>
                    <Card style={{ width: '15rem', marginRight: '10px', marginBottom: '1rem'}}>
                        <Card.Body>
                            <Card.Title>Cardholder: {user.currentPayment["cardholderName"]}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{user.currentPayment["cardNum"]}</Card.Subtitle>
                        </Card.Body>
                    </Card>
                    <Image src="https://static.thenounproject.com/png/1002094-200.png" onClick={this.chooseAgain.bind(this)} style={{width: '3rem', height: '3rem'}}/>

                </div>
                <div style={{display: this.state.showWallet}} key={this.state.requirementKey}>
                    <div className="flex-container" >
                        {this.createPaymentCards()}
                        <Image src="https://static.thenounproject.com/png/3012947-200.png" style={{width: '2rem', height: '2rem', marginTop: '3rem'}} onClick={this.addNewPayment.bind(this)}/>

                    </div>

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
                        <div style={{display: 'flex', justifyContent: 'space-around'}}>
                            <Button onClick={this.doUpdatePayment.bind(this)} style={{width: '15rem'}}> Confirm
                            </Button>
                            <Button variant="secondary" onClick={this.cancelAddNew.bind(this)} style={{width: '15rem'}}>Cancel</Button>
                        </div>

                    </form>

                </div>
            </Container>


        )
    }


}

export default Wallet;
