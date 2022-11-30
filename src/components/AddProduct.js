import axios from "axios";
import React, { Component } from "react";
import WithRouter from "./withRouter";

class AdminProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      price: "",
      details: "",
      category: "",
      subCategory: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddProduct = this.handleAddProduct.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleAddProduct(event) {
    if (!this.state.name || !this.state.price || !this.state.category) {
      alert("Input fields are required!");
    } else {
      const request = {
        name: this.state.name,
        price: this.state.price,
        details: this.state.details,
        category: this.state.category,
        subCategory: this.state.subCategory
      }
      axios
        .post(`http://localhost:8080/products/addProduct`, request, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          alert("Product added");
          this.props.navigate("/");
        })
        .catch((error) => {
          alert("error occured");
        });
    }
  }

  render() {
    return (
      <div>
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Name"
            name="name"
            style={{ width: "80%" }}
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            placeholder="Category"
            name="category"
            value={this.state.category}
            onChange={this.handleChange}
            required
            style={{ width: "80%" }}
          />
          <input
            type="text"
            placeholder="Details"
            name="details"
            value={this.state.details}
            onChange={this.handleChange}
            required
            style={{ width: "80%" }}
          />
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
            required
            style={{ width: "80%" }}
          />
          <input
            type="text"
            placeholder="SubCategory"
            name="subCategory"
            value={this.state.subCategory}
            onChange={this.handleChange}
            style={{ width: "80%" }}
            required
          />
          <button className="m-2" onClick={this.handleAddProduct}>
            Add Product
          </button>
        </div>
      </div>
    );
  }
}

export default WithRouter(AdminProductPage);
