import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Pricing from './components/Pricing';
import About from './components/About';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import NoPageFound from './components/NoPageFound';
import Footer from './components/Footer/Footer';
import './App.css';

const App = () => {
  return (
    <Router >
      <Navbar />
      <div className='content'>
        <Switch className='container'>
          <Route exact path='/' component={Home} />
          <Route path='/pricing' component={Pricing} />
          <Route path='/about' component={About} />
          <Route path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route component={NoPageFound} />
        </Switch>
        
      </div>
      <Footer className='footer'/>
    </Router>
    
  );
};

export default App;
