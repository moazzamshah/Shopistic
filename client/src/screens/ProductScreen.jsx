import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsProduct } from '../actions/productActions';
// import data from '../data/products';
import {
  Row,
  Container,
  Col,
  Card,
  Button,
  ButtonToolbar,
} from 'react-bootstrap';

function ProductScreen(props) {
  // console.log(props);

  const dispatch = useDispatch();
  //props.match.params is the url path /product/:id
  //props.match.params.id = id (1, 2 , 3 etc... )
  // only return the product info of the one being clicked
  const productId = props.match.params.id;

  const [qty, setQty] = useState(1);

  // use store productDetails to replace product from seed data
  const productDetails = useSelector((state) => state.productDetails);
  // decontruct product, loading, error from productDetails
  const { product, loading, error } = productDetails;

  console.log(productDetails);

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  // direct to cart page when add to cart btn is clicked
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <>
      <div className='col-10 mx-auto mt-5'>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant='danger'> {error} </MessageBox>
        ) : (
          <div>
            <Button as={Link} variant='dark' className='my-3' to='/'>
              <i class='fa fa-arrow-left'> </i> Go back
            </Button>

            <div className='mt-3'>
              <Card className='p-3'>
                {/* product image */}
                <Row className='justify-content-between align-items-center'>
                  <Col xl={5} lg={6} sm={12} md={6} className=''>
                    <Card.Img src={product.picture} alt={product.name} />
                  </Col>

                  <Col xl={6} lg={6} sm={12} md={6} className='border-left pl-5'>
                    <div>
                      <ul>
                        <li>
                          <Card.Title className='text-capitalize'>
                            <b>{product.title}</b>
                          </Card.Title>
                        </li>
                        <li>
                          {' '}
                          <b>Price:</b> ${product.price}
                        </li>
                        <li>
                          <b>Description:</b>

                          <Card.Text>{product.description} </Card.Text>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <div>
                        <b>Status</b>
                      </div>

                      <div>
                        {product.countInStock > 0 ? (
                          <span> In Stock</span>
                        ) : (
                          <span variant='danger'> Unavailable</span>
                        )}
                      </div>

                      {/* Check product quantity first */}
                      {product.countInStock > 0 && (
                        <>
                          <div>
                            <div>Qty</div>
                            <div>
                              <select
                                className='my-3'
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[...Array(product.countInStock)].map(
                                  (x, i) => (
                                    <option key={i + 1} value={i + 1}>
                                      {i + 1}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          </div>

                          <Button variant='info' onClick={addToCartHandler}>
                            Add to Cart
                          </Button>
                          <div>
                            <Link
                              className='btn btn-warning mt-3'
                              to={`/review/create/${product._id}`}
                            >
                              Review
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  </Col>
                </Row>
              </Card>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductScreen;
