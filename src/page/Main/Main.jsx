import React, { Component } from "react";
import { Welcome } from "../../Component/Welcome/Welcome";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import "./Main.css";
import LoginSignup from "../LoginSignup/LoginSignup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "react-bootstrap/Image";

class Main extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      startup: true
    };
  }

  render() {
    var sectionStyle = {
      width: "100%",
      height: "400px",
      backgroundImage:
        "url(https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRWF3HD26imsMW5y_J1xsQ6ADsMuIky97PBYpEcbf8anwCN5-QZ)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "70% 70%",
      marginTop: "10%"
    };
    return (
      <div>
        <Welcome startup={this.state.startup} />
        <Navbar bg="dark" variant="dark" expand="xl">
          <Navbar.Brand href="#home">
            <strong style={{ fontSize: "25px" }}>Koowakchai</strong>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <br />
              <LoginSignup>Login/Signup</LoginSignup>
              {/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">*/}
              {/*    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
              {/*    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>*/}
              {/*    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
              {/*    <NavDropdown.Divider />*/}
              {/*    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
              {/*</NavDropdown>*/}
            </Nav>
            {/*<Form inline className="searchDiv">*/}
            {/*    <FormControl type="text" placeholder="Search" className="mr-sm-2" />*/}
            {/*    <Button variant="outline-success">Search</Button>*/}
            {/*</Form>*/}
          </Navbar.Collapse>
        </Navbar>
        <section style={sectionStyle}></section>
      </div>
    );
  }
}

export default Main;
