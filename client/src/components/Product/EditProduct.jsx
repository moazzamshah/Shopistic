import axios from 'axios';
import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { editItem } from '../../actions/productActions'

const EditProduct = () => {

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [category, setCategory] = useState("")
  const [countInStock, setCountInStock] = useState(0)
  const {id} = useParams()
 
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  console.log(userInfo, "this is the user info")
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault()
      dispatch(editItem({ seller: userInfo.userId, title, price, description, picture, category, countInStock},id))
      window.location.href = "/myproducts";
  };


useEffect(() => {
axios.get(`http://localhost:8000/api/items/${id}`).then(res => {
    setTitle(res.data.title);
    setPrice(res.data.price);
    setDescription(res.data.description);
    setPicture(res.data.picture);
    setCategory(res.data.category);
    setCountInStock(res.data.countInStock)
})
}, [])
  return (
    <div>
      <div>
        <h1> Update your product</h1>
        <div>
          <form
            onSubmit={submitHandler}
          >
            <div >
              <label>Product Title </label>
              <input
                type="text"
                value={title}
                onChange={e =>setTitle(e.target.value)}
                
              />
            </div>
            <div>
              <label>Price: €</label>
              
              <input
                type="number"
                value={price}
                onChange={e =>setPrice(e.target.value)}
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                value={description}
                onChange={e =>setDescription(e.target.value)}
              />
            </div>
            <div>
              <label>picture </label>
              <input
                type="text"
                value={picture}
                onChange={e =>setPicture(e.target.value)}
              />
            </div>
            <label>Count in stock: </label>
            <input
                type="number"
                value={countInStock}
                onChange={e =>setCountInStock(e.target.value)}
              />
            <div>
              <label>Category </label>
              <select
                name="Category"
                value={category}
                onChange={e =>setCategory(e.target.value)}
              >
                <option value="clothing">
                  Clothing
                </option>
                <option value="tech">
                  Tech
                </option>
                <option value="sport">
                  Sport
                </option>
                <option value="pets">
                  Pets
                </option>
                <option value="food">
                  Food
                </option>
                <option value="toys">
                  Toys
                </option>
                <option value="accessories">
                  Accessories
                </option>
              </select>
            </div>
            <div>
              <input
                type="submit"
                value="Submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProduct
