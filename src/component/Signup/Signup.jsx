import React, {Component} from 'react';
import './Signup.css';
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import user from '../../Model/user.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedDate: null,
            gender: null,
            email: null
        };
        console.log('before: ',this.state.startDate);
        this.handleChange = this.handleChange.bind(this);
        this.setGender = this.setGender.bind(this);
        this.username = React.createRef();
        this.password = React.createRef();
        this.dob = React.createRef();
        this.roleName = React.createRef();
        this.email = React.createRef();
        this.gender = React.createRef();
        this.confirmPassword = React.createRef();
    };

    handleChange(date) {
        this.setState({
            selectedDate: date
        });
    }

    setGender(event) {
        let genderr = event.target.value;
        this.setState({
            gender: genderr
        })
    }

    notify(){toast.success("Congrats! You have successfully registered ✌️")};

    doSignup(event) {

        event.preventDefault();
        let userDOB = this.state.selectedDate.getFullYear()+'/'+(this.state.selectedDate.getMonth()+1) + '/' + this.state.selectedDate.getDate();
        const userInfo = {
            username: this.username.current.value,
            password: this.password.current.value,
            confirmPassword: this.confirmPassword.current.value,
            email: this.email.current.value,
            roleName: this.roleName.current.value,
            dob: userDOB,
            gender: this.state.gender
        };
        console.log(userInfo);
        var config = {
            headers: {'Access-Control-Allow-Origin': '*'}
        };
        const res = axios.post('http://localhost:8080/koowakchai/user/signup?username=' + userInfo.username + '&password=' + userInfo.password + '&confirmPassword=' + userInfo.confirmPassword + '&email=' + userInfo.email + '&roleName=' + userInfo.roleName + '&dob=' + userInfo.dob + '&gender='+ userInfo.gender, config).then(res => {
                console.log(res);
                console.log(res.data);

            this.notify();

        })




    }

    render(){

        const dobStyle = {
            color: '#eeeeee'
        }

        return (
            <div>
                <ToastContainer draggable={false} position={toast.POSITION.TOP_CENTER} style={{fontSize: '20px'}}/>
                <Form id="signup">
                    <Form.Group controlId="formBasicUsername" id="roleSelect">
                        <Form.Control as="select" ref={this.roleName}>
                            <option value="Customer">Customer</option>
                            <option value = "Driver">Driver</option>
                            <option value="Deliveryman">Deliveryman</option>
                            <option value="Store Staff">Store Staff</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <FormControl type="text" id="username"  placeholder="Username" className="mr-sm-2" name="username" ref={this.username}/>
                    </Form.Group>
                    <Form.Group>
                        <FormControl type="email" id="email" placeholder="name@example.com" className="mr-sm-2" name="email" ref={this.email}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicDOB" id="dobContainer" ref={this.dob}>
                        <DatePicker
                            selected={this.state.selectedDate}
                            onChange={ this.handleChange }
                            name="dob"
                            placeholderText="Date of Birth"
                            id="dob"
                            dateFormat="yyyy-MM-dd"
                        />
                    </Form.Group>
                    <Form.Group id="genderContainer" onChange={this.setGender}>
                            <Form.Check inline label="Male" value="Male" type="radio" id={`inline-radio-1`} name="gender"/>
                            <Form.Check inline label="Female" value="Female" type="radio" id={`inline-radio-2`}  name="gender"/>

                    </Form.Group>

                    <Form.Group>
                        <FormControl type="password" id="password" placeholder="Password" className="mr-sm-2" name="password" ref={this.password}/>
                    </Form.Group>
                    <Form.Group>
                        <FormControl type="password" id="confirm" placeholder="Confirm Password" className="mr-sm-2" name="confirmPassword" ref={this.confirmPassword}/>
                    </Form.Group>

                    <Button variant="outline-success" id="signupBtn" onClick={this.doSignup.bind(this)} type="submit">Submit</Button>
                </Form>

            </div>

        )
    }
}

export default Signup;