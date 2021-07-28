import axios from "axios";
import React, { useEffect, useState } from "react";
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
    props.history.push("/signin");
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
    ? Number(props.location.search.split("=")[1])
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
    <div>
      <div>
        <h1>Shopping Cart </h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/"> Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item,index) => (
              <li key={index}>
                <div>
                  <div>
                    <img src={item.itemId.picture} alt={item.name} />
                  </div>
                  <div>
                    <Link to={`/product/${item.itemId._id}`}>{item.itemId.title}</Link>
                  </div>
                  <div>
                    <select
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
                    </select>
                  </div>
                  <div>${item.itemId.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <div>
          <ul>
            <li>
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
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
