import React from 'react';
import AslanImage from '../images/aslan.jpeg';
import AhmadImage from '../images/ahmadPic2.jpg';
import SyedImage from '../images/syed.jpg';
import { Col, Row } from 'react-bootstrap';

const AboutScreen = () => {
  return (
    <div className='col-10 mx-auto my-5'>
      <Row className='d-flex flex-column'>
        <h2 className='font-weight-bold'>- Meet The Team 👋 </h2>
        <p className='text-muted font-italic my-4'>
          ‟Individuals can and do make a difference, but it takes a team to
          really mess things up.”
        </p>
      </Row>

      {/* Ahmad */}

      <Row
        border='info'
        className=' my-3 d-flex flex-wrap p-3 justify-content-between shadow'
      >
        <Col sm={12} md={6} lg={4} className='ahmad my-3'>
          <div className='image-group d-flex flex-column w-50'>
            <img
              className='w-50 rounded-circle my-3 shadow'
              src={AhmadImage}
              alt='img-ahmad'
            />
            <div className='social-icons'>
              <ul className='d-flex'>
                <li>
                  <a
                    href='https://github.com/Ahmad575-a/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <i className='fa fa-github text-info px-2'></i>
                  </a>
                </li>
                <li>
                  <a
                    href='https://www.linkedin.com/in/ahmad-alghetheth/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <i className='fa fa-linkedin text-info'></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='text-group'>
            <h3> Ahmad Alghetheth </h3>
            <p className='my-3 text-muted'> Backend Web Developer </p>
            <p>
              Full-stack Web Developer (MERN stack) with 1-year experience, very
              passionate, high level of Learnability Team oriented, so excited
              and looking for new challenges and a position, to be helpful in
              Web Developing and to gain more experience.
            </p>
          </div>
        </Col>

        {/* ASLAN */}
        <Col sm={12} md={6} lg={4} className='aslan my-3'>
          <div className='image-group d-flex flex-column w-50'>
            <img
              className='w-50 rounded-circle my-3 shadow'
              src={AslanImage}
              alt='img-aslan'
            />
            <div className='social-icons'>
              <ul className='d-flex'>
                <li>
                  <a
                    href='https://github.com/ArslanRama'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <i className='fa fa-github px-2 text-info'></i>
                  </a>
                </li>
                <li>
                  <a
                    href='https://www.linkedin.com/in/aslan-ramazan-arslan/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <i className='fa fa-linkedin text-info'></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='text-group'>
            <h3> Aslan Ramazan Arslan </h3>
            <p className='text-muted my-3'> Front-End Web Developer </p>
            <p>
              I'm a dedicated and passionate web developer of 1 year experience
              in MERN with a background in educational institutions,
              administration and classroom management. Team player with an eye
              for detail, goal-oriented and driven.
            </p>
          </div>
        </Col>

        {/* Syed */}

        <Col sm={12} md={6} lg={4} className=' my-3'>
          <div className='image-group d-flex flex-column w-50'>
            <img
              className='w-50 rounded-circle my-3 shadow'
              src={SyedImage}
              alt='img-syed'
            />
            <div className='social-icons'>
              <ul className='d-flex'>
                <li>
                  <a
                    href='https://github.com/moazzamshah'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <i className='fa fa-github px-2 text-info'></i>
                  </a>
                </li>
                <li>
                  <a
                    href='https://www.linkedin.com/in/syed-moazzam-ali-shah-53b703a6/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <i className='fa fa-linkedin text-info'></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='text-group'>
            <h3> Syed Moazzam Shah </h3>
            <p className='text-muted my-3'> Front-End Web Developer </p>
            <p>
              Full-Stack Web Developer with a strong academic background in IT
              and Management. Recently, I took a one-year-full-time bootcamp
              where I learned all new web technologies based on MERN Stack. I
              love using MVC as it supports rapid and parallel development.
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AboutScreen;
