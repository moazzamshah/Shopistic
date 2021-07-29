import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsProduct } from '../actions/productActions';
import { addToCart } from '../actions/cartActions'
// import data from '../data/products';
import {
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Image,
  Form,
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

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  // console.log(userInfo)
  // direct to cart page when add to cart btn is clicked
  const addToCartHandler = () => {
    dispatch(addToCart(productId, userInfo.userId, qty))
    // props.history.push(`/cart`);
     window.location.href = '/cart';
  };

  return (
    <>
      <div className='col-10 mx-auto mt-5'>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant='danger'> {error} </MessageBox>
        ) : (
          <>
            <Link className='my-3 btn btn-dark' to='/'>
              <i className='fa fa-arrow-left'> </i> Go back
            </Link>

            <div className='mt-3'>
              <Row className='justify-content-around'>
                {/* Image Column */}
                <Col sm={12} md={6} lg={4} xl={4}>
                  <Image
                    style={{ height: '500px', objectFit: 'cover' }}
                    src={`http://localhost:8000/${product.picture}`}
                    alt={product.name}
                    fluid
                  />
                </Col>

                {/* Text Column */}

                {/* Pehla Column */}
                <Col className=' px-0' md={3}>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h3>{product.title}</h3>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      {' '}
                      <strong>Price: </strong> ${product.price}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <strong className='d-block'>Description:</strong>{' '}
                      {product.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>

                {/* Dusra column */}
                <Col md={3}>
                  <Card>
                    {/* price and status */}
                    <ListGroup>
                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col>
                            <strong>${product.price}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Status:</Col>
                          <Col>
                            {product.countInStock > 0
                              ? 'In Stock'
                              : 'Out Of Stock'}
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      {/* Check product quantity first */}
                      {product.countInStock > 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col>Qty</Col>
                            <Col>
                              <Form.Control
                                as='select'
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
                              </Form.Control>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}

                      <ListGroup.Item>
                        <Button
                          className='my-2'
                          variant='info'
                          onClick={addToCartHandler}
                        >
                          Add to Cart
                        </Button>

                        <Link
                          className='btn btn-dark mx-1 my-2'
                          to={`/review/create/${product._id}`}
                        >
                          Review
                        </Link>
                      </ListGroup.Item>
                    </ListGroup>
                    {/*========price and status end====== */}
                  </Card>
                </Col>
              </Row>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProductScreen;
