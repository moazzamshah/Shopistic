import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './screens/Navbar/Navbar';
import HomeScreen from './screens/Home/Home';
import PricingScreen from './screens/PricingScreen';
import AboutScreen from './screens/AboutScreen';
import SigninScreen from './screens/SignIn/SignIn';
import SignupScreen from './screens/SignUp/Signup';
import Contact from './screens/Contact/Contact';
import Footer from './screens/Footer/Footer';
import ResetPassword from './components/auth/ResetPassword';
import NoPageFound from './screens/NoPageFound';
import ForgotPassword from './components/auth/ForgotPassword'
import ProfileScreen from './screens/ProfileScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
// import Product from './components/Product/Product'
import Cart from './screens/CartScreen'



const App = () => {
  return (
    <Router>
      <Navbar />
      <div className='content'>
        <Switch>
          <Route exact path='/' component={HomeScreen} />
          <Route path='/pricing' component={PricingScreen} />
          <Route path='/about' component={AboutScreen} />
          <Route path='/signin' component={SigninScreen} />
          <Route exact path='/signup' component={SignupScreen} />
          <Route path='/contact' component={Contact} />
          <Route path='/resetpassword/:token' component={ResetPassword} />
          <Route path='/forgetpassword' component={ForgotPassword} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/order' component={PlaceOrderScreen} />
          {/* <Route path='/product/:id' component={Product} /> */}
          <Route path='/cart' component={Cart} />
          <Route component={NoPageFound} />
        </Switch>
      </div>
      <Footer className='footer' />
    </Router>
  );
};

export default App;
