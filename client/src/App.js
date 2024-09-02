// import {useEffect} from  "react"
// import './App.css';

// function App() {
//   useEffect(() => {
//     fetch("/data").then((resp) => resp.json()).then((resp) => {
//        console.log(resp);
//     })
//   }, []);
//   return (
//    <h1>Ekav</h1>
//   );
// }

// export default App;
// src/App.js

import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((products) => setProducts(products));
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("price", formData.price);
    form.append("description", formData.description);
    form.append("image", formData.image);

    fetch("/api/products", {
      method: "POST",
      body: form,
    })
      .then((response) => response.json())
      .then((product) => {
        setProducts((prevProducts) => [...prevProducts, product]);
      })
      .catch((error) => console.error("Error adding product:", error));

    setFormData({
      name: "",
      price: "",
      description: "",
      image: null,
    });
  };

  return (
    <div className="container mt-5">
      <h1>Product List</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Product Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>

      <div className="row">
        {products.map((product, index) => (
          <div className="col-md-4" key={index}>
            <div className="card mb-4">
              <img
                src={product.imageUrl}
                className="card-img-top"
                alt={product.name}
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.price} USD</p>
                <p className="card-text">{product.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
