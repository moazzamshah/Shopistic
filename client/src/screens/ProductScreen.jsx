import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { detailsProduct } from "../actions/productActions";
// import data from '../data/products';

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
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger"> {error} </MessageBox>
      ) : (
        <div>
          {/* back to result link  */}
          <Link to="/"> Back To Result</Link>

          <div >
            {/* product image */}
            <div >
              <img src={product.picture} alt={product.name} />
            </div>

            {/* description */}
            <div >
              <ul>
                <li>
                  <h1>{product.title}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </li>
                <li>Price: ${product.price}</li>
                <li>
                  Description:
                  <p>{product.description} </p>
                </li>
              </ul>
            </div>

            {/* action */}
            <div >
              <div >
                <ul>
                  <li>
                    <div>
                      <div>Price </div>
                      <div >${product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div >
                      <div>Status </div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span > In Stock</span>
                        ) : (
                          <span variant="danger"> Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {/* Check product quantity first */}
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div >
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock)].map((x, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                      
                          onClick={addToCartHandler}
                        >
                          Add to Cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
