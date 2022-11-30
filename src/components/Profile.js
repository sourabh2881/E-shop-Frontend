import axios from "axios";
import React, { Component } from "react";
import "./Style.css";

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChangeAddress(event) {
    this.setState({
      address: {
        ...this.state.address,
        [event.target.name]: event.target.value,
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const request = {
      id: localStorage.getItem("id"),
      name: this.state.name,
      password: this.state.password,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
    };
    axios
      .post("http://localhost:8080/updateProfile", request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        alert("Your Details have been updated!");
      })
      .catch((error) => {
        const statusCode = error.request.status;
        if (statusCode === 401 || statusCode === 403) {
          alert("try logging in again!");
        } else if (statusCode === 404 || statusCode === 500) {
          alert("Server is down, try again after some time.");
        } else {
          alert("Some error occured");
        }
      });
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    axios
      .get(`http://localhost:8080/getprofile/${localStorage.getItem("id")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        this.setState(response.data);
      })
      .catch((error) => {
        const statusCode = error.request.status;
        if (statusCode === 401 || statusCode === 403) {
          alert("try logging in again!");
        } else if (statusCode === 404 || statusCode === 500) {
          alert("Server is down, try again after some time.");
        } else {
          alert("Some error occured");
        }
      });
  }

  render() {
    return (
      <div>
        <div>
          <div className="col-lg-8 mt-4 m-auto">
            <div className="card mb-4">
              <div className="card-body profileDetails">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0 ">Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p>{this.state.name}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-dark mb-0">{this.state.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-dark mb-0">{this.state.phone}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-dark mb-0">
                      {this.state.address.street}, {this.state.address.city},{" "}
                      {this.state.address.state}, {this.state.address.pincode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <button
            type="button"
            className="btn btn-primary mt-1 mx-auto"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Update Profile
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="container">
                  <div className="row m-0 p-4">
                    <div className="col-sm-3 p-0">
                      <label htmlFor="userName">Name:</label>
                      <label htmlFor="userEmail">Email:</label>
                      <label htmlFor="userPassword">Password:</label>
                      <label htmlFor="userPhone">Phone no:</label>
                      <label htmlFor="userStreet">Street:</label>
                      <label htmlFor="userCity">City:</label>
                      <label htmlFor="userState">State:</label>
                      <label htmlFor="userPincode">Pincode:</label>
                    </div>
                    <div className="col-sm-9 p-0">
                      <input
                        style={{ display: "inline" }}
                        type="text"
                        id="userName"
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
                        id="userEmail"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Password"
                        name="password"
                        id="userPassword"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                      />
                      <input
                        type="number"
                        placeholder="Phone No."
                        name="phone"
                        id="userPhone"
                        value={this.state.phone}
                        onChange={this.handleChange}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Street"
                        name="street"
                        id="userStreet"
                        value={this.state.address.street}
                        onChange={this.handleChangeAddress}
                        required
                      />
                      <input
                        type="text"
                        placeholder="City"
                        name="city"
                        id="userCity"
                        value={this.state.address.city}
                        onChange={this.handleChangeAddress}
                        required
                      />
                      <input
                        type="text"
                        placeholder="State"
                        name="state"
                        id="userState"
                        value={this.state.address.state}
                        onChange={this.handleChangeAddress}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Pin Code"
                        name="pincode"
                        id="userPincode"
                        value={this.state.address.pincode}
                        onChange={this.handleChangeAddress}
                        required
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.handleSubmit}
                  data-bs-dismiss="modal"
                >
                  Save changes
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  data-bs-dismiss="modal"
                  onClick={this.loadData}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
