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
