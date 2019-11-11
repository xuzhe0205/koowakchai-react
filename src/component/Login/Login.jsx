import React, {Component} from 'react';
import './Login.css'
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";

class Login extends Component{
    render(){

        return (
            <div>
                <Form id="login">
                    <Form.Group controlId="formBasicUsernameOrEmail">
                        <FormControl type="text" id="usernameEmail"  placeholder="Username/Email" className="mr-sm-2" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <FormControl type="password" id="password" placeholder="Password" className="mr-sm-2" />
                    </Form.Group>
                    <Button variant="outline-success" id="loginBtn">Login</Button>
                </Form>

            </div>

        )
    }
}

export default Login;