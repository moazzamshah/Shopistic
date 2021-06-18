import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import React from 'react'
import { Register } from './components/Register'
import  {Login}  from './components/Login'

export default function App() {
  return (
    <div className='App'>
    <h1 className='text-center'>Register Form</h1>
      <Register />

      <div className='container'>
        <h1 className='text-center'>Login Form</h1>
        <Login />
      </div>
      
    </div>
  )
}