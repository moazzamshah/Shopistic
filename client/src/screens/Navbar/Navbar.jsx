import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './navbar.css';
import { Link } from 'react-router-dom';
import { signout } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
const NavBar = () => {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const signoutHandler = () => {
    dispatch(signout());
    window.location.href = '/';
  };
  return (
    <>
      <Navbar
        expand='lg'
        variant='light'
        className='my-navbar mx-auto col-10 font-weight-bold'
      >
        {/* ================ BRAND ================ */}

        <Navbar.Brand as={Link} className='text-class font-weight-bold' to='/'>
          <i className='fa fa-tags'></i> SHOPISTIC
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          {/* ================ Nav Items on left ================ */}
          <Nav>
            <NavDropdown title='Start' id='basic-nav-dropdown'>
              <NavDropdown.Item as={Link} to='/profile'>
                Start your business
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to='#partner'>
                Our partners
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/about'>
                About Us
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to='/contact'>
              Contact
            </Nav.Link>
            <Nav.Link as={Link} to='/about'>
              About Us
            </Nav.Link>
          </Nav>

          {/* =============== NAV ITEMS ON RIGHT ================= */}
          <Nav className='ml-auto' variant=''>
            {userInfo && (
              <>
                <Nav.Link href='/cart'>
                  <i className='fa fa-shopping-cart'></i> Cart
                </Nav.Link>
                <NavDropdown
                  className='font-weight-normal'
                  title={userInfo.name + ' 👤'}
                  id='basic-nav-dropdown'
                >
                  <NavDropdown.Item as={Link} to='/profile'>
                    Profile <i className='fa fa-user-circle'></i>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to='#' onClick={signoutHandler}>
                    Signout <i className='fa fa-sign-in'></i>
                  </NavDropdown.Item>
                </NavDropdown>

                {/* <Nav.Link as={Link} to='/profile'>
                  <i class='fa fa-user-circle'></i> Profile
                </Nav.Link>
                <Nav.Link as={Link} onClick={signoutHandler}>
                  Signout <i class='fa fa-sign-in'></i>
                </Nav.Link> */}
              </>
            )}
            {!userInfo && (
              <>
                <Nav.Link as={Link} to='/signin' className='btn-login'>
                  <i className='fa fa-sign-in'></i> Sign In
                </Nav.Link>
                <Nav.Link as={Link} to='/signup'>
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
