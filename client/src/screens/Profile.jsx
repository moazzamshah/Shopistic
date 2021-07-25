import React from 'react';
import { Container, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import CreateProduct from '../components/Product/CreateProduct';
import MyProducts from '../components/Product/MyProducts';

const Profile = () => {
  return (
    <Container className='col-10 mx-auto'>
      <div className='mt-5'>
        <Button as={Link} variant='dark' to='/accountSetting'>
          <i class='fa fa-edit'></i> Edit profile
        </Button>
      </div>
      <CreateProduct />
      <MyProducts />
    </Container>
  );
};

export default Profile;
