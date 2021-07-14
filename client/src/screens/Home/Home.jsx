import React, { useEffect } from 'react';
// import Product from '../components/Product';
// import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';
// import { useSelector, useDispatch } from 'react-redux';
// import { listProducts } from '../actions/productActions';
import HomeImage from '../../images/home-image2.svg';
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import './home.css';

function HomeScreen () {
    //import useDispatch from react-redux
    // const dispatch = useDispatch();
    // get all productList (products, loading,  error) from redux store using useSelector
    // useSelector accepts a function with state as parameter.
    // state is what defined in store.js (combineReducers)
    // const productList = useSelector(state => state.productList);
    // const { products, loading, error } = productList;

    //When page first load, fetch product data from backend
    useEffect(() => {
        // use dispatch to replace axios product fetch and set loading, error. Make sure to call listProducts function
        // dispatch(listProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      // <div>
      //     {
      //         loading ? <LoadingBox />
      //             : error ? <MessageBox variant="danger"> {error} </MessageBox>
      //                 : ( <div className='row center'>
      //   	{ products.map(product => <Product key={product._id} product={product} />)}
      //   </div> )
      //     }

      // </div>
      <div>
        <section id='header' className='d-flex align-self-center pt-5'>
          <div className='container-fluid mt-2'>
            <Row>
              <div className='col-10 mx-auto'>
                <div className='row'>
                  <div className='col-md-6 py-5 pt-lg-0 order-1 order-lg-1 d-flex justify-content-center flex-column'>
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
                  </div>
                  <div className='col-lg-6 order-2 order-lg-2 header-img'>
                    <img
                      className='img-fluid animated'
                      src={HomeImage}
                      alt='img'
                    />
                  </div>
                </div>
              </div>
            </Row>
          </div>
        </section>

      </div>
    );
}

export default HomeScreen;
