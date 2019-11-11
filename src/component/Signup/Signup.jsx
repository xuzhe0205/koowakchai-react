import React, {Component} from 'react';
import './Signup.css';
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedDate: null
        };
        console.log('before: ',this.state.startDate);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            selectedDate: date
        })
    }

    render(){

        const dobStyle = {
            color: '#eeeeee'
        }
        return (
            <div>

                <Form id="signup">
                    <Form.Group controlId="formBasicUsername" id="roleSelect">
                        <Form.Control as="select">
                            <option>Customer</option>
                            <option>Driver</option>
                            <option>Deliveryman</option>
                            <option>Store Salesman</option>
                            <option>Auto Salesman</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formBasicUsername">
                        <FormControl type="text" id="username"  placeholder="Username" className="mr-sm-2" />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <FormControl type="text" id="email" placeholder="Email" className="mr-sm-2" />
                    </Form.Group>
                    <Form.Group controlId="formBasicDOB" id="dobContainer">
                        <DatePicker
                            selected={this.state.selectedDate}
                            onChange={ this.handleChange }
                            name="selectedDate"
                            placeholderText="Date of Birth"
                            id="dob"
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <FormControl type="text" id="password" placeholder="Password" className="mr-sm-2" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCPassword">
                        <FormControl type="text" id="confirm" placeholder="Confirm Password" className="mr-sm-2" />
                    </Form.Group>

                    <Button variant="outline-success" id="signupBtn">Submit</Button>
                </Form>

            </div>

        )
    }
}

export default Signup;