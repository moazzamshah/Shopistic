import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { detailsProduct } from '../actions/productActions';
// import data from '../data/products';
import { Row, Container, Col, Card, Button } from 'react-bootstrap';

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
      <Row className='col-10 mx-auto mt-5'>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant='danger'> {error} </MessageBox>
        ) : (
          <Col lg={6} xl={4} sm={12} xs={12}>
            {/* back to result link*/}
            <Link className='btn btn-info my-3' to='/'>
              {' '}
              <i class='fa fa-arrow-left'></i> Go back
            </Link>
            <Card className='shadow p-3'>
              {/* product image */}

              <Card.Img src={product.picture} alt={product.name} />

              {/* description */}
              <div>
                <ul>
                  <li>
                    <Card.Title className='text-capitalize'>
                      <b>{product.title}</b>
                    </Card.Title>
                  </li>
                  <li>
                    <Rating
                      rating={product.rating}
                      numReviews={product.numReviews}
                    />
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

              {/* action */}
              <div>
                <div>
                  <ul>
                    <li>
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
                      </div>
                    </li>
                    {/* Check product quantity first */}
                    {product.countInStock > 0 && (
                      <>
                        <li>
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
                        </li>
                        <li>
                          <Button variant='dark' onClick={addToCartHandler}>
                            Add to Cart
                          </Button>
                        </li>
                        <a href={`/review/create/${product._id}`}>review</a>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
}

export default ProductScreen;
