import React, {Component} from 'react';
import './ECigaretteWarehouse.css';
import Header from '../../Component/Header/Header';
import axios from "axios";
import user from "../../Model/user";
import Button from "react-bootstrap/Button";
import historyUrl from "../../History/history";
import Badge from "react-bootstrap/Badge";
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from "react-bootstrap/Image";
import { ToastContainer, toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import FormControl from "react-bootstrap/FormControl";


class ECigaretteWarehouse extends Component{
    constructor(props){
        super(props);
        this.state = {
            eCigarette: [],
            open: false,
            selectedProduct: {},
            itemQuantity: 1,
            requirementKey: Math.random(),
            pageNumber: 1
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.phoneNumber = React.createRef();
        this.profileUrl = React.createRef();
    }

    openModal(product){
        this.setState({ open: true, selectedProduct: product });
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
                    productType: "ecigarette",
                    pageNumber: this.state.pageNumber,
                    pageSize: 15
                },
            }
        ).then(res => {
            this.setState({
                eCigarette: res.data.data,
                pageNumber: this.state.pageNumber + 1
            });
            console.log(this.state.eCigarette);
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
                    pageSize: 15
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
        })
    }

    createECigaretteCards(){
        let cards = [];
        for (const [index, value] of this.state.eCigarette.entries()) {
            cards.push(
                <div key={index} style={{marginBottom: '1rem'}}>
                    <ListGroup.Item key={index} onClick={this.openModal.bind(this, value)}>#{value['id']} - {value["name"]}</ListGroup.Item>
                </div>
            )
        }
        return cards;
    }

    notify(msg){
        toast.info(msg);
    };


    createProductDetailCards(){
        let cards = [];
        let keys = Object.keys(this.state.selectedProduct);
        keys.forEach(key=>{
            if (key != 'id' && key != 'subtypeId' && key != 'salesVol'){
                cards.push(
                    <ListGroup.Item key={key}>
                        <Badge pill variant="info">{this.Capitalize(key)}</Badge>
                        <FormControl aria-label="Text input with checkbox" placeholder={this.state.selectedProduct[key]}/>
                    </ListGroup.Item>
                )
            }

        });
        return cards;
    }

    doUpdateProduct(){
        alert("do update");
        this.notify("Item(s) have been added to your cart 😊");
    }

    doDeleteProduct(){
        let productType = '';
        if (this.state.selectedProduct['subtypeId'] == 1){
            productType = 'ecigarette';
        }
        else{
            productType = 'liquor'
        }
        const res = axios.post("http://localhost:8080/koowakchai/store/deleteProduct", null,
            {
                headers: {
                    'Authorization': user.authorization
                },
                params: {
                    authorization: user.authorization,
                    productId: this.state.selectedProduct['id'],
                    productType: productType
                }
            }
        ).then(res => {
            this.notify("Product: " + this.state.selectedProduct['name'] + " has been successfully deleted⚠️");
            console.log(this.state.eCigarette);
            this.setState({ pageNumber: 1 });
            this.componentWillMount();

        })
    }

    render(){
        return(
            <div>
                <Header authorization={user.authorization} backBtn="visible" userBtn="visible" currentPath="/eCigarette"/>
                <ToastContainer  position={toast.POSITION.TOP_CENTER} autoClose={3000} style={{fontSize: '20px'}}/>
                <InfiniteScroll
                    dataLength={this.state.eCigarette.length}
                    next={this.loadMore.bind(this)}
                    hasMore={true}
                    loader={<h4 onClick={this.loadMore.bind(this)}>Loading...</h4>}
                >

                    {this.createECigaretteCards()}
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
                            {this.createProductDetailCards()}
                        </ListGroup>
                    </Modal.Body>
                    <br/>
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <Button variant="success" onClick={this.doUpdateProduct.bind(this)} style={{width: '10rem'}}>Update</Button>
                        <Button variant="secondary" onClick={this.doDeleteProduct.bind(this)} style={{width: '10rem'}}>Delete product</Button>
                    </div>
                    <br/>
                    <br/>
                </Modal>
            </div>
        );
    }
}

export default ECigaretteWarehouse;