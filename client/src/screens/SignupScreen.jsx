import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import '../styles/login.css'

function SigninScreen(props) {
    // set states for email and password 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // redirect user to shipping screen after sign in 
    //first check if there is redirect query param on the url
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    //get userInfo from redux store 
    const userRegister = useSelector(state => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();

    // handle login form submit 
    const submitHandler = (e) => {
        e.preventDefault();
        // check if password and confirm password match
        if(password !== confirmPassword) {
            alert('password and confirm password do not match');
        } else {
            // register action here
            dispatch(register(name, email, password)); 
        }
        
    };

    // if userInfo, redirect user on page load
    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
    }, [userInfo, redirect, props.history]);


    return (
        <div className='col-md-12'>
            <form className='card card-container' onSubmit={submitHandler}>
                <div>
                    <h1>Create An Account</h1>
                    {
                        loading && 
                        <LoadingBox />
                    }
                    {
                        error && 
                        <MessageBox variant="danger">{error}</MessageBox>
                    }
                </div>
                <div className='form-group'> 
                    <label htmlFor="name">Name: </label>
                    <input type="name" 
                        id="name" 
                        placeholder="Enter name" 
                        value={name}
                        required
                        onChange = {(e) => setName(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="email">Email: </label>
                    <input type="text" 
                        id="email" 
                        placeholder="Enter email" 
                        value={email}
                        required
                        onChange = {(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password: </label>
                    <input type="password" 
                        id="password" 
                        placeholder="Enter password" 
                        value={password}
                        required
                        onChange = {(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <input type="password" 
                        id="confirmPassword" 
                        placeholder="Confirm password" 
                        value={confirmPassword}
                        required
                        onChange = {(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div class='hide-md-lg'>
                    <p>Or sign up with:</p>
                </div>
                <div className='form-group'>
                    <a href='http://localhost:8000/passport/facebook' class='fb btn'>
                        <i class='fab fa-facebook fa-fw'></i> Sign up with Facebook
                    </a>
                    <a href='http://localhost:8000/passport/auth/google' class='google btn'>
                        <i class='fab fa-google fa-fw'></i> Sign up with Gmail
                    </a>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Sign up</button>
                </div>
                <div>
                    <label />
                    <div>
                      Already have an account?{ ' ' }<Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SigninScreen;
