import React, { useEffect, useState } from "react";
import { createReview, fetchReview } from "../../actions/reviewsActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Star } from "@material-ui/icons"
import { format } from "timeago.js";
import { Form, Row,Col, Button } from 'react-bootstrap';
import ReviewImage from '../../images/review.svg';


const CreateReview = () => {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const [rating, setRating] = useState(1);
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();

  const { id } = useParams();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const res = await dispatch(fetchReview(id));
    setReviews(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createReview({
        userId: userInfo.userId,
        itemId: id,
        rating,
        title,
        comment,
      })
    );

    window.location.href = `/review/create/${id}`;
  };

  return (
    <div className='col-10 mx-auto'>
      <Row className='align-items-center mx-auto pt-5'>
        <Col xl={4} lg={4} md={6} sm={12} className='mr-5 '>
          <h3 className='font-weight-bold mt-5'>
            Review this product
          </h3>
          <p className='text-muted font-weight-light'>
            {' '}
            - Share your thoughts with others{' '}
          </p>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group>
                  <h3>Title of your review</h3>
                  <Form.Control
                    type='text'
                    value={title}
                    placeholder="What's most important to know?"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <h3>Write details</h3>
                  <Form.Control
                    style={{ maxHeight: '100px', minHeight: '100px' }}
                    as='textarea'
                    type='text'
                    value={comment}
                    placeholder='What did you like or dislike? What did you use this product for?'
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group>
              <Form.Label className='d-block'>Rating</Form.Label>
              <select onChange={(e) => setRating(e.target.value)}
              className='p-2'
              >
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
            </Form.Group>
            <div>
              <Button variant='info' type='submit'>
                Submit
              </Button>
            </div>
          </Form>
        </Col>

        <Col>
          <Col xl={8} lg={12} md={12} sm={12} className=' ml-5'>
            <img
              className='w-100 ml-5 image-column'
              src={ReviewImage}
              alt='review img'
            />
          </Col>
        </Col>
      </Row>

      <div>
        {reviews.review &&
          reviews.review.map((item, index) => {
            return (
              <div className=' mt-5' key={index}>
                <Row className='border rounded p-3 mx-auto'>
                  <Col>
                    <h2 className='font-weight-bold'> {item.userId.name} </h2>
                    <h4 className='text-capitalize'>{item.title}</h4>
                    <p> {item.comment}</p>
                    <small className='font-weight-light'>
                      {' '}
                      {format(item.date)}{' '}
                    </small>
                  </Col>

                  <Col className='d-flex justify-content-end '>
                    {Array(item.rating).fill(
                      <Star style={{ color: '#FF9529' }} />
                    )}
                  </Col>
                </Row>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CreateReview;
