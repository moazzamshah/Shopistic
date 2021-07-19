import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Rating from '../Rating';
import { detailsProduct } from '../../actions/productActions';

function Product (props) {
    let { product} = props;


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
        <div className='card'>
            <Link to={`/product/${product._id}`}>
                <img className='medium' src={product.image} alt='product' />
            </Link>
            <div className='card-body'>
                <Link to={`/product/${product._id}`}>
                    <h2>{product.title}</h2>
                </Link>
                <div>
                    {product.description}
                </div>
                {/* Rating component */}
                <Rating rating={product.rating} numReviews={product.numReviews} />
                <div className='price'>${product.price}</div>
            </div>
            {/* <button type="submit" onClick={()=> test(product._id)} >product info</button> */}
        </div>
    );
}

export default Product;
