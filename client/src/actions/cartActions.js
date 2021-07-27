import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants';

export const RECEIVE_CART_ITEMS = "RECEIVE_CART_ITEMS";

const receiveCartItems = (cartItems) => ({
	type: RECEIVE_CART_ITEMS,
	cartItems
});

export const fetchCartItems = (userId) => (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState()
    axios.get('http://localhost:8000/api/cart', {userId}, {
        headers: {
          Authorization: `${userInfo?.token}`
        }
      })
    .then(cartItems => dispatch(receiveCartItems(cartItems)))
}
// when we define an action function, it should return an async function with dispatch
// disptach and getState are redux-thunk functions to get access to redux store
export const addToCart = (productId, userId, qty) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState()
    // data (product) is deconstructed from axios return data
    const { data } = await axios.post(`http://localhost:8000/api/cart`, {productId, userId, qty},{
        headers: {
          Authorization: `${userInfo?.token}`
        }
      });
      console.log(data, "data")
    //using product data to dispatch
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            productId,
            userId,
            qty
        }
    });

};

//remove item from cart action
export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// saveShipping address
export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
    //save shipping address to localStorage
    localStorage.setItem('shippingAddress', JSON.stringify(data));
};


// savePaymentMethod action
export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};
