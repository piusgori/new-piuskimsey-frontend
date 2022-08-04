import React, { useContext, useState } from 'react';
import ActivityIndicator from '../../../components/ui/ActivityIndicator';
import Button from '../../../components/ui/Button';
import { AppContext } from '../../../services/app-context';
import classes from './AddRegionForm.module.css';

const AddRegionForm = () => {

    const [titleInput, setTitleInput] = useState('');
    const [titleIsValid, setTitleIsValid] = useState(true);
    const [titleError, setTitleError] = useState('');

    const buttonStyle = { width: '55%', alignSelf: 'center', marginTop: 10 };
    const { isLoading, setModalAnimation, requestRegion, setModalTitle, setModalText, setModalButtonText, setModalRoute, setIsModalVisible } = useContext(AppContext);

    const checkTitleIsValid = () => {
      if(titleInput.length < 3){
        setTitleIsValid(false);
        setTitleError('Please enter a valid title for a region of at least three characters');
      } else if (titleInput.length >= 3){
        setTitleIsValid(true);
        setTitleError(null);
      }
    }

    const requestRegionHandler = async () => {
      checkTitleIsValid();
      if(!titleIsValid){
        return;
      }
      try {
        const data = await requestRegion(titleInput);
        if(data.content) {
          for (const i of data.content) {
            if(i.type === 'region'){
              setTitleIsValid(false);
              setTitleError(i.message);
            }
          }
          return;
        }
        setModalTitle('Request Sent');
        setModalAnimation(1);
        setModalText('Your request has been sent and will be acted upon A$AP');
        setModalButtonText('Okay');
        setModalRoute('/');
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

  return (
    <div className={classes.container}>
        <h1 className={classes.title}>Request Region Addition</h1>
        <div className={classes.formContainer}>
            <label className={titleIsValid ? classes.formLabel : classes.formLabelError}>Title</label>
            <input type='text' onChange={(event) => {setTitleInput(event.target.value)}} value={titleInput} className={ titleIsValid ? classes.formInput : classes.formInputError} placeholder='Enter the title of the region you want to request'></input>
            {!titleIsValid && <p className={classes.errorMessage}>{titleError}</p>}
            {!isLoading && <Button onClick={requestRegionHandler} style={buttonStyle}>Make Request</Button>}
            {isLoading && <ActivityIndicator></ActivityIndicator>}
        </div>
    </div>
  )
}

export default AddRegionForm;