import React, {Component} from 'react';
import Login from '../../Component/Login/Login';
import Signup from '../../Component/Signup/Signup';
import './LoginSignup.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Nav from "react-bootstrap/Nav";


class LoginSignup extends Component{
    constructor(props){
        super(props);
        this.state = {
            signup:false,
            login:true,
            open: false,
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(){
        this.setState({ open: true })
    }

    closeModal(){
        this.setState({ open: false })
    }




    switch(word){
        var su,li;
        if(word === "signup"){
            su = true;
            li = false;
        }
        else{
            li = true;
            su = false;
        }


        return this.setState({login:li,signup:su})

    }


    render() {
        let self = this;
        return(
            <div>
                <Button variant="light" onClick={this.openModal}  style={{width: '10rem', height: '3rem', marginBottom: '0.8rem'}}>
                    <strong>Login/Signup</strong>
                </Button>
                <Modal
                    show={this.state.open}
                    onHide={this.closeModal}
                    aria-labelledby="ModalHeader"
                    id="signupLoginModal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Welcome!
                        </Modal.Title>
                    </Modal.Header>
                    <div id="signupLoginDiv">
                        <div id="buttons">
                            <p id="signupButton" onClick={self.switch.bind(this, "signup")} className={self.state.signup ? "yellow":"blue"}>Sign Up</p>
                            <p id="loginButton" onClick={self.switch.bind(this, "login")} className={self.state.login ? "yellow":"blue"}> Login</p>
                        </div>

                        { self.state.signup? <Signup /> : null }

                        { self.state.login? <Login /> : null }

                    </div>
                    {/*<div style={largeshit}>shit!</div>*/}
                    {/*<Modal.Header closeButton>*/}
                    {/*    <Modal.Title>Modal heading</Modal.Title>*/}
                    {/*</Modal.Header>*/}
                    {/*<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>*/}
                    {/*<Modal.Footer>*/}
                    {/*    <Button variant="secondary" onClick={handleClose}>*/}
                    {/*        Close*/}
                    {/*    </Button>*/}
                    {/*    <Button variant="primary" onClick={handleClose}>*/}
                    {/*        Save Changes*/}
                    {/*    </Button>*/}
                    {/*</Modal.Footer>*/}
                </Modal>
            </div>


        );
    }
}

export default LoginSignup;