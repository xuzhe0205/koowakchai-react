import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import React, {Component} from "react";
import Image from 'react-bootstrap/Image';
import { Redirect } from 'react-router-dom';
import user from "../../Model/user";
import Dropdown from 'react-bootstrap/Dropdown';
import historyUrl from '../../History/history';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            back: false
        };


    };


    goEditUserInfo(){
        this.setState({ redirect: true });
    }

    goBack(){
        this.setState({ back: true });
    }

    render(){
        const redirect = this.state.redirect;
        const backPage = this.state.back;

        if (redirect) {
            historyUrl.push(this.props.currentPath)
            return <Redirect to={{ pathname: '/editUserInfo', state: { authorization: this.props.authorization, prevPath: this.props.currentPath } }}/>;
        }
        if (backPage){
            return <Redirect to={{pathname: historyUrl.pop(), state: { authorization: this.props.authorization, prevPath: this.props.prevPath }}}/>;
        }
        return(
            <Jumbotron fluid style={{ height: '1rem' }}>
                <Container style={{ marginTop: '-1.5rem'}}>
                    <h1 style={{float: 'right', display: 'inline-block'}}>
                        <Dropdown>
                            <Image onClick={this.goBack.bind(this)} src="https://static.thenounproject.com/png/1268084-200.png" rounded style={{visibility: this.props.backBtn, width: '3.5rem', height: '3.5rem'}}/>
                            <a style={{marginRight: '8rem', marginLeft: '9rem'}}>KooWakChai 😝</a>
                            <Dropdown.Toggle variant="outline-light" id="dropdown-basic" style={{visibility: this.props.userBtn}}>
                                <Image src="https://static.thenounproject.com/png/2867277-200.png" rounded style={{width: '2rem', height: '2rem'}}/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={this.goEditUserInfo.bind(this)}>Edit UserInfo</Dropdown.Item>
                                <Dropdown.Item href="/">Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </h1>
                </Container>
            </Jumbotron>
        )
    }
}

export default Header;

