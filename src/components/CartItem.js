import React, { Component } from "react";

export class CartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: this.props.cartItems.quantity,
    };
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
  }

  decreaseQuantity(event) {
    if (this.state.quantity <= 1) {
      alert("Invalid Quantity");
    } else {
      this.setState((prevState) => ({
        [event.target.name]: prevState.quantity - 1,
      }));
      this.props.updateQuantity(event.target.id, this.state.quantity - 1);
    }
  }

  increaseQuantity(event) {
    this.setState((prevState) => ({
      [event.target.name]: prevState.quantity + 1,
    }));
    this.props.updateQuantity(event.target.id, this.state.quantity + 1);
  }

  componentDidUpdate() {
    if (this.state.quantity !== this.props.cartItems.quantity) {
      this.setState({
        quantity: this.props.cartItems.quantity,
      });
    }
  }

  render() {
    return (
      <div className="m-5 cartItemContainer">
        <img
          className="cartItemContainerImage1"
          src={this.props.cartItems.product.image}
          alt={this.props.cartItems.product.name}
        />

        <div>
          <p className="productName">{this.props.cartItems.product.name}</p>
          <p className="productPrice">
            Rs. {this.props.cartItems.product.price}
          </p>
        </div>
        <div className="cartQunatityChange">
          <img
            className="cartItemContainerImage2"
            src="./image/Subtract.png"
            alt="Decrease Quantity"
            name="quantity"
            id={this.props.cartItems.product.id}
            onClick={this.decreaseQuantity}
          />
          <span>{this.state.quantity}</span>
          <img
            className="cartItemContainerImage2"
            src="./image/add.png"
            alt="Increase Quantity"
            name="quantity"
            id={this.props.cartItems.product.id}
            onClick={this.increaseQuantity}
          />
        </div>
        <p className="productPrice">
          Rs. {this.props.cartItems.product.price * this.state.quantity}
        </p>
        <img
          className="cartItemContainerImage2"
          src="./image/Remove.png"
          alt="Remove Button"
          id={this.props.cartItems.product.id}
          onClick={this.props.removeFromCart}
        />
      </div>
    );
  }
}

export default CartItem;
