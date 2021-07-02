import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import '../styles/login.css'

function SigninScreen(props) {
    // set states for email and password 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // redirect user to shipping screen after sign in 
    //first check if there is redirect query param on the url
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    //get userInfo from redux store 
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const dispatch = useDispatch();

    // handle login form submit 
    const submitHandler = (e) => {
        e.preventDefault();
        // signin action here
        dispatch(signin(email, password));
    };

    // if userInfo, redirect user on page load
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [userInfo, redirect, props.history]);


    return (
        <div className='col-md-12'>
            <form className='card card-container' onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
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
                    <label htmlFor="email">Email: </label>
                    <input type="text"
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password: </label>
                    <input type="password"
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div class='hide-md-lg'>
                    <p>Or sign in with:</p>
                </div>
                <div className='form-group'>
                    <a href='http://localhost:8000/passport/facebook' class='fb btn'>
                        <i class='fa fa-facebook fa-fw'></i> Login with Facebook
                    </a>
                    <a href='http://localhost:8000/passport/auth/google' class='google btn'>
                        <i class='fab fa-google fa-fw'></i> Login with Gmail
                    </a>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Sign In</button>
                </div>
                <div>
                    <label />
                    <div>
                        New customer?{' '}<Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SigninScreen;
