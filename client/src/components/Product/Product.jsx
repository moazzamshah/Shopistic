import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

function Product(props) {
  let { product } = props;

  return (
    <Card className="my-3 p-3 rounded shadow">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.picture} alt="product" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title>{product.title}</Card.Title>
        </Link>
        <Card.Text>{product.description}</Card.Text>
        <Card.Title className="price">${product.price}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default Product;
