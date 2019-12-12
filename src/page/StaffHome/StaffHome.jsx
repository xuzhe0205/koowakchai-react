import React, {Component} from 'react'
import axios from "axios";
import Card from "react-bootstrap/Card";
import user from "../../Model/user";
import Header from "../../Component/Header/Header";
import Accordion from "react-bootstrap/Accordion";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Redirect } from 'react-router-dom';
import historyUrl from "../../History/history";


class StaffHome extends Component{
    constructor(props){
        super(props);
        this.state = {
            storeProductTypes: [],
            redirect: false,
            url: ''
        };
        this.phoneNumber = React.createRef();
        this.profileUrl = React.createRef();
    }

    componentWillMount(){
        const res = axios.get("http://localhost:8080/koowakchai/store/getProductTypes",
            {
                headers: {
                    'Authorization': user.authorization
                },
                params: {
                    subtypeId: 1
                },
            }
        ).then(res => {
            this.setState({
                storeProductTypes: res.data.data
            });
            console.log(this.state.storeProductTypes);
        })
    }

    goWarehouse(url){
        this.setState({ redirect: true, url: url});
    }

    createStaffHomeCards(){
        let cards = [];
        let profileUrl = [
            "https://static.thenounproject.com/png/532799-200.png",
            "https://static.thenounproject.com/png/1417054-200.png"
        ]
        let pathUrl = [
            "/eCigaretteWarehouse",
            "/liquorWarehouse"
        ]
        for (const [index, value] of this.state.storeProductTypes.entries()) {
            cards.push(
                <div key={index} style={{marginTop: '3rem', marginLeft: '1rem'}}>
                    <Card style={{ width: '20rem' }} key={index}>
                        <Card.Img variant="top" src={profileUrl[index]} onClick={this.goWarehouse.bind(this, pathUrl[index])} style={{width:'8rem', height:'8rem', marginLeft: '5rem', marginTop: '1rem'}}/>
                        <Card.Body>
                            <Card.Title>Go to {this.Capitalize(value['subBusinessName'])} warehouse</Card.Title>
                            <Card.Text>
                                <Button onClick={this.goWarehouse.bind(this, pathUrl[index])}>Enter warehouse</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            )
        }
        return cards;
    }
    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    goProcessOrderPage(){
        this.setState({ redirect: true, url: '/processOrder' });
    }


    render(){
        let redirect = this.state.redirect;
        let url = this.state.url;
        if (redirect){
            historyUrl.push('/staffHome');
            return <Redirect to={this.state.url}/>;

        }
        return(
          <div>
              <Header authorization={user.authorization} backBtn="hidden" userBtn="visible" currentPath="/staffHome"/>
              <div className="flex-container">
                  {this.createStaffHomeCards()}
              </div>
              <hr/>
              <Card.Body style={{width: '30rem', marginTop: '3rem', marginLeft: '20%'}}>
                  <Card.Img variant="top" src="https://assets-global.website-files.com/5b4cba745747fc721ba46069/5b5625a671ac8cd84aa9c5d7_what-is-order-management.jpg" />
                  <Card.Body>
                      <Button onClick={this.goProcessOrderPage.bind(this)}>View Orders</Button>
                  </Card.Body>

              </Card.Body>

          </div>
        );
    }
}

export default StaffHome;
