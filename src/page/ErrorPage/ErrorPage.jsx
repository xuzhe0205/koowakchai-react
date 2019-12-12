import React, {Component} from 'react';
import './ErrorPage.css';
import Header from '../../Component/Header/Header';
import axios from "axios";
import user from "../../Model/user";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Redirect } from 'react-router-dom';

class ErrorPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            redirect: false
        };
    }


    goMainpage(){
        this.setState({ redirect: true })
    }

    render(){
        let redirect = this.state.redirect;
        if (redirect){
            return <Redirect to="/"/>
        }
        return(
          <div>
              <Header authorization={user.authorization} backBtn="hidden" userBtn="hidden" currentPath="/errorPage"/>
              <div className="flex-container">
                  <Card>
                    You have encountered some sorts of error! <br/>
                  </Card>
                  <Button variant="danger" onClick={this.goMainpage.bind(this)}>Back to Main page</Button>
              </div>


          </div>
        );
    }
}

export default ErrorPage;