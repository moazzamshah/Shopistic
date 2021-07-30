import React, { useState } from 'react';
import { Form, Col, Row, Button, Alert } from 'react-bootstrap';
import './contact.css';
import axios from 'axios';
import ContactSvg from '../../images/contact.svg';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/contact/backend/sendEmail', {
        name,
        email,
        message,
      })
      .then((result) => {
        console.log(result.data);
        console.log('form submitted');
      });
    setName('');
    setEmail('');
    setMessage('');
    setIsSubmitted(true);
  };

  return isSubmitted ? (
    <div className='mt-5 d-flex flex-column justify-content-between align-items-center'>
      <Alert variant='success'>
        🎉 We received your message Thank you for your using <b> Shopistic </b> {' '}
        🎉
      </Alert>
      <Link className='btn btn-dark' to='/'>
        {' '}
        Go Back{' '}
      </Link>
    </div>
  ) : (
    <div className='col-10 mx-auto mt-5'>
      <Row className='d-flex justify-content-between pt-5'>
        <Col lg={6} md={6} sm={12}>
          <h2 className='my-4'>Contact us</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Row className='my-3'>
              <Form.Group as={Col} controlId='formGridName'>
                <Form.Control
                  type='name'
                  name='name'
                  placeholder='Enter your name'
                  required={true}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Control
                  type='email'
                  name='email'
                  placeholder='Email'
                  required={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId='formBasicTextArea'>
              <Form.Control
                as='textarea'
                placeholder='Write your message'
                rows='5'
                name='message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>
            <Button type='submit' variant='info' className=' mt-3'>
              Send
            </Button>
          </Form>
        </Col>

        <Col lg={5} md={6} sm={12}>
          <img src={ContactSvg} alt='contactSvg' className='w-100 h-100' />
        </Col>
      </Row>
    </div>
  );
};
export default Contact;
