import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import classes from './ForgotPasswordForm.module.css';

const ForgotPasswordForm = () => {

    const [emailInput, setEmailInput] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [emailError, setEmailError] = useState('');

    const buttonStyle = { width: '55%', alignSelf: 'center', marginTop: 10 }

  return (
    <div className={classes.container}>
        <h1 className={classes.title}>Forgot Password</h1>
        <div className={classes.formContainer}>
            <label className={emailIsValid ? classes.formLabel : classes.formLabelError}>Enter your registered E-Mail Address</label>
            <input type='email' onChange={(event) => {setEmailInput(event.target.value)}} value={emailInput} className={ emailIsValid ? classes.formInput : classes.formInputError} placeholder='Enter your E-Mail Address'></input>
            {!emailIsValid && <p className={classes.errorMessage}>{emailError}</p>}
            <Button style={buttonStyle}>Send me the link</Button>
        </div>
    </div>
  )
}

export default ForgotPasswordForm