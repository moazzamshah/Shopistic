
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCartItems, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";

function CartScreen(props) {
  // check if user has already signed in, if not, redirect user to signin
  const [cartItems, setCartItems] = useState([])
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  if (!userInfo) {
    props.history.push('/signin');
  }

  useEffect(() => {
    axios.get('http://localhost:8000/api/cart/getItems/'+ userInfo.userId)
    .then(res=> {
      setCartItems(res.data)
      console.log(res.data)
    })
  }, [])

  // const productId = props.match.params.id;
  ///cart/${productId}?qty={qty}
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const dispatch = useDispatch();
  //get cart and cartItem from redux store using useSelector
  /* const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems, "cart items")
  // on page load, check if productId, if so, dispatch addToCart action
  useEffect(() => {
    if (userInfo) {
      dispatch(fetchCartItems(userInfo.userId));
    }
  }, [dispatch]); */

  //delete cartItem action
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    window.location.href = '/cart'
  };

  //After checkout btn is clicked, go to signin page and then shipping page

  const checkoutHandler = (id) => {
    // props.history.push("/signin?redirect=shipping");
    window.location.href = '/order/'
  };

  return (
    <div className='col-10 mx-auto mt-3'>
    <Link to='/' className='btn btn-dark mb-5'> Add More </Link>
      <Row>
        <Col md={8}>
          <h2 className='font-weight-bold'>Shopping Cart </h2>
          {cartItems.length === 0 ? (
            <MessageBox>
              Your cart is empty <Link to='/'> Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.itemId.picture} alt={item.name} />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.itemId._id}`}>{item.itemId.title}</Link>
                    </Col>
                    <Col md={2}>${item.itemId.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={(e) =>
                          setCartItems(e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='info'
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <i className='fa fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card className='mt-5'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>
                Subtotal:
                {
                  cartItems.reduce((total, item)=>{
                    return total + item.itemId.price
                  }, 0)
                }
                {/*  ({cartItems.reduce((a, c) => a + c.qty, 0)} itmes) : ${" "}
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} */}
              </h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  onClick={checkoutHandler}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CartScreen;
