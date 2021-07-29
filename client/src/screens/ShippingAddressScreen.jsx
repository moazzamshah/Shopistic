import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import CartImage from '../images/shopp.svg';


function ShippingAddressScreen(props) {
  //check if user has already signed in, if not, redirect user to signin
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  if (!userInfo) {
    props.history.push('/signin');
  }
  //get previous shipping address used from redux store
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  //set shippingaddress as initial States
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [zipcode, setZipcode] = useState(shippingAddress.zipcode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();

  // handle form submission
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch save shipping address action
    // dispatch(saveShippingAddress({fullName, address, city, zipcode, country}));
    axios
      .post('http://localhost:8000/api/orders/shipping', {
        fullName,
        address,
        city,
        zipcode,
        country,
      })
      .then((res) => console.log(res.data));
    //direct user to PaymentScreen
    // props.history.push("/payment");
  };

  return (
    <div className='col-10 mx-auto mt-5'>
      <CheckoutSteps step1 step2 />
      <Row className='d-flex justify-content-between'>
        <Col lg={6} md={4} sm={12} xl={4}>
          <Form className='form' onSubmit={submitHandler}>
            <Row>
              <Col>
                <h1> Shipping Address</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label htmlFor='fullName'>Full Name</Form.Label>
                  <Form.Control
                    id='fullName'
                    placeholder='Enter full name'
                    type='text'
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label htmlFor='address'>Address</Form.Label>
                  <Form.Control
                    id='address'
                    placeholder='Enter address'
                    type='text'
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label htmlFor='city'>City</Form.Label>
                  <Form.Control
                    id='city'
                    placeholder='Enter city'
                    type='text'
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label htmlFor='zipcode'>Zipcode</Form.Label>
                  <Form.Control
                    id='zipcode'
                    placeholder='Enter Zipcode'
                    type='text'
                    required
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label htmlFor='country'>Country</Form.Label>
                  <Form.Control
                    id='country'
                    placeholder='Country Name'
                    type='text'
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button variant='info' type='submit'>
                  Continue
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>

        <Col lg={6} md={6} sm={12} xl={5} className='my-5'>
          <img className='w-100' src={CartImage} alt='img' />
        </Col>
      </Row>
    </div>
  );
}

export default ShippingAddressScreen;
