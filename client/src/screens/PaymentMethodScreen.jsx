import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { Form, Button, Col, Container } from 'react-bootstrap';

function PaymentMethodScreen(props) {

    // set condition for paymentMethodScreen - only after user has filled in shipping address
    //  get shippingAddress data from redux store
    // const cart = useSelector(state => state.cart);
    // const { shippingAddress } = cart;
    //if user has not filled shippingaddress, redirect to shippingscreen
    // if (!shippingAddress.address) {
    //     props.history.push('/shipping');
    // }


  // set states
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  //use dispatch
  const dispatch = useDispatch();


    //submit payment handler
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch paymnentMethod action
        // dispatch(savePaymentMethod(paymentMethod));
        // redirect user to placeOrder screen
        props.history.push('/placeorder');
    };


  return (
    <div className='col-10 mx-auto mt-5'>
      <CheckoutSteps steps1 steps2 steps3 />
      <h1>Payment Method</h1>
      <Form className='form' onSubmit={submitHandler}>
        <Form.Group>
          <Col>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Form.Check
              className='my-2'
              type='radio'
              label='PayPal or Credit Card'
              name='paymentMethod'
              id='paypal'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>

            <Form.Check
              className='mb-2'
              type='radio'
              label='Stripe'
              name='paymentMethod'
              id='stripe'
              value='Stripe'
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Button type='submit' variant='info'>
              Continue
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default PaymentMethodScreen;
