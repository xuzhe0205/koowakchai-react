import React, {Component} from 'react';
import './ECigarette.css';
import Header from '../../Component/Header/Header';
import axios from "axios";
import user from "../../Model/user";
import Card from "react-bootstrap/Card";
import historyUrl from "../../History/history";
import Badge from "react-bootstrap/Badge";


class ECigarette extends Component{
    constructor(props){
        super(props);
        this.state = {
            eCigarette: []
        };
        this.phoneNumber = React.createRef();
        this.profileUrl = React.createRef();
    }

    componentWillMount(){
        const res = axios.get("http://localhost:8080/koowakchai/store/getSortedProductsByType",
            {
                headers: {
                    'Authorization': user.authorization
                },
                params: {
                    productType: "ecigarette"
                },
            }
        ).then(res => {
            this.setState({
                eCigarette: res.data.data
            });
            console.log(this.state.eCigarette);
        })
    }

    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    test(){
        alert("???")
    }

    createECigaretteCards(){
        let cards = [];
        for (const [index, value] of this.state.eCigarette.entries()) {
            cards.push(
                <div key={index} style={{marginTop: '3rem'}}>
                    <Card style={{ width: '20rem', alignItems: 'center' }} key={index}>
                        <Card.Img variant="top" src={value["productUrl"]} onClick={this.test.bind(this)} style={{width:'15rem', height:'12rem', marginLeft: '3rem', marginTop: '1rem'}}/>
                        <Card.Body>
                            <Card.Title>{value['name']}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">$ {value['price']}</Card.Subtitle>
                            <Card.Text>
                                <Badge variant="dark">Brand</Badge> {value['brand']}<br/><br/>
                                <Badge variant="secondary">Category</Badge> {this.Capitalize(value['category'])}
                            </Card.Text>
                            {/*<Button variant="outline-success">*/}
                            {/*    <Image src="https://static.thenounproject.com/png/689826-200.png" rounded style={{width: '2rem', height: '2rem', cursor: 'pointer'}}/>*/}
                            {/*</Button>*/}

                        </Card.Body>
                    </Card>
                </div>
            )
        }
        return cards;
    }

    render(){
        return(
            <div>
                <Header authorization={this.props.location.state.authorization} backBtn="visible" userBtn="visible" currentPath="/eCigarette"/>
                <p>path: {historyUrl[historyUrl.length-1]}</p>
                <div className="flex-container">
                    {this.createECigaretteCards()}
                </div>
            </div>
        );
    }
}

export default ECigarette;