import { RECEIVE_ALL_REVIEWS, RECEIVE_REVIEW, CREATE_REVIEW, REMOVE_REVIEW } from '../constants/reviewConstants'
import axios from 'axios'

export const receiveAllReviews = reviews => {
  return {
    type: RECEIVE_ALL_REVIEWS,
    reviews
  }
}

export const receiveReview = review => {
  return {
    type: RECEIVE_REVIEW,
    review
  }
}

export const removeReview = reviewId => {
  return {
    type: REMOVE_REVIEW,
    reviewId
  }
}

export const fetchReviews = () => dispatch => (
  axios.get(`http://localhost:8000/api/review`)
    .then((reviews) => dispatch({ type: RECEIVE_ALL_REVIEWS, reviews }))
);

export const fetchReview = (id) => dispatch => (
  axios.get(`http://localhost:8000/api/review/${id}`)
    .then((review) => dispatch(receiveReview(review.data)))
);

export const createReview = (data) => (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState()
  axios.post(`http://localhost:8000/api/review`, data, {
    headers: {
      Authorization: `${userInfo?.token}`
    }
  })
    .then((review) => dispatch({ type: CREATE_REVIEW, review }))
};

export const updateReview = (review, id) => (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState()
  axios.patch(`http://localhost:8000/api/review/${id}`, review, {
    headers: {
      Authorization: `${userInfo?.token}`
    }
  }).then(review => dispatch(receiveReview(review)))
};

export const deleteReview = (id) => (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState()
  axios.delete(`http://localhost:8000/api/review/${id}`).then((review) => dispatch({ type: REMOVE_REVIEW, reviewId: review.id }))
};