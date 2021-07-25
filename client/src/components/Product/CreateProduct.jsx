import React, { useState } from 'react'
import { Col, Form, Row, Button, } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { createItem } from '../../actions/productActions'

const CreateProduct = () => {

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [category, setCategory] = useState("")
  const [countInStock, setCountInStock] = useState(0)

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault()
      dispatch(createItem({seller: userInfo.userId, title, price, description, picture, category, countInStock}))
      window.location.href = "/";
  };
  return (
    <>
      <Row>
        <Col xl={10}>
          <Form onSubmit={submitHandler}>
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
              <Col>
                <Form.Group>
                  <Form.Label> Add Picture </Form.Label>
                  <Form.Control
                    type='text'
                    value={picture}
                    onChange={(e) => setPicture(e.target.value)}
                  />
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

            <Button type='submit' variant='info' className='my-2'>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default CreateProduct
