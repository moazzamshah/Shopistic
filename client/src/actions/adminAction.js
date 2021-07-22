import axios from 'axios';
import {
  ADMIN_ALL_ORDERS_REQUEST,
  ADMIN_ALL_ORDERS_SUCCESS,
  ADMIN_ALL_ORDERS_FAIL,
} from '../constants/userConstants';

// signin action
export const adminAllOrders = () => async (dispatch, getState) => {
  dispatch({ type: ADMIN_ALL_ORDERS_REQUEST, payload: {} });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    // use axios for http post request when user signing in
    const { data } = await axios.get(
      'http://localhost:8000/api/admin/orders',
      {},
      {
        headers: {
          Authorization: `${userInfo.token}`,
        },
      }
    );
    // if success, dispatch success and set payload to data
    dispatch({ type: ADMIN_ALL_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    // if error, dispatch FAIL, set payload to error message
    dispatch({
      type: ADMIN_ALL_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
