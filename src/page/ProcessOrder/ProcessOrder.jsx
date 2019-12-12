import React, {Component} from 'react';
import axios from "axios";
import Header from '../../Component/Header/Header';
import user from "../../Model/user";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import historyUrl from "../../History/history";
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


class ProcessOrder extends Component{
    constructor(props){
        super(props);
        this.state = {
            eCigarette: [],
            open: false,
            selectedProduct: {},
            itemQuantity: 1,
            requirementKey: Math.random(),
            customersOrders: {},
            logisticsCompanyList: [],
            customerOrdersIds: [],
            selectedLogisticsCompany: '',
            redirect: false,
            hasError: false
        };
        this.logisticsCompany = React.createRef();
    }

    closeModal(){
        this.setState({ open: false });
        this.forceUpdate();
    }

    notify(){toast.success("You have successfully processed these orders 🚚️")};

    componentWillMount(){
        if (user.authorization.length == 0){
            this.setState({ redirect: true, hasError: true });
        }
        const res = axios.get("http://localhost:8080/koowakchai/store/getOrdersByCustomers",
            {
                headers: {
                    'Authorization': user.authorization
                },
                params: {
                    authorization: user.authorization
                },
            }
        ).then(res => {
            this.setState({
                customersOrders: res.data.data
            });
            console.log("wo qu?");
            console.log(this.state.customersOrders);
        })
    }

    createOrderList(){
        let customers = {};
        let keys = Object.keys(this.state.customersOrders);
        keys.forEach(email =>{
            let orderList = [];
            this.state.customersOrders[email].forEach(order =>{
                orderList.push(
                    <ListGroup.Item key={order['id']}>{order["productName"]} - Quantity: {order["quantity"]}</ListGroup.Item>
                )
            })

            customers[email] = orderList;
        });
        return customers;
    }

    doProcessOrders(){
        let customerOrdersIdsStr = this.state.customerOrdersIds.join(',');
        const res = axios.post("http://localhost:8080/koowakchai/store/processOrders", null,
            {
                headers: {
                    'Authorization': user.authorization
                },
                params: {
                    authorization: user.authorization,
                    orderIds: customerOrdersIdsStr,
                    logisticsCompanyId: this.logisticsCompany.current.value,
                    comment: 'GunDuZi'
                },
            }
        ).then(res => {
            this.setState({ requirementKey: Math.random() });
            this.notify();
        })
    }

    createCustomerOrdersCards(){
        let cards = [];
        let keys = Object.keys(this.state.customersOrders);
        keys.forEach(email =>{
            let customerOrdersIds = [];
            this.state.customersOrders[email].forEach(order =>{
              customerOrdersIds.push(order['id']);
            })
            cards.push(
                <Card key={email}>
                    <Card.Body>
                        <Card.Title>Customer: {email}</Card.Title>
                        <Card.Text>
                            {(this.createOrderList())[email]}
                        </Card.Text>
                        <Button onClick={this.openLogisticsModal.bind(this, customerOrdersIds)}>Process this order</Button>
                    </Card.Body>
                </Card>
            )
        })

        return cards;
    }

    createLogisticsOptionCards() {
        let cards = [];
        for (const [index, value] of this.state.logisticsCompanyList.entries()) {
            cards.push(
                        <option value={value['id']} key={index}>{value['companyName']}</option>
            )
        }
        return cards
    }

    openLogisticsModal(customerOrdersIds){
        const res = axios.get("http://localhost:8080/koowakchai/store/getLogisticsCompanyList",
            {
                headers: {
                    'Authorization': user.authorization
                },
                params: {
                    authorization: user.authorization
                },
            }
        ).then(res => {
            this.setState({ logisticsCompanyList: res.data.data, open: true, customerOrdersIds: customerOrdersIds });
            console.log("your address Id: " + this.state.logisticsCompanyList);

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
                <Header authorization={user.authorization} backBtn="visible" userBtn="visible" currentPath="/processOrder"/>
                <ToastContainer draggable={false} position={toast.POSITION.TOP_CENTER} style={{fontSize: '20px'}}/>
                <div className="flex-container" key={this.state.requirementKey}>
                    {this.createCustomerOrdersCards()}
                </div>
                <Modal
                    show={this.state.open}
                    onHide={this.closeModal.bind(this)}
                    aria-labelledby="ModalHeader"
                    id="logisticsModal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Select Logistics Company
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group id="roleSelect">
                            <Form.Control as="select" ref={this.logisticsCompany}>
                                {this.createLogisticsOptionCards()}
                            </Form.Control>
                        </Form.Group>
                        <br/>
                        <Button onClick={this.doProcessOrders.bind(this)} style={{marginLeft: '33%'}}>Process this order</Button>
                        <br/>
                    </Modal.Body>
                </Modal>
            </div>

        );
    }
}

export default ProcessOrder;