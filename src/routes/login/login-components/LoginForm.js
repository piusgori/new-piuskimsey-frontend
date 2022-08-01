import React, { useContext, useState } from 'react';
import Button from '../../../components/ui/Button';
import classes from './LoginForm.module.css';
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../../services/app-context';
import ActivityIndicator from '../../../components/ui/ActivityIndicator';
import { User } from '../../../models/user';

const LoginForm = () => {

    const [emailInput, setEmailInput] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [emailError, setEmailError] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const { isLoading, login, person, setPerson, setModalTitle, setModalText, setModalButtonText, setModalRoute, setIsModalVisible } = useContext(AppContext)
    const buttonStyle = { width: '55%', alignSelf: 'center', marginTop: 10 }

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
      if(passwordInput.length === 0){
        setPasswordIsValid(false);
        setPasswordError('Please enter your password');
      } else if(passwordInput.length > 0){
        setPasswordIsValid(true);
        setPasswordError(null);
      }
    }

    const loginHandler = async () => {
      checkEmailIsValid();
      checkPasswordIsValid();
      if(!emailIsValid || !passwordIsValid){
        return;
      }
      try {
        const data = await login(emailInput, passwordInput);
        if(data.content) {
          for (const i of data.content){
            if(i.type === 'email'){
              setEmailIsValid(false);
              setEmailError(i.message)
            } else if(i.type === 'password'){
              setPasswordIsValid(false);
              setPasswordError(i.message)
            }
          }
          return;
        }
        const sessionExpiry = new Date().getTime() + 3600000;
        const loggedUser = new User(data.id, data.name, data.email, data.phoneNumber, data.region, data.products, data.cart, data.orders, data.token, data.isAdmin, sessionExpiry)
        setPerson(loggedUser);
        localStorage.setItem('person', JSON.stringify(loggedUser));
        setModalTitle('Welcome Again');
        setModalText('We welcome you back to PiusKimsey');
        setModalButtonText('Proceed');
        setModalRoute('/');
        setIsModalVisible(true);
      } catch (err) {
        setModalTitle('We Are Sorry');
        setModalText('An Unexpected Error has Occured. Sorry about that');
        setModalButtonText('Okay');
        setModalRoute(null);
        setIsModalVisible(true);
      }
    }

    if(person && emailInput.length === 0){
      return (
        <div className={classes.loggedContainer}>
          <h1 className={classes.title}>Login</h1>
          <h1 className={classes.formLabel}>You are already logged in</h1>
          <Button onClick={() => {navigate('/')}}>Go Home</Button>
        </div>
      )
    }

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
            {!isLoading && <Button onClick={loginHandler} style={buttonStyle}>Login</Button>}
            {isLoading && <ActivityIndicator></ActivityIndicator>}
        </div>
    </div>
  )
}

export default LoginForm