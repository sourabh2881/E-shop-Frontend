import axios from "axios";
import React, { Component } from "react";

export class Order extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: []
    };
  }

  componentDidMount() {
    axios
      .get(
        `http://localhost:8080/order/${localStorage.getItem("id")}/getOrders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        this.setState({
          orders: response.data,
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

  render() {
    return (
      <>
        {this.state.orders.length > 0 ? (
          this.state.orders.map((order) => {
            return (
              <div key={order.orderId} className="orderContainer m-4 p-3 ">
                <div className="orderHeading">
                  <h2>MyBasket</h2>
                  <div>
                    <h2>{order.status ? "Accepted" : "Cancelled"}</h2>
                    <h5>{Date(order.time.toLocaleString()).slice(4,15)}</h5>
                  </div>
                </div>

                <div className="renderedOrders orderItemHeading">
                  <span>Name:</span>
                  <span>Category:</span>
                  <span>Quantity:</span>
                  <span>Price:</span>
                </div>

                {order.orderItems.map((orderItem) => {
                  return (
                    <div key={orderItem.products.id} className="renderedOrders">
                      <span>{orderItem.products.name}</span>
                      <span>{orderItem.products.category}</span>
                      <span>{orderItem.quantity}</span>
                      <span>{orderItem.price}</span>
                    </div>
                  );
                })}
                <h4>Rs. {order.price}</h4>
              </div>
            );
          })
        ) : (
          <h1>No order have been made by you.</h1>
        )}
      </>
    );
  }
}

export default Order;
