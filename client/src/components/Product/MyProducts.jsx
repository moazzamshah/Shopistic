import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { removeItem } from '../../actions/productActions';

const MyProducts = () => {
  const [myProducts, setMyProducts] = useState([]);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/items/mine/' + userInfo.userId)
      .then((res) => {
        setMyProducts(res.data);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dispatch = useDispatch();

  const Deleteproduct = (id) => {
    dispatch(removeItem(id));
    window.location.href = '/profile';
  };

  return (
    <div className='mt-5'>
      <Row>
        {myProducts.map((item) => {
          return (
            <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
              <Card className='my-3 p-3 rounded shadow' key={item._id}>
                <Link to={`/product/${item._id}`}>
                  <Card.Img
                    style={{ height: '400px', objectFit: 'cover' }}
                    src={`http://localhost:8000/${item.picture}`}
                    alt='product'
                  />
                </Link>
                <Card.Body>
                  <Link to={`/product/${item._id}`}>
                    <Card.Title>{item.title}</Card.Title>
                  </Link>
                  {/* <Card.Text>{item.description}</Card.Text> */}
                  {/* Rating component */}
                  <Card.Title className='price'>€ {item.price}</Card.Title>
                </Card.Body>
                <Link className='btn btn-dark' to={`/edit/${item._id}`}>
                  <i className='fa fa-edit'> </i> Edit
                </Link>
                <Button
                  variant='danger'
                  className='mt-2'
                  onClick={() => {
                    Deleteproduct(item._id);
                  }}
                >
                  <i className='fa fa-trash'> </i> Delete
                </Button>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default MyProducts;
