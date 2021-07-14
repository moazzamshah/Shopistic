import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './navbar.css';
import { Link } from 'react-router-dom';
const NavBar = () => {
  return (
    <>
      <Navbar expand='lg' variant='light' className='my-navbar mx-auto col-10 '>
        {/* ================ BRAND ================ */}

        <Navbar.Brand as={Link} className='text-info' to='/'>
          Shopistic{' '}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          {/* ================ Nav Items on left ================ */}
          <Nav>
            <NavDropdown title='Start' id='basic-nav-dropdown'>
              <NavDropdown.Item as={Link} to='/'>
                Start your business
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to='#partner'>
                Our partners
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/about'>
                About us
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to='/contact'>
              Contact
            </Nav.Link>
            <Nav.Link as={Link} to='/pricing'>
              Pricing
            </Nav.Link>
          </Nav>

          {/* =============== NAV ITEMS ON RIGHT ================= */}
          <Nav className='ml-auto' variant=''>
            <Nav.Link as={Link} to='/signin' className='btn-login'>
              Signin
            </Nav.Link>
            <Nav.Link as={Link} to='/signup'>
              Signup
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
