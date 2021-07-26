import React, { useEffect, useState } from "react";
import { createReview, fetchReview } from "../../actions/reviewsActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Star } from "@material-ui/icons"
import { format } from "timeago.js";

const CreateReview = () => {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();

  const { id } = useParams();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

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
    <div className="col-10 mx-auto">
      <h3>Review this product</h3>
      <p>Share your thoughts with other customers</p>
      <form onSubmit={handleSubmit}>
        <div>
          {/* <Rating /> */}
          <label>Rating</label>
          <select onChange={(e) => setRating(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <h3>Add a headline</h3>
        <input
          type="text"
          value={title}
          placeholder="What's most important to know?"
          onChange={(e) => setTitle(e.target.value)}
        />

        <h3>Write your review</h3>
        <textarea
          type="text"
          value={comment}
          placeholder="What did you like or dislike? What did you use this product for?"
          onChange={(e) => setComment(e.target.value)}
        />

        <div>
          <button>
            <input type="submit" value="Submit" />
          </button>
        </div>
      </form>
      <div>
        {reviews.review &&
          reviews.review.map((item, index) => {
            return (
              <div key={index}>
                <h2>{item.userId.name}</h2>
                <p> {Array(item.rating).fill(<Star style={{color:'#FF9529'}} />)}</p>
                <h3>{item.title}</h3>
                <h5>{item.comment}</h5>
                <p> {format(item.date)} </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CreateReview;
