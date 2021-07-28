import { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { attemptResetPassword } from "../../actions/userAction";
import forgotPassSvg from '../../images/signin2.svg';


const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [success, setSuccess] = useState(null);
  const { token } = useParams();
  const [isSubmited, setIsSubmited] = useState(null);

  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user/resetPassword/${token}`)
      .then((res) => {
        console.log(res.data);
        setId(res.data.id);
        if (res.data) {
          setSuccess(true);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(password);
    dispatch(attemptResetPassword(password, id));
    setIsSubmited(true);
  };

  return isSubmited ? (
    <div className='container'>
      <h2>
        your password has been reset Successfully.
        <b>you will receive a confirmation email soon.</b>
        It can take up to 5 min to receive our email.
      </h2>
    </div>
  ) : (
    <div>
      <h1>Reset Password</h1>
      {success ? (
        <div className='col-10 mx-auto mt-5'>
          <Row className='pt-5 d-flex justify-content-between align-items-center'>
            <Col lg={4} md={6} sm={12} className='border p-4 shadow'>
              <h2>Reset Password</h2>
              <Form onSubmit={handleSubmit} validationSchema={validationSchema}>
                <Form.Group controlId='formBasicPassword'>
                  <Form.Control
                    className='my-4'
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    name='password'
                    placeholder='Enter a new password'
                  />
                </Form.Group>

                <Form.Group controlId='formBasicPassword'>
                  <Form.Control
                    className='my-4'
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    name='password'
                    placeholder='Confirm password'
                  />
                </Form.Group>

                <Button variant='info' type='submit'>
                  Reset password
                </Button>
              </Form>
            </Col>
            <Col lg={5} md={6} sm={12}>
              <img
                src={forgotPassSvg}
                alt='signinSvg'
                className='w-100 h-100'
              />
            </Col>
          </Row>
        </div>
      ) : (
        <h3> wrong token or your token already expired..!! </h3>
      )}
    </div>
  );
};

export default ResetPassword;
