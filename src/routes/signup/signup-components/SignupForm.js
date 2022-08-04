import React, { useContext, useState } from 'react';
import Button from '../../../components/ui/Button';
import classes from './SignupForm.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../services/app-context';
import ActivityIndicator from '../../../components/ui/ActivityIndicator';
import { User } from '../../../models/user';

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

    const { regions, setModalAnimation, setModalRoute, person, setPerson, isLoading, signup, setModalTitle, setModalText, setModalButtonText, setIsModalVisible } = useContext(AppContext);
    const navigate = useNavigate();

    const buttonStyle = { width: '55%', alignSelf: 'center', marginTop: 10 };

    const checkNameIsValid = () => {
      if(nameInput.length < 3){
        setNameIsValid(false);
        setNameError('Please enter a name of at least 3 character');
      } else if(nameInput.length >= 3){
        setNameIsValid(true);
        setNameError(null);
      }
    }

    const checkPhoneNumberIsValid = () => {
      if(phoneNumberInput.length !== 10){
        setPhoneNumberIsValid(false);
        setPhoneNumberError('Please enter a valid phone number (e.g 0712345678)')
      } else if (phoneNumberInput.length === 10){
        setPhoneNumberIsValid(true);
        setPhoneNumberError(null);
      }
    }

    const checkRegionIsValid = () => {
      if(regionInput.length < 1){
        setRegionIsValid(false);
        setRegionError('Please select a region');
      } else if(regionInput.length >= 1){
        setRegionIsValid(true);
        setRegionError(null);
      }
    }

    const checkEmailIsValid = () => {
      //eslint-disable-next-line
      const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      const result = emailInput.match(pattern);
      if(!result){
        setEmailIsValid(false);
        setEmailError('Please enter a valid E-Mail address');
      } else if(result) {
        setEmailIsValid(true);
        setEmailError(null);
      }
    }

    const checkPasswordIsValid = () => {
      const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      const result = passwordInput.match(pattern);
      if(!result){
        setPasswordIsValid(false);
        setPasswordError('Please Enter a strong password of at least 8 characters that includes alphabets, numbers and characters!');
      } else if(result){
        setPasswordIsValid(true);
        setPasswordError(null);
      }
    }

    const signupHandler = async () => {
      checkNameIsValid();
      checkEmailIsValid();
      checkPasswordIsValid();
      checkPhoneNumberIsValid();
      checkRegionIsValid();
      if(!nameIsValid || !phoneNumberIsValid || !regionIsValid || !emailIsValid || !passwordIsValid){
        return;
      }
      try {
        const data = await signup(nameInput, emailInput, passwordInput, phoneNumberInput, regionInput);
        if(data.content) {
          for (const i of data.content){
            if(i.type === 'name'){
              setNameIsValid(false);
              setNameError(i.message)
            } else if(i.type === 'email'){
              setEmailIsValid(false);
              setEmailError(i.message)
            } else if(i.type === 'password'){
              setPasswordIsValid(false);
              setPasswordError(i.message)
            } else if(i.type === 'phoneNumber'){
              setPhoneNumberIsValid(false);
              setPhoneNumberError(i.message)
            }
            else if(i.type === 'region'){
              setRegionIsValid(false);
              setRegionError(i.message)
            }
          }
          return;
        }
        const sessionExpiry = new Date().getTime() + 3600000;
        const createdUser = new User(data.id, data.name, data.email, data.phoneNumber, data.region, null, data.cart, data.orders, data.token, data.isAdmin, sessionExpiry);
        setPerson(createdUser);
        localStorage.setItem('person', JSON.stringify(createdUser));
        setModalTitle('Welcome');
        setModalText('Welcome to Piuskimsey');
        setModalAnimation(0);
        setModalButtonText('Proceed');
        setModalRoute('/')
        setIsModalVisible(true);
      } catch (err) {
        setModalTitle('We Are Sorry');
        setModalText('An Unexpected Error Has Occurred!');
        setModalAnimation(3);
        setModalButtonText('Okay');
        setModalRoute(null);
        setIsModalVisible(true);
      } 
    }
    
    if (person && emailInput.length === 0){
      return (
        <div className={classes.loggedContainer}>
          <h1 className={classes.title}>Sign Up</h1>
          <p className={classes.formLabel}>You are already logged in</p>
          <Button onClick={() => {navigate('/')}}>Go Home</Button>
        </div>
      )
    }

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
                {regions.map((reg) => <option key={reg.id}>{reg.title}</option>)}
            </select>
            {!regionIsValid && <p className={classes.errorMessage}>{regionError}</p>}
            <label className={emailIsValid ? classes.formLabel : classes.formLabelError}>Email Address</label>
            <input type='email' onChange={(event) => {setEmailInput(event.target.value)}} value={emailInput} className={ emailIsValid ? classes.formInput : classes.formInputError} placeholder='Enter your E-Mail Address'></input>
            {!emailIsValid && <p className={classes.errorMessage}>{emailError}</p>}
            <label className={passwordIsValid ? classes.formLabel : classes.formLabelError}>Password</label>
            <input type='password' onChange={(event) => {setPasswordInput(event.target.value)}} value={passwordInput} className={passwordIsValid ? classes.formInput : classes.formInputError} placeholder='Enter your Password'></input>
            {!passwordIsValid && <p className={classes.errorMessage}>{passwordError}</p>}
            <Link to='/login' className={classes.linkText}>Already have an account?</Link>
            <Link to='/add-region' className={classes.linkText}>Is your region not listed?</Link>
            {!isLoading && <Button onClick={signupHandler} style={buttonStyle}>Create Account</Button>}
            {isLoading && <ActivityIndicator></ActivityIndicator>}
        </div>
    </div>
  )
}

export default SignupForm