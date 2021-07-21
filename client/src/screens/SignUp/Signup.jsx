import React, { useState, useEffect } from 'react';
// import '../css/register.css'
import { Link } from 'react-router-dom';
import { Col, Form, Row, Button } from 'react-bootstrap';
import SignupSvg from '../../images/signup.svg';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userAction';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

const Signup = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // redirect user to shipping screen after sign in
  //first check if there is redirect query param on the url
  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  //get userInfo from redux store
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();

  // handle login form submit
  const submitHandler = (e) => {
    e.preventDefault();
    // check if password and confirm password match
    if (password !== confirmPassword) {
      alert('password and confirm password do not match');
    } else {
      // register action here
      dispatch(register(name, email, password));
    }
  };
  // if userInfo, redirect user on page load
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, redirect, props.history]);

  return (
    <div className='col-10 mx-auto mt-5'>
      <Row className=' d-flex justify-content-between pt-5'>
        <Col lg={6} md={6} sm={12}>
          <h2 className='my-4'> Sign up </h2>
          <p className='my-3'> Please fill this form to create an account! </p>
          <Form onSubmit={submitHandler}>
            <Row>
              <div>
                {loading && <LoadingBox />}
                {error && <MessageBox variant='danger'>{error}</MessageBox>}
              </div>
              <Col>
                <Form.Control
                  type='text'
                  placeholder='Full name'
                  value={name}
                  required={true}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    type='email'
                    id='email'
                    placeholder='Enter email'
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Control
                  type='password'
                  id='password'
                  placeholder='Enter password'
                  value={password}
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    type='password'
                    placeholder='Confirm password'
                    id='confirmPassword'
                    value={confirmPassword}
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId='formBasicCheckbox'>
              <Form.Check
                name='acceptTerms'
                type='checkbox'
                label='I accept the Terms & Privacy Policy'
              />
            </Form.Group>

            <Button type='submit' variant='info' className='my-2'>
              Sign up
            </Button>
          </Form>
          <p className='mt-3'>
            {' '}
            Already have an account? <Link to='/signin'> Login here </Link>{' '}
          </p>
        </Col>
        <Col lg={5} md={6} sm={12}>
          <img src={SignupSvg} alt='signupSvg' className='w-100 h-100' />
        </Col>
      </Row>
    </div>
  );
};

export default Signup;
