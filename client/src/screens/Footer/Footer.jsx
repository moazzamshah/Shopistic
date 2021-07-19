import React from 'react';
import './footer.css';
import { Form, Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='main-footer'>
      <Row className='ft-main col-11 mx-auto'>
        <div className='ft-main-item'>
          <h3 className='ft-title'>About</h3>
          <ul>
            <li>
              <Link as='#'>Services</Link>
            </li>
            <li>
              <Link as='/pricing'>Pricing</Link>
            </li>
            <li>
              <Link as='#'>Customers</Link>
            </li>
            <li>
              <Link as='#'>Careers</Link>
            </li>
          </ul>
        </div>

        <div className='ft-main-item'>
          <h3 className='ft-title'>Resources</h3>
          <ul>
            <li>
              <Link as='#'>Docs</Link>
            </li>
            <li>
              <Link as='#'>Blog</Link>
            </li>
            <li>
              <Link as='#'>Shops</Link>
            </li>
            <li>
              <Link as='#'>Webinars</Link>
            </li>
          </ul>
        </div>

        <div className='ft-main-item'>
          <h3 className='ft-title'>Contact</h3>
          <ul>
            <li>
              <Link as='#'>Help</Link>
            </li>
            <li>
              <Link as='#'>Sales</Link>
            </li>
            <li>
              <Link as='#'>Advertise</Link>
            </li>
          </ul>
        </div>

        <div className='ft-main-item'>
          <h3 className='ft-title'>Stay Updated</h3>
          <p>Subscribe to our newsletter to get our latest news</p>
          <Form.Group className='d-flex flex-column' controlId='formBasicEmail'>
            <Form.Control type='email' placeholder='Enter email' name='email' />
            <Button className='my-2' variant='info'>
              {' '}
              Subscribe{' '}
            </Button>
          </Form.Group>
        </div>
      </Row>
      <hr className='bg-light' />
      {/* Footer social */}
      <section className='ft-social '>
        <ul className='d-flex justify-content-center align-items-center'>
          <li>
            <Link as='#'>
              <i className='fa fa-facebook px-2'></i>
            </Link>
          </li>
          <li>
            <Link as='#'>
              <i className='fa fa-twitter px-2'></i>
            </Link>
          </li>
          <li>
            <Link as='#'>
              <i className='fa fa-instagram px-2'></i>
            </Link>
          </li>
          <li>
            <Link as='#'>
              <i className='fa fa-github px-2'></i>
            </Link>
          </li>
          <li>
            <Link as='#'>
              <i className='fa fa-linkedin px-2'></i>
            </Link>
          </li>
        </ul>
      </section>

      {/* Footer legal  */}
      <section className='ft-legal'>
        <ul className='col-11 mx-auto d-flex justify-content-between align-items-center'>
          <li>
            <Link as='#'>Terms &amp; Conditions</Link>
          </li>
          <li>
            <Link as='#'>
              Privacy Policy
            </Link>
          </li>
          <li>&copy; 2021 Copyright ASA</li>
        </ul>
      </section>
    </footer>
  );
}
