import React, { Component } from "react";
import "./SignupStyle.css";
import axios from "axios";
import WithRouter from "./withRouter";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      password: "",
      email: "",
      phone: "",
      address: {
        street: "",
        city: "",
        state: "",
        pincode: "",
      },
      signUp: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
  }

  signUpModal = (e) => {
    this.setState({ signUp: true });
  };

  signInModal = (e) => {
    this.setState({ signUp: false });
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const body = {
      name: this.state.name,
      password: this.state.password,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
    };
    axios
      .post("http://localhost:8080/signup", body)
      .then((response) => {
        alert("Registered!!!  Proceed to login now :)");
        this.setState({
          signUp: false,
        });
      })
      .catch((error) => {
        const statusCode = error.request.status;
        if (statusCode === 404 || statusCode === 500) {
          alert("Server is down, try again after some time.");
        } else {
          alert("Some error occured");
        }
      });
  }

  handleSubmitLogin(e) {
    e.preventDefault();
    const request = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("http://localhost:8080/login", request)
      .then((response) => {
        alert("You have logged in successfully!");
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        this.props.navigate("/");
      })
      .catch((error) => {
        alert("Incorrect Credentials");
      });
  }

  handleChangeAddress(event) {
    this.setState({
      address: {
        ...this.state.address,
        [event.target.name]: event.target.value,
      },
    });
  }

  render() {
    return (
      <div className="page">
        <div
          className={`container ${
            this.state.signUp ? "right-panel-active" : ""
          }`}
          id="container"
        >
          <div className="form-container sign-up-container">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                required
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
              <input
                type="number"
                placeholder="Phone No."
                name="phone"
                value={this.state.phone}
                onChange={this.handleChange}
                required
              />
              <input
                type="text"
                placeholder="Street"
                name="street"
                value={this.state.address.street}
                onChange={this.handleChangeAddress}
                required
              />
              <input
                type="text"
                placeholder="City"
                name="city"
                value={this.state.address.city}
                onChange={this.handleChangeAddress}
                required
              />
              <input
                type="text"
                placeholder="State"
                name="state"
                value={this.state.address.state}
                onChange={this.handleChangeAddress}
                required
              />
              <input
                type="text"
                placeholder="Pin Code"
                name="pincode"
                value={this.state.address.pincode}
                onChange={this.handleChangeAddress}
                required
              />
              <button>Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form onSubmit={this.handleSubmitLogin}>
              <h1>Sign in</h1>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />

              <button>Sign In</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="ghost"
                  id="signIn"
                  onClick={this.signInModal}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>
                  Enter your personal details and start journey with MyBasket
                </p>
                <button
                  className="ghost"
                  id="signUp"
                  onClick={this.signUpModal}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WithRouter(SignUp);
