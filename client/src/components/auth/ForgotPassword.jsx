import React, { useState } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { attemptSendResetPasswordLink } from "../../actions/userAction";
import { Button, Row, Col, Form } from 'react-bootstrap';
import forgotPassSvg from '../../images/forgotpassword.svg';


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmited, setIsSubmited] = useState(null);

  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string().min(5).max(255).email().required("Required"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(attemptSendResetPasswordLink(email));
    setIsSubmited(true);
  };
  return isSubmited ? (
    <div className='container'>
      <h2>
        A reset link has been sent to your email.
        <b>You have 1 hour to activate your account.</b>
        It can take up to 5 min to receive our email.
      </h2>
    </div>
  ) : (
    <div className='col-10 mx-auto mt-5'>
      <Row className='pt-5 d-flex justify-content-between align-items-center'>
        <Col lg={4} md={6} sm={12} className='border p-4 shadow'>
          <h2>Reset Password</h2>
          <Form validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form.Group controlId='formBasicEmail'>
              <Form.Control
                className='my-4'
                type='email'
                id='email'
                placeholder='Enter email'
                name={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Button variant='info' type='submit'>
              Submit
            </Button>
          </Form>
        </Col>
        <Col lg={5} md={6} sm={12}>
          <img src={forgotPassSvg} alt='signinSvg' className='w-100 h-100' />
        </Col>
      </Row>
    </div>
  );
};

export default ForgotPassword;
