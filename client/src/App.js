import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './screens/NavbarScreen';
import HomeScreen from './screens/HomeScreen';
import PricingScreen from './screens/PricingScreen';
import AboutScreen from './screens/AboutScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import Contact from './screens/Contact/Contact';
import Footer from './screens/Footer/Footer';


const App = () => {
  return (
    <Router >
      <Navbar />
      <div className='content'>
        <Switch className='container'>
          <Route exact path='/' component={HomeScreen} />
          <Route path='/PricingScreen' component={PricingScreen} />
          <Route path='/about' component={AboutScreen} />
          <Route path='/signin' component={SigninScreen} />
          <Route exact path='/signup' component={SignupScreen} />
          <Route path='/contact' component={Contact} />
        </Switch>
        
      </div>
      <Footer className='footer'/>
    </Router>
    
  );
};

export default App;
