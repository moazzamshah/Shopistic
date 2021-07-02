import { useState,useEffect } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";


const ResetPassword = () => {
  const [password, setPassword] = useState();
  const [success, setSuccess] = useState(null);
  const { token } = useParams();
  
  useEffect(() => {
    axios.get(`http://localhost:8000/user/resetPassword/${token}`).then((res) => {
      console.log(res.data);
      if(res.data){
        setSuccess(true)
      }
    
    });
  }, [])

  const onSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div>
      <h1>Reset Password</h1>
      { success ? <h3>your token is correct you can change your password</h3>: <h3> bad token </h3>}
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                placeholder="Enter a new password"
              />
            </Form.Group>
            {success && <Alert variant="success">{success}</Alert>}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ResetPassword;
