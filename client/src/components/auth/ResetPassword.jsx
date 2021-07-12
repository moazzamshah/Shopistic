import { useState,useEffect } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { attemptResetPassword } from "../../actions/userAction";


const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [id, setId] = useState("")
  const [success, setSuccess] = useState(null);
  const { token } = useParams();
  const [isSubmited, setIsSubmited] = useState(null);
  
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    password: Yup.string().min(6).max(60).required("Required"),
  });
  
  useEffect(() => {
    axios.get(`http://localhost:8000/api/user/resetPassword/${token}`).then((res) => {
      console.log(res.data);
      setId(res.data.id)
      if(res.data){
        setSuccess(true)
      }
    
    });
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(attemptResetPassword(password, id))
    setIsSubmited(true);
  };

  return isSubmited ? (
    <div className="container">
      <h2>
        your password has been rested Successfully.
        <b>you will recive a confirmation email soon.</b>
        It can take up to 5 min to receive our email.
      </h2>
    </div>
  ) : (
    <div>
      <h1>Reset Password</h1>
      { success ? <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit} validationSchema={validationSchema}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                placeholder="Enter a new password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>: <h3> wrong token or your token already expired..!! </h3>}
      
    </div>
  );
};

export default ResetPassword;
