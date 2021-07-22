import React, { useState } from 'react'
import {createReview} from '../../actions/reviewsActions'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const CreateReview = () => {
    const [title, setTitle] = useState("")
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(0)
    const dispatch = useDispatch();
    // const [data, setData] = useState({
    //     title: "", comment: "", rating: 0,
    // })
    const {id} = useParams()
    const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
   /* const update = (field) => {
        return (e) => setData({[field]: e.target.value})
    } */
    const handleSubmit= (e) => {
        e.preventDefault();

        /* const review = Object.assign({}, {
            rating: data.rating,
            title: data.title, 
            comment: data.comment,
            userId: localStorage.getItem('userInfo?.token'),
            itemId: '60d58761f15eecae04758f8a',
            
        }); */
        dispatch(createReview({
            userId: userInfo.userId,
            itemId: id,
            rating,
            title,
            comment

        }))
        
        console.log('sucessfully submited')
        
    }
    return (
        <div>
            <h3>Review this product</h3>
                <p>Share your thoughts with other customers</p>
                <form onSubmit={handleSubmit}>

                    <div>
                        {/* <Rating /> */}
                        <label>Rating</label>
                  <select onChange={e => setRating(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                    </div>

                    <h3>Add a headline</h3>
                    <input type="text" value={title} 
                    placeholder="What's most important to know?" onChange={e => setTitle(e.target.value)} />

                    <h3>Write your review</h3>
                    <textarea type="text" value={comment} 
                    placeholder="What did you like or dislike? What did you use this product for?" 
                    onChange={e => setComment(e.target.value)} />

                    <div>
                        <button >
                            <input type="submit" value="Submit" />
                        </button>
                    </div>
                </form>
                
        </div>
    )
}

export default CreateReview
