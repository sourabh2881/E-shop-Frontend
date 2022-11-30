import axios from "axios";
import React from "react";
import Product from "./Product";

import { Component } from "react";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      minPrice: 0,
      maxPrice: 1000000,
      category: "",
      searchString: "",
      categoryList: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.loadData = this.loadData.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.loadCategories = this.loadCategories.bind(this);
  }

  loadData() {
    this.setState({
      searchString: this.props.searchString,
    });
    const searchString = this.props.searchString + " getMeAllTheProducts";
    axios
      .get(`http://localhost:8080/products/search/${searchString}`)
      .then((response) => {
        this.setState({
          products: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        const statusCode = error.request.status;
        if (statusCode === 404 || statusCode === 500) {
          alert("Server is down, try again after some time.");
        } else {
          alert("Some error occured");
        }
      });
  }

  loadCategories() {
    axios
      .get(`http://localhost:8080/products/getAllCategories`)
      .then((response) => {
        const categories = response.data;
        categories.unshift("All");
        this.setState({
          categoryList: categories,
        });
      })
      .catch((error) => {
        console.log(error);
        const statusCode = error.request.status;
        if (statusCode === 404 || statusCode === 500) {
          alert("Server is down, try again after some time.");
        } else {
          alert("Some error occured");
        }
      });
  }

  componentDidMount() {
    this.loadData();
    this.loadCategories();
  }

  componentDidUpdate() {
    if (this.props.searchString !== this.state.searchString) {
      this.loadData();
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleCategoryChange(event) {
    this.handleChange(event);
    const category = event.target.value;
    if (category === "All") {
      this.loadData();
    } else {
      axios
        .get(`http://localhost:8080/products/${category}`)
        .then((response) => {
          this.setState({
            products: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
          const statusCode = error.request.status;
          if (statusCode === 404 || statusCode === 500) {
            alert("Server is down, try again after some time.");
          } else {
            alert("Some error occured");
          }
        });
    }
  }

  applyFilter(event) {
    event.preventDefault();
    const request = {
      minPrice: this.state.minPrice,
      maxPrice: this.state.maxPrice,
    };
    let filterCategory = this.state.category;
    if (!this.state.minPrice) {
      request.minPrice = 0;
    }
    if (!this.state.maxPrice) {
      request.maxPrice = 1000000000;
    }
    axios
      .post(
        `http://localhost:8080/products/${filterCategory}/getFilteredProducts`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        this.setState({
          products: response.data,
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

  renderProducts = () => {
    return this.state.products.map((product) => (
      <Product key={product.id} product={product} />
    ));
  };

  render() {
    return (
      <div>
        <div className="d-flex m-5 mb-0 homeContainer">
          <h3>Filter: </h3>
          <label htmlFor="minPrice">Minimum Price:</label>
          <input
            id="minPrice"
            type="number"
            name="minPrice"
            value={this.state.minPrice}
            onChange={this.handleChange}
          />
          <label htmlFor="maxPrice">Maximum Price:</label>
          <input
            id="maxPrice"
            type="number"
            name="maxPrice"
            value={this.state.maxPrice}
            onChange={this.handleChange}
          />
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={this.state.category}
            onChange={this.handleCategoryChange}
          >
            {this.state.categoryList.map((category) => {
              return (
                <option key={category} name="category">
                  {category}
                </option>
              );
            })}
          </select>
          <button onClick={this.applyFilter}>Apply</button>
        </div>
        {this.state.products.length === 0 ? (
          <h1>No product Found!</h1>
        ) : (
          <div className="productItem">
          {this.renderProducts()}
          </div>
        )}
      </div>
    );
  }
}
export default Home;
