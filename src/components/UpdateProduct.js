import React from "react";

function AddProduct() {
  const [changeProduct, setProduct] = useState({
    name: product.name,
    price: product.price,
    category: product.category,
    details: product.details,
  });

  const handleChange = (event) => {
    setProduct({ ...changeProduct, [event.target.name]: event.target.value });
  };

  const updateProduct = (event) => {
    const request = {
      id: event.target.id,
      name: changeProduct.name,
      price: changeProduct.price,
      category: changeProduct.category,
      details: changeProduct.details,
    };

    axios
      .post(`http://localhost:8080/products/update`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        alert("Product updated");
      })
      .catch((error) => {
        alert("error occured");
      });
  };

  return (
    <div className="m-5 ">
      <div className="row" style={{ height: "380px" }}>
        <div className="col-4">
          <img
            src="https://cdn.pixabay.com/photo/2016/04/15/08/04/strawberry-1330459_960_720.jpg"
            alt="product-item"
            style={{ width: "100%", height: "380px" }}
          />
        </div>
        <div className="col-7 mx-5">
          Name:
          <input
            name="name"
            value={changeProduct.name}
            onChange={handleChange}
          ></input>
          Price:
          <input
            name="price"
            value={changeProduct.price}
            onChange={handleChange}
          ></input>
          Category:
          <input
            name="category"
            value={changeProduct.category}
            onChange={handleChange}
          ></input>
          Details:
          <input
            name="details"
            value={changeProduct.details}
            onChange={handleChange}
          ></input>
          <button
            id={product.id}
            onClick={updateProduct}
            style={{ marginTop: "32px", height: "50px" }}
          >
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
