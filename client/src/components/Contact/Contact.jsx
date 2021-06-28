import React, { useState } from 'react';
import { Form, Col } from 'react-bootstrap';
import './contact.css';
import axios from 'axios';

const Contact = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    message: '',
  });


  // handling the state value
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/contact/backend/sendEmail', user)
      .then((result) => {
        setUser({
          name: '',
          email: '',
          message: ''
        })
        console.log(result.data);
        console.log('form submitted');
      });
    setUser('');
  };

  return (
    <div className='container w-75 mt-5'>
      <h2>Contact Information</h2>
      <hr />
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId='formGridName'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              name='name'
              placeholder='Enter Your Name'
              required={true}
              // value={user.name}
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group as={Col} controlId='formBasicEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='Email'
              required={true}
              // value={user.email}
              onChange={handleInput}
            />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId='formBasicTextArea'>
          <Form.Label>Message</Form.Label>
          <Form.Control
            as='textarea'
            placeholder='Write your message'
            rows='5'
            name='message'
            // value={user.message}
            onChange={handleInput}
          />
        </Form.Group>
        <button type='submit' className='btn-my shadow my-4'>
          Submit
        </button>
        <hr />
      </Form>
    </div>
  );
};
export default Contact;
