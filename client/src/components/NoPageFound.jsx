import React from 'react'
import { Link } from 'react-router-dom';


const NoPageFound = () => {
  return (
    <div className='text-danger text-center mt-5'>
      <h1>404 - Not Found!</h1>
      <Link to='/' className='btn btn-dark'>Go Home</Link>
    </div>
  );
}

export default NoPageFound
