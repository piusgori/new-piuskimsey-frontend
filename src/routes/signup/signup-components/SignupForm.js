import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import classes from './SignupForm.module.css';
import { Link } from 'react-router-dom';

const SignupForm = () => {

    const [nameInput, setNameInput] = useState('');
    const [nameIsValid, setNameIsValid] = useState(true);
    const [nameError, setNameError] = useState('');
    const [phoneNumberInput, setPhoneNumberInput] = useState('');
    const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(true);
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [regionInput, setRegionInput] = useState('Nairobi');
    const [regionIsValid, setRegionIsValid] = useState(true);
    const [regionError, setRegionError] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [emailError, setEmailError] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [passwordError, setPasswordError] = useState('');

    const buttonStyle = { width: '55%', alignSelf: 'center', marginTop: 10 }

  return (
    <div className={classes.container}>
        <h1 className={classes.title}>Create Account With Us</h1>
        <div className={classes.formContainer}>
            <label className={nameIsValid ? classes.formLabel : classes.formLabelError}>Your Name</label>
            <input type='text' onChange={(event) => {setNameInput(event.target.value)}} value={nameInput} className={ nameIsValid ? classes.formInput : classes.formInputError} placeholder='Enter your name'></input>
            {!nameIsValid && <p className={classes.errorMessage}>{nameError}</p>}
            <label className={phoneNumberIsValid ? classes.formLabel : classes.formLabelError}>Your Phone Number</label>
            <input type='number' onChange={(event) => {setPhoneNumberInput(event.target.value)}} value={phoneNumberInput} className={ phoneNumberIsValid ? classes.formInput : classes.formInputError} placeholder='Enter your Phone Number'></input>
            {!phoneNumberIsValid && <p className={classes.errorMessage}>{phoneNumberError}</p>}
            <label className={regionIsValid ? classes.formLabel : classes.formLabelError}>Select Your Region</label>
            <select onChange={(event) => {setRegionInput(event.target.value)}} value={regionInput} className={ regionIsValid ? classes.formInput : classes.formInputError} placeholder='Select your region'>
                <option>Nairobi</option>
                <option>Kiambu</option>
                <option>Rongai</option>
            </select>
            {!regionIsValid && <p className={classes.errorMessage}>{regionError}</p>}
            <label className={emailIsValid ? classes.formLabel : classes.formLabelError}>Email Address</label>
            <input type='email' onChange={(event) => {setEmailInput(event.target.value)}} value={emailInput} className={ emailIsValid ? classes.formInput : classes.formInputError} placeholder='Enter your E-Mail Address'></input>
            {!emailIsValid && <p className={classes.errorMessage}>{emailError}</p>}
            <label className={passwordIsValid ? classes.formLabel : classes.formLabelError}>Password</label>
            <input type='password' onChange={(event) => {setPasswordInput(event.target.value)}} value={passwordInput} className={passwordIsValid ? classes.formInput : classes.formInputError} placeholder='Enter your Password'></input>
            {!passwordIsValid && <p className={classes.errorMessage}>{passwordError}</p>}
            <Link to='/login' className={classes.linkText}>Already have an account?</Link>
            <Button style={buttonStyle}>Create Account</Button>
        </div>
    </div>
  )
}

export default SignupForm