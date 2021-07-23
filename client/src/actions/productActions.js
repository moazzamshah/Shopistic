import axios from 'axios';
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL, RECEIVE_PRODUCT, CREATE_PRODUCT, REMOVE_PRODUCT
} from '../constants/productConstants';


export const listProducts = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });

    try {
        const { data } = await axios.get('http://localhost:8000/api/items');
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: err.message });
    }
};

export const detailsProduct = (productId) => async (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });

    try {
        const { data } = await axios.get(`http://localhost:8000/api/items/${productId}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};


export const receiveItem = item => {
    return {
        type: RECEIVE_PRODUCT,
        item
    }
}

export const createItem = (data) => (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState()
    axios.post(`http://localhost:8000/api/items/create`, data, {
        headers: {
            Authorization: `${userInfo?.token}`
        }
    })
        .then((item) => dispatch(receiveItem(item.data)))
};

export const editItem = (item, id) => (dispatch, getState) => (
    axios.patch(`http://localhost:8000/api/items/${id}`, item)
        .then(item => dispatch(receiveItem(item.data)))
)

export const removeItem = (id) => (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState();
    axios.delete(`http://localhost:8000/api/items/${id}`, {
        headers: {
            Authorization: `${userInfo?.token}`
        }
    })
        .then((item) => dispatch({ type: REMOVE_PRODUCT, itemId: item.id }))
};