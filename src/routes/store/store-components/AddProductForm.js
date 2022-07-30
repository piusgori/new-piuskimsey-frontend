import React, { useEffect, useRef, useState } from 'react';
import Button from '../../../components/ui/Button';
import classes from './AddProductForm.module.css';
import { Link } from 'react-router-dom';

const AddProductForm = () => {

    const [titleInput, setTitleInput] = useState('');
    const [titleIsValid, setTitleIsValid] = useState(true);
    const [titleError, setTitleError] = useState('');
    const [priceInput, setPriceInput] = useState('');
    const [priceIsValid, setPriceIsValid] = useState(true);
    const [priceError, setPriceError] = useState('');
    const [imageInput, setImageInput] = useState();
    const [imageIsValid, setImageIsValid] = useState(true);
    const [imageError, setImageError] = useState('');
    const [imageUrl, setImageUrl] = useState();
    const [categoryInput, setCategoryInput] = useState('Nairobi');
    const [categoryIsValid, setCategoryIsValid] = useState(true);
    const [categoryError, setCategoryError] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [descriptionIsValid, setDescriptionIsValid] = useState(true);
    const [descriptionError, setDescriptionError] = useState('');

    const imageInputRef = useRef();

    const buttonStyle = { width: '55%', alignSelf: 'center', marginTop: 10 };

    useEffect(() => {
        if (!imageInput){
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setImageUrl(fileReader.result);
        };
        fileReader.readAsDataURL(imageInput);
    }, [imageInput])

    const pickImageHandler = () => {
        imageInputRef.current.click();
    }

    const imageInputHandler = (event) => {
        if (event.target.files && event.target.files.length === 1){
            setImageInput(event.target.files[0]);
            setImageIsValid(true);
        } else {
            setImageInput(null);
            setImageIsValid(false);
            setImageError('Please select an image');
        }
    }

  return (
    <div className={classes.container}>
        <h1 className={classes.title}>Add a new product</h1>
        <div className={classes.formContainer}>
            <label className={titleIsValid ? classes.formLabel : classes.formLabelError}>Title</label>
            <input type='text' onChange={(event) => {setTitleInput(event.target.value)}} value={titleInput} className={ titleIsValid ? classes.formInput : classes.formInputError} placeholder='Enter the title of your product'></input>
            {!titleIsValid && <p className={classes.errorMessage}>{titleError}</p>}
            <label className={priceIsValid ? classes.formLabel : classes.formLabelError}>Price</label>
            <input type='number' onChange={(event) => {setPriceInput(event.target.value)}} value={priceInput} className={ priceIsValid ? classes.formInput : classes.formInputError} placeholder='Enter the price'></input>
            {!priceIsValid && <p className={classes.errorMessage}>{priceError}</p>}
            <label className={imageIsValid ? classes.formLabel : classes.formLabelError}>Image</label>
            <input style={{display: 'none'}} type='file' onChange={imageInputHandler} ref={imageInputRef} accept=".jpg,.jpeg,.png"></input>
            <div className={ imageIsValid ? classes.imageInput : classes.imageInputError}>
                <Button onClick={pickImageHandler}>Pick Image</Button>
            </div>
            {!imageIsValid && <p className={classes.errorMessage}>{imageError}</p>}
            {imageIsValid && imageInput && <div className={classes.imageDisplay}><img src={imageUrl} alt='Selected'></img></div>}
            <label className={categoryIsValid ? classes.formLabel : classes.formLabelError}>Select it's category</label>
            <select onChange={(event) => {setCategoryInput(event.target.value)}} value={categoryInput} className={ categoryIsValid ? classes.formInput : classes.formInputError} placeholder='Select the category'>
                <option>Gaming</option>
                <option>FoodStuff</option>
                <option>Luxury</option>
            </select>
            {!categoryIsValid && <p className={classes.errorMessage}>{categoryError}</p>}
            <label className={descriptionIsValid ? classes.formLabel : classes.formLabelError}>Description</label>
            <textarea type='text' onChange={(event) => {setDescriptionInput(event.target.value)}} value={descriptionInput} className={ descriptionIsValid ? classes.formInput : classes.formInputError} placeholder='Enter the description of your product'></textarea>
            {!descriptionIsValid && <p className={classes.errorMessage}>{descriptionError}</p>}
            <Link to='/login' className={classes.linkText}>Is your preferred category not listed?</Link>
            <Button style={buttonStyle}>Add This Product</Button>
        </div>
    </div>
  )
}

export default AddProductForm