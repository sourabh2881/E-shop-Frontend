import axios from "axios";
import React, { Component } from "react";
import CartItem from "./CartItem";
import WithRouter from "./withRouter";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      totalPrice: 0,
    };
    this.placeOrder = this.placeOrder.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.loadData = this.loadData.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
  }

  placeOrder() {
    axios
      .get(
        `http://localhost:8080/order/${localStorage.getItem("id")}/createOrder`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        this.props.navigate("/order");
      })
      .catch((error) => {
        alert("error occured");
      });
  }

  updateQuantity = (id, quantity) => {
    const request = {
      quantity: quantity,
    };

    axios
      .post(
        `http://localhost:8080/cart/${localStorage.getItem(
          "id"
        )}/changeQuantity/${id}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        this.loadData();
      })
      .catch((error) => {
        this.loadData();
        const statusCode = error.request.status;
        if (statusCode === 401 || statusCode === 403) {
          alert("try logging in again!");
        } else if (statusCode === 404 || statusCode === 500) {
          this.loadData();
          alert("Server is down, try again after some time.");
        } else {
          alert("Some error occured");
          console.log(this.state.cartItems);
        }
      });
  };

  removeFromCart = (event) => {
    axios
      .get(
        `http://localhost:8080/cart/${localStorage.getItem("id")}/remove/${
          event.target.id
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        alert("Item removed from the cart");
        this.loadData();
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
  };

  loadData() {
    axios
      .get(`http://localhost:8080/cart/${localStorage.getItem("id")}/getCart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        let total = 0;
        for (let i = 0; i < response.data.length; i++) {
          total += response.data[i].quantity * response.data[i].product.price;
        }
        this.setState({
          cartItems: response.data,
          totalPrice: total,
        });
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

  renderCartItems = () => {
    return this.state.cartItems.map((cartItems) => (
      <CartItem
        key={cartItems.id}
        cartItems={cartItems}
        removeFromCart={this.removeFromCart}
        handleChange={this.handleChange}
        updateQuantity={this.updateQuantity}
      />
    ));
  };

  render() {
    return (
      <>
        {this.state.cartItems.length > 0 ? (
          <div>
            {this.renderCartItems()}
            <hr />
            <div className="cartContainer">
              <h4>Total Amount : {this.state.totalPrice}</h4>
              <button className="cartButton1" onClick={this.placeOrder}>
                Place Order
              </button>
            </div>
          </div>
        ) : (
          <h1>Your Cart is empty.</h1>
        )}
      </>
    );
  }
}

export default WithRouter(Cart);
