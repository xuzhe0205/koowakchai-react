import React, {Component} from 'react';
import './ECigarette.css';
import Header from '../../Component/Header/Header';
import axios from "axios";
import user from "../../Model/user";
import Card from "react-bootstrap/Card";
import historyUrl from "../../History/history";
import Badge from "react-bootstrap/Badge";
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from "react-bootstrap/Image";
import CartFAB from "../../Component/CartFAB/CartFAB";
import { ToastContainer, toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { Redirect } from 'react-router-dom';


class ECigarette extends Component{
    constructor(props){
        super(props);
        this.state = {
            eCigarette: [],
            open: false,
            selectedProduct: {},
            itemQuantity: 1,
            requirementKey: Math.random(),
            pageNumber: 1,
            hasMore: true,
            redirect: false,
            hasError: false
        };
        // this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.phoneNumber = React.createRef();
        this.keyword = React.createRef();
    }

    openModal(product){
        this.setState({ open: true, selectedProduct: product, itemQuantity: 1 });
    }

    closeModal(){
        this.setState({ open: false })
    }

    componentWillMount(){
        if (user.authorization.length == 0){
            this.setState({ redirect: true, hasError: true });
        }
        const res = axios.get("http://localhost:8080/koowakchai/store/getSortedProductsByType",
            {
                headers: {
                    'Authorization': user.authorization
                },
                params: {
                    productType: "ecigarette",
                    pageNumber: this.state.pageNumber,
                    pageSize: 6
                },
            }
        ).then(res => {
            this.setState({
                eCigarette: res.data.data,
                pageNumber: this.state.pageNumber + 1
            });
            console.log(this.state.eCigarette);
        }).catch(error => {
            let errStr = "";
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                errStr = "response data: " + error.response.data + "; response status: " + error.response.status + "; response headers: " + error.response.headers;


            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the
                // browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                errStr = "error request: " + error.request;
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                errStr = "error message: " + error.message;
            }
            console.log(error.config);
            return <Redirect to={{ pathname: '/errorPage', state: { authorization: user.authorization, yourError: errStr} }}/>
        })
    }

    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    loadMore(){
        const res = axios.get("http://localhost:8080/koowakchai/store/getSortedProductsByType",
            {
                headers: {
                    'Authorization': user.authorization
                },
                params: {
                    productType: "ecigarette",
                    pageNumber: this.state.pageNumber,
                    pageSize: 6
                },
            }
        ).then(res => {
            setTimeout(() => {
                this.setState({
                    eCigarette: this.state.eCigarette.concat(Array.from(res.data.data)),
                    pageNumber: this.state.pageNumber + 1
                });
                console.log(this.state.eCigarette);
                this.createECigaretteCards();
            }, 1500);
        }).catch(error => {
            let errStr = "";
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                errStr = "response data: " + error.response.data + "; response status: " + error.response.status + "; response headers: " + error.response.headers;


            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the
                // browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                errStr = "error request: " + error.request;
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                errStr = "error message: " + error.message;
            }
            console.log(error.config);
            return <Redirect to={{ pathname: '/errorPage', state: { authorization: user.authorization, yourError: errStr} }}/>
        })
    }

    createECigaretteCards(){
        let cards = [];
        for (const [index, value] of this.state.eCigarette.entries()) {
            cards.push(
                <div key={index} style={{marginBottom: '3rem'}}>
                    <Card style={{ width: '20rem', alignItems: 'center' }} key={index}>
                        <Card.Img variant="top" src={value["productUrl"]} onClick={this.openModal.bind(this,value)} style={{width:'15rem', height:'12rem', marginLeft: '3rem', marginTop: '1rem'}}/>
                        <Card.Body>
                            <Card.Title>{value['name']}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">${value['price']}</Card.Subtitle>
                            <Card.Text>
                                <br/>
                                <Badge variant="dark">Brand</Badge> {value['brand']}<br/>
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

    changeItemQuantity(factor){
        const oldQuantity = this.state.itemQuantity;
        if (factor=="add"){
            this.setState({
                itemQuantity: oldQuantity+1
            })
        }
        else{
            if (oldQuantity>1){
                this.setState({
                    itemQuantity: oldQuantity-1
                })
            }
        }

    }

    notify(){
        toast.success("Item(s) have been added to your cart 😊");
    };

    doAddtoCart(authorization, subtypeId, id, quantity){
        const res = axios.post("http://localhost:8080/koowakchai/store/addToCart", null,
            {
                headers: {
                    'Authorization': user.authorization
                },
                params: {
                    authorization: authorization,
                    subtypeId: subtypeId,
                    productId: id,
                    quantity: quantity
                },
            }
        ).then(res => {
            console.log("tried addToCart: " + res.data);
            this.setState({
                itemQuantity: quantity
            });
            // Force a render with a simulated state change
            this.setState({ requirementKey: Math.random() });
            this.notify();
        })
    }

    doSearchProducts(){
        const res = axios.get("http://localhost:8080/koowakchai/store/searchProducts",
            {
                headers: {
                    'Authorization': user.authorization
                },
                params: {
                    authorization: user.authorization,
                    productType: "ecigarette",
                    keyword: this.keyword.current.value
                },
            }
        ).then(res => {
            this.setState({
                eCigarette: res.data.data,
                hasMore: false
            });
        })
    }

    render(){
        const redirect = this.state.redirect;
        const hasError = this.state.hasError;
        if (redirect) {
            if (hasError) {
                return <Redirect to={{
                    pathname: '/errorPage',
                    state: {authorization: user.authorization, yourError: "authentication"}
                }}/>
            }
        }
        return(
            <div>
                <Header authorization={user.authorization} backBtn="visible" userBtn="visible" currentPath="/eCigarette"/>
                <div className="flex-container">
                    <Form inline>
                        <FormControl type="text" style={{width: '20rem'}} placeholder="Search by name, brand or flavour" className="mr-sm-2" ref={this.keyword}/>
                        <Button variant="outline-success" onClick={this.doSearchProducts.bind(this)} >Search</Button>
                    </Form>
                </div>
                <ToastContainer  position={toast.POSITION.TOP_CENTER} autoClose={3000} style={{fontSize: '20px'}}/>
                <InfiniteScroll
                    dataLength={this.state.eCigarette.length}
                    next={this.loadMore.bind(this)}
                    hasMore={this.state.hasMore}
                    loader={<h4>Loading...</h4>}
                >
                    <div className="flex-container">
                        {this.createECigaretteCards()}
                    </div>
                </InfiniteScroll>


                <Modal
                    show={this.state.open}
                    onHide={this.closeModal}
                    aria-labelledby="ModalHeader"
                    id="signupLoginModal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {this.state.selectedProduct['name']}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <br/>
                        <ListGroup style={{fontSize: '18px'}}>
                            <ListGroup.Item>
                                <Badge pill variant="warning">Price</Badge> ${this.state.selectedProduct['price']}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Badge pill variant="info">Brand</Badge> {this.state.selectedProduct['brand']}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Badge pill variant="info">Flavour</Badge> {this.state.selectedProduct['flavour']}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Badge pill variant="info">Category</Badge> {this.state.selectedProduct['category']}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Badge pill variant="info">Sales Volumes</Badge> {this.state.selectedProduct['salesVol']}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Badge pill variant="info">Made Country</Badge> {this.state.selectedProduct['madeCountry']}
                            </ListGroup.Item>
                        </ListGroup>
                    </Modal.Body>
                    <br/>
                    <div style={{alignItems: 'center', marginLeft: '10rem'}}>
                        <Image src="https://static.thenounproject.com/png/2617468-200.png" onClick={this.changeItemQuantity.bind(this, "minus")} rounded style={{width: '2.1rem', height: '2.1rem'}}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Badge variant="dark" style={{fontSize: '15px'}}>
                            Quantity: &nbsp;<Badge variant="light">{this.state.itemQuantity}</Badge>
                        </Badge>
                        &nbsp;&nbsp;
                        <Image src="https://static.thenounproject.com/png/937093-200.png" onClick={this.changeItemQuantity.bind(this, "add")} rounded style={{width: '3rem', height: '3rem'}}/>
                        <br/>
                        <br/>
                        <br/>
                        <Image src="https://static.thenounproject.com/png/984653-200.png" onClick={this.doAddtoCart.bind(this, user.authorization, this.state.selectedProduct["subtypeId"], this.state.selectedProduct["id"], this.state.itemQuantity)} rounded style={{width: '5rem', height: '5rem', marginLeft: '3rem'}}/>
                    </div>
                    <br/>
                    <br/>
                </Modal>
                <CartFAB itemQuantity = {this.state.itemQuantity} key={this.state.requirementKey} productPageUrl="/eCigarette"/>
            </div>
        );
    }
}

export default ECigarette;