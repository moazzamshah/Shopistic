import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../actions/userAction';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import './signin.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import SigninSvg from '../../images/signin.svg';

const SignIn = ({ location, history }) => {
  // YUP validation
  // set states for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  //get userInfo from redux store
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  // redirect user to shipping screen after sign in
  //first check if there is redirect query param on the url
  const redirect = location.search ? location.search.split('=')[1] : '/';

  // if userInfo, redirect user on page load
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
    console.log('userSignin');
  }, [userInfo, redirect, history]);

  // handle login form submit
  const submitHandler = (e) => {
    e.preventDefault();
    // signin action here
    dispatch(signin(email, password));
  };

  return (
    <>
      <div>
        {loading && <LoadingBox />}
        {error && <MessageBox variant='danger'>{error}</MessageBox>}
      </div>
      <Container className='col-10 mx-auto'>
        <Row className=' d-flex justify-content-between pt-5 '>
          <Col lg={4} md={6} sm={12}>
            <h2 className='my-4'> Sign In </h2>
            <Form onSubmit={submitHandler}>
              <Form.Group className='mb-3'>
                <Form.Control
                  type='email'
                  id='email'
                  placeholder='Enter email'
                  name={email}
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Control
                  type='password'
                  id='password'
                  placeholder='Password'
                  value={password}
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='d-flex justify-content-between'>
                <Form.Check
                  type='checkbox'
                  label='Remember me'
                  className='text-muted'
                />
                <div className='reset'>
                  <Link to='/forgot'>
                    <small>Forgot Password?</small>
                  </Link>
                </div>
              </Form.Group>

              <Button variant='info' type='submit' className='my-3 w-100'>
                Login
              </Button>
              <div className='hide-md-lg'>
                <p> -Or sign in with- </p>
              </div>
              <div className='d-flex justify-content-between flex-column text-center form-group'>
                <a
                  href='http://localhost:8000/passport/facebook'
                  className='fb_button my-btn'
                >
                  <i className='fa fa-facebook fa-fw'></i> Login with Facebook
                </a>
                <a
                  href='http://localhost:8000/passport/auth/google'
                  className='google_button my-btn'
                >
                  <i className='fa fa-google fa-fw'></i> Login with Gmail
                </a>
              </div>
            </Form>
            <div className='my-3'>
              New customer?{' '}
              <Link to={`/signup?redirect=${redirect}`}>
                Create your account
              </Link>
            </div>
          </Col>
          <Col lg={6} md={6} sm={12}>
            <img src={SigninSvg} alt='signinSvg' className='w-100 h-100' />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default SignIn;
