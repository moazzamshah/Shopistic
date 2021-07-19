import React, { useEffect } from 'react';
import Product from '../../components/Product';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import HomeImage from '../../images/home-image2.svg';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import './home.css';

function HomeScreen() {
  // import useDispatch from react-redux
  const dispatch = useDispatch();
  // get all productList (products, loading,  error) from redux store using useSelector
  // useSelector accepts a function with state as parameter.
  // state is what defined in store.js (combineReducers)
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  //When page first load, fetch product data from backend
  useEffect(() => {
    // use dispatch to replace axios product fetch and set loading, error. Make sure to call listProducts function
    dispatch(listProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Container id='header' className='col-10 mx-auto'>
      <Row className='d-flex align-items-center justify-content-between mt-5 py-5 main__row'>
        <Col lg={6} md={6} sm={12} className='d-flex flex-column'>
          <h1>
            Grow your business with
            <span className='text-info d-block'>
              <strong> Shopistic </strong>
            </span>
          </h1>
          <div className='mt-3'>
            <Link to='/signin' className='btn-get-started'>
              Get Started 🚀
            </Link>
          </div>
        </Col>
        <Col lg={6} md={6} sm={12} className='header-img mt-5'>
          <img className='animated w-100' src={HomeImage} alt='img' />
        </Col>
      </Row>
      <div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant='danger'> {error} </MessageBox>
        ) : (
          <div className='row center'>
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}

export default HomeScreen;
