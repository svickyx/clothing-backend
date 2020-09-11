import React, { useState } from 'react';
import { connect } from 'react-redux';

import '../sign-in/sign-in.scss';

import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';

import { googleSigninStart, emailSigninStart } from '../../redux/user/user-action';

const SignIn = ( {emailSigninStart, googleSigninStart} )=>  {
    // constructor(){
    //     super();

    //     this.state = {
    //         email: '',
    //         password: '',
    //     }
    // } 轉變成useState會變成下面的樣子
    const [userCredentials, setCredentials] = useState({email: '', password: ''})
    const {email, password} = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        emailSigninStart(email, password);      
    }

    const handleChange = event => {
        const {name, value} = event.target
        setCredentials({...userCredentials, [name]: value})
    }

    return(
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit ={handleSubmit}>
                <FormInput 
                name='email' 
                type='email' 
                value={email}
                required
                handleChange = {handleChange}
                label = 'email'
                />
                <FormInput
                name='password' 
                type='password'
                value={password}
                handleChange = {handleChange}
                label = 'password'
                />
                <div className='buttons'>
                <CustomButton type='submit'>Sign in</CustomButton>
                <CustomButton type='button' onClick = {googleSigninStart} isGoogleSignIn>
                    Sign in with Google
                </CustomButton>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    googleSigninStart: ()=> dispatch(googleSigninStart()),
    emailSigninStart: (email, password) => dispatch(emailSigninStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn);