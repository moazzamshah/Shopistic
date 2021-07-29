import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editItem } from '../../actions/productActions';
import { Form, Row, Col, Button } from 'react-bootstrap';

const EditProduct = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const { id } = useParams();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  console.log(userInfo, 'this is the user info');
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      editItem(
        {
          seller: userInfo.userId,
          title,
          price,
          description,
          picture,
          category,
          countInStock,
        },
        id
      )
    );
    window.location.href = '/myproducts';
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/api/items/${id}`).then((res) => {
      setTitle(res.data.title);
      setPrice(res.data.price);
      setDescription(res.data.description);
      setPicture(res.data.picture);
      setCategory(res.data.category);
      setCountInStock(res.data.countInStock);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='col-10 mx-auto mt-5'>
      <Row>
        <Col>
          <Form onSubmit={submitHandler}>
            <hr />
            <h2 className='font-weight-bold my-4'> Update your product </h2>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Product Title </Form.Label>
                  <Form.Control
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Price: €</Form.Label>
                  <Form.Control
                    placeholder='€'
                    type='number'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label> Description </Form.Label>
                  <Form.Control
                    style={{ maxHeight: '100px', minHeight: '100px' }}
                    as='textarea'
                    rows='5'
                    name='message'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='formFile' className=''>
                  <Form.File
                    label='Upload a picture'
                    type='file'
                    name='picture'
                    // onChange={(e) => setPicture(e.target.files[0])}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col></Col>
            </Row>
            <Form.Group>
              <Form.Label> Count in stock </Form.Label>
              <Form.Control
                type='number'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Button variant='info' type='submit' className='mt-3'>
                Save Changes
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default EditProduct;
