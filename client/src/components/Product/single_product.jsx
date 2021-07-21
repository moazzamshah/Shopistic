import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function SingleProduct(props) {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios.get("http://localhost:8000/api/items/" + id).then((res) => {
      setProduct(res.data);
    });
  }, []);
  
  return (
    <div className="card">
      <h1>Title: {product.title}</h1>
      <div></div>
      <img className="medium" src={product.picture} alt="product" />
      <div className="card-body">
        <div>Category: {product.category}</div>
        <div>Description: {product.description}</div>

        <div className="price">Price: ${product.price}</div>
      </div>
    </div>
  );
}

export default SingleProduct;
