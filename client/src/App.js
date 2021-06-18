<<<<<<< HEAD
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
=======
import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Pricing from './components/Pricing';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import NoPageFound from './components/NoPageFound';
const App = () => {
  return (
    <Router>
      <Navbar />
      <div className='container mt-3'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/pricing' component={Pricing} />
          <Route path='/about' component={About} />
          <Route path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route component={NoPageFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
>>>>>>> origin/syed
