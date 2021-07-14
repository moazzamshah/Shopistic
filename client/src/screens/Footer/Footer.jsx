import React from 'react';
import './footer.css';
import { Form, Button } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className='main-footer mt-5'>
      <section className='ft-main my-1 col-10 mx-auto '>
        <div className='ft-main-item'>
          <h2 className='ft-title'>About</h2>
          <ul>
            <li>
              <a href='#'>Services</a>
            </li>
            <li>
              <a href='/pricing'>Pricing</a>
            </li>
            <li>
              <a href='#'>Customers</a>
            </li>
            <li>
              <a href='#'>Careers</a>
            </li>
          </ul>
        </div>
        <div className='ft-main-item'>
          <h2 className='ft-title'>Resources</h2>
          <ul>
            <li>
              <a href='#'>Docs</a>
            </li>
            <li>
              <a href='#'>Blog</a>
            </li>
            <li>
              <a href='#'>Shops</a>
            </li>
            <li>
              <a href='#'>Webinars</a>
            </li>
          </ul>
        </div>
        <div className='ft-main-item'>
          <h2 className='ft-title'>Contact</h2>
          <ul>
            <li>
              <a href='#'>Help</a>
            </li>
            <li>
              <a href='#'>Sales</a>
            </li>
            <li>
              <a href='#'>Advertise</a>
            </li>
          </ul>
        </div>
        <div className='ft-main-item'>
          <h2 className='ft-title'>Stay Updated</h2>
          <p>Subscribe to our newsletter to get our latest news</p>
          <Form.Group className='d-flex flex-column' controlId='formBasicEmail'>
            <Form.Control type='email' placeholder='Enter email' name='email' />
            <Button className='my-2' variant='info'>
              {' '}
              Subscribe{' '}
            </Button>
          </Form.Group>
        </div>
      </section>
      {/* Footer social */}
      <section className='ft-social '>
        <hr className='bg-light' />
        <ul className='d-flex justify-content-center align-items-center'>
          <li>
            <a href='#'>
              <i className='fa fa-facebook px-2'></i>
            </a>
          </li>
          <li>
            <a href='#'>
              <i className='fa fa-twitter px-2'></i>
            </a>
          </li>
          <li>
            <a href='#'>
              <i className='fa fa-instagram px-2'></i>
            </a>
          </li>
          <li>
            <a href='#'>
              <i className='fa fa-github px-2'></i>
            </a>
          </li>
          <li>
            <a href='#'>
              <i className='fa fa-linkedin px-2'></i>
            </a>
          </li>

        </ul>
      </section>

      {/* Footer legal  */}
      <section className='ft-legal'>
        <ul className='col-10 mx-auto d-flex justify-content-center align-items-center'>
          <li>
            <a href='#'>Terms &amp; Conditions</a>
          </li>
          <li>
            <a className='px-4' href='#'>
              Privacy Policy
            </a>
          </li>
          <li>&copy; 2021 Copyright ASA</li>
        </ul>
      </section>
    </footer>
  );
}
