import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActivityIndicator from '../../../components/ui/ActivityIndicator';
import Button from '../../../components/ui/Button';
import { AppContext } from '../../../services/app-context';
import classes from './ForgotPasswordForm.module.css';

const ForgotPasswordForm = () => {

    const [emailInput, setEmailInput] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [emailError, setEmailError] = useState('');

    const buttonStyle = { width: '55%', alignSelf: 'center', marginTop: 10 };
    const navigate = useNavigate();
    const { isLoading, setModalAnimation, person, forgotPassword, setModalTitle, setIsModalVisible, setModalButtonText, setModalRoute, setModalText } = useContext(AppContext); 

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

    const requestHandler = async () => {
      checkEmailIsValid();
      if(!emailIsValid){
        return;
      }
      try {
        const data = await forgotPassword(emailInput);
        if(data.content) {
          for (const i of data.content){
            if(i.type === 'email'){
              setEmailIsValid(false);
              setEmailError(i.message)
            }
          }
          return;
        }
        setModalTitle('Reset Link Sent');
        setModalAnimation(1);
        setModalText('We have sent you the pasword reset link. Please check your E-Mail for the link.');
        setModalButtonText('Okay');
        setModalRoute(null);
        setIsModalVisible(true);
      } catch (err) {
        setModalTitle('We Are Sorry');
        setModalAnimation(3);
        setModalText('An Unexpected Error has Occured. Sorry about that');
        setModalButtonText('Okay');
        setModalRoute(null);
        setIsModalVisible(true);
      }
    }

    if(person && emailInput.length === 0){
      return (
        <div className={classes.loggedContainer}>
          <h1 className={classes.title}>Already Logged In</h1>
          <p className={classes.formLabel}>You are already logged in. Please logout first to reset your password</p>
          <Button onClick={() => {navigate('/')}}>Go Home</Button>
        </div>
      )
    }

  return (
    <div className={classes.container}>
        <h1 className={classes.title}>Forgot Password</h1>
        <div className={classes.formContainer}>
            <label className={emailIsValid ? classes.formLabel : classes.formLabelError}>Enter your registered E-Mail Address</label>
            <input type='email' onChange={(event) => {setEmailInput(event.target.value)}} value={emailInput} className={ emailIsValid ? classes.formInput : classes.formInputError} placeholder='Enter your E-Mail Address'></input>
            {!emailIsValid && <p className={classes.errorMessage}>{emailError}</p>}
            {!isLoading && <Button onClick={requestHandler} style={buttonStyle}>Send me the link</Button>}
            {isLoading && <ActivityIndicator></ActivityIndicator>}
        </div>
    </div>
  )
}

export default ForgotPasswordForm