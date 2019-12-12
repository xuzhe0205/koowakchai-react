import React, {Component} from 'react';
import './Login.css'
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import user from '../../Model/user.js';
import history from '../../History/history';
import Home from '../../Page/Home/Home';
import { Redirect } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            url: '',
            promptAlert: 'none'
        };
        this.username = React.createRef();
        this.password = React.createRef();
        this.roleName = React.createRef();
    };

    doLogin(event){
        event.preventDefault();
        let url = '';
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
            if (res.data.data == null){
                this.setState({ promptAlert: 'block' });
            }
            else{
                user.authorization = res.data.data[0];
                user.email = res.data.data[1]["email"];
                user.userUrl = res.data.data[1]["userUrl"];
                if (userInfo.roleName == "Customer"){
                    url = '/home';
                }
                else if (userInfo.roleName == "Store Staff"){
                    url = '/staffHome';
                }
                this.setState({ redirect: true, url: url });
            }

        })

    }

    dismissAlert(){
        this.setState({ promptAlert: 'none' });
    }


    render(){
        let redirect = this.state.redirect;
        if (redirect) {
            return <Redirect to={{ pathname: this.state.url, state: { authorization: user.authorization} }}/>;
        }

        return (
            <div>
                <Alert variant="danger" onClick={this.dismissAlert.bind(this)} style={{display: this.state.promptAlert}}>
                    Login failed: Username or password incorrect😒
                </Alert>
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