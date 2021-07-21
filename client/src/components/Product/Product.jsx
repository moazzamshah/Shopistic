import React from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating";

function Product(props) {
  let { product } = props;
  console.log(product)

  return (
    <div className="card">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.picture} alt="product" />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.title}</h2>
        </Link>
        <div>{product.description}</div>
        {/* Rating component */}
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <div className="price">${product.price}</div>
      </div>
    </div>
  );
}

export default Product;
