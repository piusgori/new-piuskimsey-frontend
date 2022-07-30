import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import classes from './LoginForm.module.css';
import { Link } from 'react-router-dom'

const LoginForm = () => {

    const [emailInput, setEmailInput] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [emailError, setEmailError] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [passwordError, setPasswordError] = useState('');

    const buttonStyle = { width: '55%', alignSelf: 'center', marginTop: 10 }

  return (
    <div className={classes.container}>
        <h1 className={classes.title}>Login</h1>
        <div className={classes.formContainer}>
            <label className={emailIsValid ? classes.formLabel : classes.formLabelError}>Email Address</label>
            <input type='email' onChange={(event) => {setEmailInput(event.target.value)}} value={emailInput} className={ emailIsValid ? classes.formInput : classes.formInputError} placeholder='Enter your E-Mail Address'></input>
            {!emailIsValid && <p className={classes.errorMessage}>{emailError}</p>}
            <label className={passwordIsValid ? classes.formLabel : classes.formLabelError}>Password</label>
            <input type='password' onChange={(event) => {setPasswordInput(event.target.value)}} value={passwordInput} className={passwordIsValid ? classes.formInput : classes.formInputError} placeholder='Enter your Password'></input>
            {!passwordIsValid && <p className={classes.errorMessage}>{passwordError}</p>}
            <Link to='/forgot-password' className={classes.linkText}>Forgot Password?</Link>
            <Link to='/signup' className={classes.linkText}>Are You New?</Link>
            <Button style={buttonStyle}>Login</Button>
        </div>
    </div>
  )
}

export default LoginForm