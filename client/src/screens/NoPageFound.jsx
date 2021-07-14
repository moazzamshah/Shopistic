import React from 'react'
import { Link } from 'react-router-dom';


const NoPageFound = () => {
  return (
    <div className='text-danger text-center' style = {{marginTop: '150px'}}>
      <h1>404 - Not Found!</h1>
      <Link to='/' className='btn btn-info mt-4'>Go Home</Link>
    </div>
  );
}

export default NoPageFound
