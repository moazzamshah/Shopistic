import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyProducts = () => {
  const [myProducts, setMyProducts] = useState([]);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/items/mine/" + userInfo.userId)
      .then((res) => {
        setMyProducts(res.data);
        console.log(res.data);
      });
  }, []);

  return (
    <div>
      {myProducts.map((item) => {
        return (
          <Card className="my-3 p-3 rounded shadow" key={item._id}>
            <Link to={`/product/${item._id}`}>
              <Card.Img src={item.picture} alt="product" />
            </Link>
            <Card.Body>
              <Link to={`/product/${item._id}`}>
                <Card.Title>{item.title}</Card.Title>
              </Link>
              <Card.Text>{item.description}</Card.Text>
              {/* Rating component */}
              <Card.Title className="price">€{item.price}</Card.Title>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default MyProducts;
