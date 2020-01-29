import React, { Component } from "react";
import axios from "axios";

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      message: ""
    };
  }

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handleMessageChange = event => {
    this.setState({ message: event.target.value });
  };

  handleSubmit = () => {
    console.log(this.state.email);
    console.log(this.state.message);
    axios
      .post("api/send-email", {
        email: this.state.email,
        message: this.state.message
      })
      .then(() => console.log("It works"))
      .catch(() => console.log("It doesn't work"));
  };

  render() {
    return (
      <div>
        <input
          type='text'
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <input
          type='text'
          value={this.state.message}
          onChange={this.handleMessageChange}
        />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}
