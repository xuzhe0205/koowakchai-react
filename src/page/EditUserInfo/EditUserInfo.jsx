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

class EditUserInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: ''
        };
        this.phoneNumber = React.createRef();
        this.profileUrl = React.createRef();
    }

    test(){
        alert("???")
    }

    fileChangedHandler(event){
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onloadend= () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }

    render(){
        return(
            <div >
                <Header authorization={this.props.location.state.authorization} backBtn="visible" userBtn="hidden" currentPath="/editUserInfo"/>
                <p>heiheihei: {historyUrl}</p>
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
                                            <FormControl type="text" id="phoneNumber"  placeholder="Phone number" className="mr-sm-2" ref={this.phoneNumber}/>
                                        </Form.Group>
                                        <Form.Group id="fileUpload">
                                            <Badge variant="light" style={{fontSize: '15px'}}>Upload your profile: </Badge>
                                            <input type="file" className="mr-sm-2" onChange={this.fileChangedHandler.bind(this)}/>
                                        </Form.Group>
                                        <Button variant="outline-warning" id="saveBtn" type="submit" onClick={this.test.bind(this)}>Save</Button>
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
                            <Card.Body>...</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>

            </div>
        );
    }
}

export default EditUserInfo;