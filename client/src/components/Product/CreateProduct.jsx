import React, { useState } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { createItem } from '../../actions/productActions';
import axios from 'axios';



const CreateProduct = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState();
  // const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  // const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    // console.log(formData);
    formData.append('seller', userInfo.userId);
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    // formData.append('category', category);
    formData.append('countInStock', countInStock);
    formData.append('picture', picture);

    axios.post(`http://localhost:8000/api/items/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: userInfo.token,
      },
    }).then(res => console.log(res.data)).catch(error => console.log(error));

    // dispatch(createItem(formData));
    // dispatch(
    //   createItem({
    //     seller: userInfo.userId,
    //     title,
    //     price,
    //     description,
    //     picture,
    //     category,
    //     countInStock,
    //   })
    // );
    // window.location.href = '/profile';

  };
  return (
    <>
      <Row>
        <Col xl={10}>
          <Form
            method='post'
            // encType='multipart/form-data'
            onSubmit={submitHandler}
          >
            <hr />
            <h2 className='font-weight-bold my-4'> Add your product </h2>
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

              {/* Image part */}
              <Col>
                <Form.Group controlId='formFile' className=''>
                  <Form.File
                    label='Upload a picture'
                    type='file'
                    name='picture'
                    onChange={(e) => setPicture(e.target.files[0])}
                  />
                  {/* <Button variant='info' type='submit'>
                    Submit
                  </Button> */}
                </Form.Group>
              </Col>
            </Row>

            <Form.Group>
              <Form.Label> Count in stock </Form.Label>
              <Form.Control
                type='number'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>

            <Button type='submit' variant='info' className='my-2' >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default CreateProduct;
