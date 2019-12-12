import React, {Component} from 'react';
import './Liquor.css';
import Header from '../../Component/Header/Header';
import axios from "axios";
import user from "../../Model/user";
import Card from "react-bootstrap/Card";
import historyUrl from "../../History/history";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from "react-bootstrap/Image";
import CartFAB from "../../Component/CartFAB/CartFAB";
import { ToastContainer, toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';


class Liquor extends Component{
    constructor(props){
        super(props);
        this.state = {
            liquor: [],
            open: false,
            selectedProduct: {},
            itemQuantity: 1,
            requirementKey: Math.random(),
            pageNumber: 1,
            hasMore: true
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
        const res = axios.get("http://localhost:8080/koowakchai/store/getSortedProductsByType",
            {
                headers: {
                    'Authorization': user.authorization
                },
                params: {
                    productType: "liquor",
                    pageNumber: this.state.pageNumber,
                    pageSize: 6
                },
            }
        ).then(res => {
            this.setState({
                liquor: res.data.data,
                pageNumber: this.state.pageNumber + 1
            });
            console.log(this.state.liquor);
        })
    }

    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    createLiquorCards(){
        let cards = [];
        for (const [index, value] of this.state.liquor.entries()) {
            cards.push(
                <div key={index} style={{marginBottom: '3rem'}}>
                    <Card style={{ width: '20rem', alignItems: 'center' }} key={index}>
                        <Card.Img variant="top" src={value["productUrl"]} onClick={this.openModal.bind(this,value)} style={{width:'15rem', height:'12rem', marginLeft: '3rem', marginTop: '1rem'}}/>
                        <Card.Body>
                            <Card.Title>{value['name']}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">${value['price']}</Card.Subtitle>
                            <Card.Text>
                                <br/>
                                <Badge variant="dark">Category</Badge> {this.Capitalize(value['category'])}<br/>
                                <Badge variant="secondary">Alcohol Volume</Badge> {value['alcVol']}<br/>
                                <Badge variant="secondary">Size</Badge> {value['size']}
                            </Card.Text>

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


    loadMore(){
        const res = axios.get("http://localhost:8080/koowakchai/store/getSortedProductsByType",
            {
                headers: {
                    'Authorization': user.authorization
                },
                params: {
                    productType: "liquor",
                    pageNumber: this.state.pageNumber,
                    pageSize: 6
                },
            }
        ).then(res => {
            setTimeout(() => {
                this.setState({
                    liquor: this.state.liquor.concat(Array.from(res.data.data)),
                    pageNumber: this.state.pageNumber + 1
                });
                console.log(this.state.liquor);
                this.createLiquorCards();
            }, 1500);
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
                    productType: "liquor",
                    keyword: this.keyword.current.value
                },
            }
        ).then(res => {
            this.setState({
                liquor: res.data.data,
                hasMore: false
            });
        })
    }


    render(){
        return(
            <div>
                <Header authorization={user.authorization} backBtn="visible" userBtn="visible" currentPath="/liquor"/>
                <div className="flex-container">
                    <Form inline>
                        <FormControl type="text" style={{width: '20rem'}} placeholder="Search by name, made country or category" className="mr-sm-2" ref={this.keyword}/>
                        <Button variant="outline-success" onClick={this.doSearchProducts.bind(this)} >Search</Button>
                    </Form>
                </div>

                <ToastContainer  position={toast.POSITION.TOP_CENTER} autoClose={3000} style={{fontSize: '20px'}}/>
                <InfiniteScroll
                    dataLength={this.state.liquor.length}
                    next={this.loadMore.bind(this)}
                    hasMore={this.state.hasMore}
                    loader={<h4>Loading...</h4>}
                >
                    <div className="flex-container">
                        {this.createLiquorCards()}
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
                                <Badge pill variant="info">Alcohol Volume</Badge> {this.state.selectedProduct['alcVol']}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Badge pill variant="info">Size</Badge> {this.state.selectedProduct['size']}
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
                <CartFAB itemQuantity = {this.state.itemQuantity} key={this.state.requirementKey} productPageUrl="/liquor"/>
            </div>
        );
    }
}

export default Liquor;