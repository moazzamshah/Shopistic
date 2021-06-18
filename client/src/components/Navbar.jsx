import React from 'react';
import { Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
const NavBar = () => {
  return (
    <Navbar bg='dark shadow' className='' expand='lg' variant='dark'>
      {/* ================ BRAND ================ */}

      <Navbar.Brand className='font-italic' href='/'>
        StoreVerse
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        {/* ================ Nav Items on left ================ */}
        <Nav className='mr-auto'>
          <NavDropdown title='Start' id='basic-nav-dropdown'>
            <NavDropdown.Item href='#start'>
              Start your business
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href='#partner'>Our partners</NavDropdown.Item>
            <NavDropdown.Item href='/about'>About us</NavDropdown.Item>
          </NavDropdown>

          <Nav.Link href='#features'>Features</Nav.Link>
          <Nav.Link href='/pricing'>Pricing</Nav.Link>
        </Nav>

        {/* =============== NAV ITEMS ON RIGHT ================= */}
        <Nav className='ml-auto'>
          <Nav.Link href='/login'>Login</Nav.Link>
          <Button href='/signup' variant='outline-info'>
            Register
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
