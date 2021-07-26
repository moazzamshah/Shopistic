import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { Col, Form, Row, Button } from "react-bootstrap";
import profileScv from "../images/profile.svg";

function ProfileScreen() {
  //set States for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // get userinfo from redux store
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  // get userDetails from redux store
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  // get updated userInfo from redux store
  const userUpdatedProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = userUpdatedProfile;

  // dispatch userDetail action when page load
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      //reset user profile update
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      //dispatch actions to get user details
      dispatch(detailsUser(userInfo.userId));
      console.log(userInfo);
    } else {
      setName(user.name);
      setEmail(user.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userInfo._id, user]);

  //handler profile update
  const submitHandler = (e) => {
    e.preventDefault();
    //check whether passwords match
    if (password !== confirmPassword) {
      alert("Password and confirm password do not match");
    } else {
      //disptach update profile
      dispatch(updateUserProfile({ userId: user._id, name, email, password }));
      window.location.href = "/profile";
    }
  };

  return (
    <div className="col-10 mx-auto mt-5">
      <Row className=" d-flex justify-content-between pt-5">
        <Col lg={6} md={6} sm={12}>
          <h2 className="my-4"> User Profile </h2>
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox> {error} </MessageBox>
          ) : (
            <>
              {loadingUpdate && <LoadingBox />}
              {errorUpdate && (
                <MessageBox variant="danger"> {errorUpdate} </MessageBox>
              )}
              {successUpdate && (
                <MessageBox variant="success">
                  {" "}
                  Profile updated successfully{" "}
                </MessageBox>
              )}

              <Form onSubmit={submitHandler}>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        id="name"
                        placeholder="Name"
                        required={true}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Control
                        type="email"
                        id="email"
                        placeholder="Email"
                        required={true}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Control
                        type="password"
                        id="password"
                        placeholder="Change Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        id="confirmPassword"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button type="submit" variant="info" className="my-2">
                  Update
                </Button>
              </Form>
            </>
          )}
        </Col>
        <Col lg={4} md={6} sm={12}>
          <img src={profileScv} alt="signupSvg" className="w-100 h-100" />
        </Col>
      </Row>
    </div>
  );
}

export default ProfileScreen;
