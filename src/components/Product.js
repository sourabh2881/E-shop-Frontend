import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function Products({ product }) {
  const navigate = useNavigate();

  const addToCart = (event) => {
    const id = localStorage.getItem("id");
    if (id) {
      axios
        .get(`http://localhost:8080/cart/${id}/add/${event.target.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          alert("Item added");
        })
        .catch((error) => {
          const statusCode = error.request.status;
          if (statusCode === 401 || statusCode === 403) {
            alert("Try logging in again!");
          } else if (statusCode === 404 || statusCode === 500) {
            alert("Server is down, try again after some time.");
          } else {
            alert("Some error occured");
          }
        });
    } else {
      navigate("/notLoggedMessage");
    }
  };

  return (
    <div className="productContainer">
      <div className="row">
        <div className="col-6">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="col-6 ">
          <p className="productName">{product.name}</p>
          <p className="productPrice">Rs. {product.price}</p>
          <p className="productDescription">{product.category}</p>
          <p className="productDescription">{product.details}</p>
          <button id={product.id} onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Products;
