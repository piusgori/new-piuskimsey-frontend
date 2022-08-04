import React, { useContext, useState } from 'react';
import { useJwt } from 'react-jwt';
import { useParams } from 'react-router-dom';
import ActivityIndicator from '../../../components/ui/ActivityIndicator';
import Button from '../../../components/ui/Button';
import { AppContext } from '../../../services/app-context';
import classes from './PasswordResetForm.module.css';

const PasswordResetForm = () => {

    const [passwordInput, setPasswordInput] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [passwordError, setPasswordError] = useState('');
    const { token } = useParams();
    const { decodedToken, isExpired } = useJwt(token);
    const { isLoading, setModalAnimation, setNewPassword, setIsModalVisible, setModalButtonText, setModalRoute, setModalTitle, setModalText } = useContext(AppContext);

    const buttonStyle = { width: '55%', alignSelf: 'center', marginTop: 10 }

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

    const setNewPasswordHandler = async () => {
      checkPasswordIsValid();
      if(!passwordIsValid){
        return;
      }
      try {
        const data = await setNewPassword(decodedToken.id, passwordInput);
        if(data.content) {
          for (const i of data.content){
            if(i.type === 'user'){
              setModalTitle('Person not found');
              setModalAnimation(2);
              setModalText('We have not found the user or admin whose email you gave us!');
              setModalButtonText('Okay');
              setModalRoute(null);
              setIsModalVisible(true);
            } else if(i.type === 'password'){
              setPasswordIsValid(false);
              setPasswordError(i.message)
            }
          }
          return;
        }
        setModalTitle('Password Reset');
        setModalText('Your Password has been reset successfully');
        setModalAnimation(1);
        setModalButtonText('Okay');
        setModalRoute('/login');
        setIsModalVisible(true);
      } catch (err) {
        setModalTitle('We Are Sorry');
        setModalText('An Unexpected Error has Occured. Sorry about that');
        setModalAnimation(3);
        setModalButtonText('Okay');
        setModalRoute(null);
        setIsModalVisible(true);
      }
    }

    if(!token || !decodedToken || isExpired){
      return (
        <div className={classes.loggedContainer}>
          <h1 className={classes.title}>Reset Link Not Valid</h1>
          <p className={classes.formLabel}>The URL Link that has led you to this page is not valid</p>
        </div>
      )
    }

  return (
    <div className={classes.container}>
        <h1 className={classes.title}>Set New Password</h1>
        <div className={classes.formContainer}>
            <label className={passwordIsValid ? classes.formLabel : classes.formLabelError}>New Password</label>
            <input type='password' onChange={(event) => {setPasswordInput(event.target.value)}} value={passwordInput} className={passwordIsValid ? classes.formInput : classes.formInputError} placeholder='Enter your new password'></input>
            {!passwordIsValid && <p className={classes.errorMessage}>{passwordError}</p>}
            {!isLoading && <Button onClick={setNewPasswordHandler} style={buttonStyle}>Set Password</Button>}
            {isLoading && <ActivityIndicator></ActivityIndicator>}
        </div>
    </div>
  )
}

export default PasswordResetForm