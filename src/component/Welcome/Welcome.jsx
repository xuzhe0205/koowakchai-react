import React, { Component } from "react";
import "./Welcome.css";

class Welcome extends Component {
  constructor(props) {
    super(props);
    console.log("welcomePage: " + props);
    this.state = {
      visible: true
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ visible: false }), 2000);
    console.log(this.state.visible);
  }

  render() {
    return (
      <div className={this.state.visible ? "fadeIn" : "fadeOut"}>
        <div className="welcomePage">
          <p className="title">Welcome to KooWakChai</p>
          <p className="welcomeMsg">Be creative!</p>
        </div>
      </div>
    );
  }
}

export { Welcome };
