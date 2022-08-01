import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActivityIndicator from '../../../components/ui/ActivityIndicator';
import Button from '../../../components/ui/Button';
import { AppContext } from '../../../services/app-context';
import classes from './AddCategoryForm.module.css';

const AddCategoryForm = () => {

    const [titleInput, setTitleInput] = useState('');
    const [titleIsValid, setTitleIsValid] = useState(true);
    const [titleError, setTitleError] = useState('');
    const navigate = useNavigate();
    const { person, isLoading, setModalTitle, setModalText, setModalButtonText, setModalRoute, setIsModalVisible, requestCategory } = useContext(AppContext);

    const buttonStyle = { width: '55%', alignSelf: 'center', marginTop: 10 };

    const checkTitleIsValid = () => {
      if(titleInput.length < 3){
        setTitleIsValid(false);
        setTitleError('Please enter a valid title for a category of at least three characters');
      } else if (titleInput.length >= 3){
        setTitleIsValid(true);
        setTitleError(null);
      }
    }

    const requestCategoryHandler = async () => {
      checkTitleIsValid();
      if(!titleIsValid){
        return;
      }
      try {
        const data = await requestCategory(person.email, titleInput);
        if(data.content) {
          for (const i of data.content) {
            if(i.type === 'category'){
              setTitleIsValid(false);
              setTitleError(i.message);
            }
          }
          return;
        }
        setModalTitle('Request Sent');
        setModalText('Your request has been sent and will be acted upon A$AP');
        setModalButtonText('Okay');
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

    useEffect(() => {
      if(!person){
        return navigate('/login');
      }      
    }, [person, navigate])

  return (
    <div className={classes.container}>
        <h1 className={classes.title}>Request Category Addition</h1>
        <div className={classes.formContainer}>
            <label className={titleIsValid ? classes.formLabel : classes.formLabelError}>Title</label>
            <input type='text' onChange={(event) => {setTitleInput(event.target.value)}} value={titleInput} className={ titleIsValid ? classes.formInput : classes.formInputError} placeholder='Enter the title of the category you want to request'></input>
            {!titleIsValid && <p className={classes.errorMessage}>{titleError}</p>}
            {!isLoading && <Button onClick={requestCategoryHandler} style={buttonStyle}>Make Request</Button>}
            {isLoading && <ActivityIndicator></ActivityIndicator>}
        </div>
    </div>
  )
}

export default AddCategoryForm;