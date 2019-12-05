import React, {Component} from 'react';
import './Login.css'
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import user from '../../Model/user.js';
import history from '../../History/history';
import Home from '../../Page/Home/Home';
import { Redirect } from 'react-router-dom';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false
        };
        this.username = React.createRef();
        this.password = React.createRef();
        this.roleName = React.createRef();
    };

    doLogin(event){
        event.preventDefault();
        const userInfo = {
            roleName: this.roleName.current.value,
            username: this.username.current.value,
            password: this.password.current.value
        };
        console.log(userInfo);
        var config = {
            headers: {'Access-Control-Allow-Origin': '*'}
        };
        const res = axios.post('http://localhost:8080/koowakchai/user/login?username=' + userInfo.username + '&password=' + userInfo.password + '&roleName='+ userInfo.roleName, config).then(res => {
            console.log(res);
            console.log('response data: ' + res.data);
            user.authorization = res.data.data;
            this.setState({ redirect: true });
        })

    }


    render(){
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/home'/>;
        }

        return (
            <div>
                <Form id="login">
                    <Form.Group controlId="formBasicUsername" id="roleSelect">
                        <Form.Control as="select" ref={this.roleName}>
                            <option value="Customer">Customer</option>
                            <option value="Driver">Driver</option>
                            <option value="Deliveryman">Deliveryman</option>
                            <option value="Store Staff">Store Staff</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicUsernameOrEmail">
                        <FormControl type="text" id="username"  placeholder="Username" className="mr-sm-2" ref={this.username}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <FormControl type="password" id="password" placeholder="Password" className="mr-sm-2" ref={this.password}/>
                    </Form.Group>
                    <Button variant="outline-success" id="loginBtn" type="submit" onClick={this.doLogin.bind(this)}>Login</Button>
                </Form>

            </div>

        )
    }
}

export default Login;