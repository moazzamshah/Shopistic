import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Rating from '../Rating';
import { detailsProduct } from '../../actions/productActions';
import { Card } from 'react-bootstrap';

function Product(props) {
  let { product } = props;
  console.log(product)


    // const dispatch = useDispatch()
    /* product = dispatch(detailsProduct()) */

    // const productDetails = useSelector(state => state.productDetails);
    /* product = productDetails.product */
    /* console.log(productDetails, "product details")


    const test = (productID) =>{
        dispatch(detailsProduct(productID));
        // useHistory.push(`/${product._id}`)
    } */


    return (
      <Card className='my-3 p-3 rounded shadow'>
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.picture} alt='product' />
        </Link>


        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title>{product.title}</Card.Title>
          </Link>
          <Card.Text>{product.description}</Card.Text>
          {/* Rating component */}
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <Card.Title className='price'>${product.price}</Card.Title>
        </Card.Body>

        {/* <button type="submit" onClick={()=> test(product._id)} >product info</button> */}
      </Card>
    );
}

export default Product;
