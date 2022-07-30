import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import classes from './PasswordResetForm.module.css';

const PasswordResetForm = () => {

    const [passwordInput, setPasswordInput] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [passwordError, setPasswordError] = useState('');

    const buttonStyle = { width: '55%', alignSelf: 'center', marginTop: 10 }

  return (
    <div className={classes.container}>
        <h1 className={classes.title}>Set New Password</h1>
        <div className={classes.formContainer}>
            <label className={passwordIsValid ? classes.formLabel : classes.formLabelError}>New Password</label>
            <input type='password' onChange={(event) => {setPasswordInput(event.target.value)}} value={passwordInput} className={passwordIsValid ? classes.formInput : classes.formInputError} placeholder='Enter your new password'></input>
            {!passwordIsValid && <p className={classes.errorMessage}>{passwordError}</p>}
            <Button style={buttonStyle}>Set Password</Button>
        </div>
    </div>
  )
}

export default PasswordResetForm