import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./navbar.css";
import { Link } from "react-router-dom";
import { signout } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
const NavBar = () => {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const signoutHandler = () => {
    dispatch(signout());
    window.location.href = "/";
  };
  return (
    <>
      <Navbar expand='lg' variant='light' className='my-navbar mx-auto col-10 font-weight-bold'>
        {/* ================ BRAND ================ */}

        <Navbar.Brand as={Link} className='text-class font-weight-bold' to='/'>
          <i class='fa fa-tags'></i> SHOPISTIC
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* ================ Nav Items on left ================ */}
          <Nav>
            <NavDropdown title="Start" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/">
                Start your business
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="#partner">
                Our partners
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/about">
                About us
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About Us
            </Nav.Link>
          </Nav>

          {/* =============== NAV ITEMS ON RIGHT ================= */}
          <Nav className="ml-auto" variant="">
            {userInfo && (
              <>
                <Nav.Link as={Link} to="/profile" className="btn-login">
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} onClick={signoutHandler}>
                  Signout
                </Nav.Link>
              </>
            )}
            {!userInfo && (
              <>
                <Nav.Link as={Link} to="/signin" className="btn-login">
                  Signin
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
