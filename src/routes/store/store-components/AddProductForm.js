import React, { useContext, useEffect, useRef, useState } from 'react';
import Button from '../../../components/ui/Button';
import classes from './AddProductForm.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../services/app-context';
import { v4 } from 'uuid'
import ActivityIndicator from '../../../components/ui/ActivityIndicator';
import { Product } from '../../../models/product';

const AddProductForm = () => {

    const [titleInput, setTitleInput] = useState('');
    const [titleIsValid, setTitleIsValid] = useState(true);
    const [titleError, setTitleError] = useState('');
    const [priceInput, setPriceInput] = useState('');
    const [priceIsValid, setPriceIsValid] = useState(true);
    const [priceError, setPriceError] = useState('');
    const [imageInput, setImageInput] = useState();
    const [imageName, setImageName] = useState('');
    const [imageIsValid, setImageIsValid] = useState(true);
    const [imageError, setImageError] = useState('');
    const [imageUrl, setImageUrl] = useState();
    const [categoryInput, setCategoryInput] = useState('Foodstuffs');
    const [categoryIsValid, setCategoryIsValid] = useState(true);
    const [categoryError, setCategoryError] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [descriptionIsValid, setDescriptionIsValid] = useState(true);
    const [descriptionError, setDescriptionError] = useState('');
    const [formIsValid, setFormIsValid] = useState(false);

    const { categories, setModalAnimation, person, isLoading, setIsLoading, setProducts, addProduct, uploadProductImage, updateProduct, setIsModalVisible, setModalButtonText, setModalRoute, setModalText, setModalTitle } = useContext(AppContext);
    const navigate = useNavigate();

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
            setImageName(event.target.files[0].name + v4())
            setImageIsValid(true);
            setImageError(null);
        } else {
            setImageInput(null);
            setImageName('');
            setImageIsValid(false);
            setImageError('Please select an image');
        }
    }

    const checkTitleIsValid = () => {
        if(titleInput.trim().length < 3){
            setTitleIsValid(false);
            setTitleError('Please enter a valid title for the product at least 3 characters');
        } else if (titleInput.trim().length >= 3){
            setTitleIsValid(true);
            setTitleError(null);
        }
    }

    const checkPriceIsValid = () => {
        if(priceInput.length < 1) {
            setPriceIsValid(false);
            setPriceError('Please enter the price of your product');
        } else if (priceInput.length >= 1){
            setPriceIsValid(true);
            setPriceError(null);
        }
    }

    const checkImageIsValid = () => {
        if(!imageInput){
            setImageIsValid(false);
            setImageError('Please Select an image');
        } else if (imageInput){
            setImageIsValid(true);
            setImageError(null);
        }
    }

    const checkCategoryIsValid = () => {
        if(categoryInput.length < 3){
            setCategoryIsValid(false);
            setCategoryError('Please select a category');
        } else if (categoryInput.length >= 3){
            setCategoryIsValid(true);
            setCategoryError(null)
        }
    }

    const checkDescriptionIsValid = () => {
        if(descriptionInput.trim().length < 20){
            setDescriptionIsValid(false);
            setDescriptionError('Please enter a description for your product of at least 20 characters')
        } else if(descriptionInput.trim().length >= 20){
            setDescriptionIsValid(true);
            setDescriptionError(null);
        }
    }


    const addProductHandler = async () => {
        checkTitleIsValid();
        checkImageIsValid();
        checkCategoryIsValid();
        checkDescriptionIsValid();
        checkPriceIsValid();
        if(!titleIsValid || !priceIsValid || !imageIsValid || !categoryIsValid || !descriptionIsValid){
            setFormIsValid(false);
        } else if (titleIsValid && priceIsValid && imageIsValid && categoryIsValid && descriptionIsValid) {
            setFormIsValid(true);
        }
        if(!formIsValid){
            return;
        } else if (formIsValid) {
            setIsLoading(true);
            try {
                const data = await addProduct(titleInput, priceInput, categoryInput, descriptionInput);
                if (data.content){
                    for (const i of data.content){
                        if(i.type === 'title'){
                          setTitleIsValid(false);
                          setTitleError(i.message)
                        } else if(i.type === 'price'){
                          setPriceIsValid(false);
                          setPriceError(i.message)
                        } else if(i.type === 'category'){
                          setCategoryIsValid(false);
                          setCategoryError(i.message)
                        } else if(i.type === 'description'){
                          setDescriptionIsValid(false);
                          setDescriptionError(i.message)
                        } else if (i.type === 'admin'){
                            setModalTitle('Not Found');
                            setModalText('We have not found you as an admin');
                            setModalAnimation(2);
                            setModalButtonText('Okay');
                            setModalRoute(null);
                            setIsModalVisible(true);
                        } else if (i.type === 'product'){
                            setModalTitle('Products Exists');
                            setModalAnimation(3);
                            setModalText('The Product you are trying to add already exists under your products');
                            setModalButtonText('Okay');
                            setModalRoute(null);
                            setIsModalVisible(true);
                        }
                      }
                    return;
                }
                const imageUploadData = await uploadProductImage(imageInput, imageName);
                const updatingImageName = await updateProduct(data.id, imageUploadData);
                if(updatingImageName.content){
                    for (const i of updatingImageName.content){
                        if(i.type === 'image'){
                          setImageIsValid(false);
                          setImageError(i.message)
                        } else if (i.type === 'admin'){
                            setModalTitle('Not Found');
                            setModalText('We have not found you as an admin');
                            setModalAnimation(2);
                            setModalButtonText('Okay');
                            setModalRoute(null);
                            setIsModalVisible(true);
                        } else if (i.type === 'product'){
                            setModalTitle('Not Found');
                            setModalText(i.message);
                            setModalAnimation(2);
                            setModalButtonText('Okay');
                            setModalRoute(null);
                            setIsModalVisible(true);
                        }
                      } 
                    return;
                }
                const createdProduct = new Product(updatingImageName.id, updatingImageName.title, updatingImageName.price, updatingImageName.isDiscount, updatingImageName.isFinished, updatingImageName.newPrice, updatingImageName.category, imageName, updatingImageName.description, updatingImageName.region, updatingImageName.creator, updatingImageName.creatorDetails, updatingImageName.createdAt);
                setProducts(prevProducts => [createdProduct, ...prevProducts]);
                setModalTitle('Success');
                setModalText('You have successfully added a product');
                setModalAnimation(1);
                setModalButtonText('Okay');
                setModalRoute('/');
                setIsModalVisible(true);
            } catch (err) {
                setModalTitle('We Are Sorry');
                setModalText('An Unexpected Error Has Occurred!');
                setModalButtonText('Okay');
                setModalAnimation(3);
                setModalRoute(null);
                setIsModalVisible(true);
            } finally {
                setIsLoading(false);
            }
        }
    }

    useEffect(() => {
        if(!person){
            return navigate('/login')
        }
    }, [person, navigate]);

    if (!person) {
        return (
            <div className={classes.loggedContainer}>
                <h1 className={classes.title}>Log In First</h1>
                <p className={classes.formLabel}>You should login first to your account to add items</p>
            </div>
        )
    } else if (person && !person.isAdmin){
        return (
            <div className={classes.loggedContainer}>
                <h1 className={classes.title}>Not Allowed</h1>
                <p className={classes.formLabel}>You should be an admin to be able to add a new product for sale</p>
            </div>
        )
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
                {categories.map((cat) => <option key={cat.id}>{cat.title}</option>)}
            </select>
            {!categoryIsValid && <p className={classes.errorMessage}>{categoryError}</p>}
            <label className={descriptionIsValid ? classes.formLabel : classes.formLabelError}>Description</label>
            <textarea type='text' onChange={(event) => {setDescriptionInput(event.target.value)}} value={descriptionInput} className={ descriptionIsValid ? classes.formInput : classes.formInputError} placeholder='Enter the description of your product'></textarea>
            {!descriptionIsValid && <p className={classes.errorMessage}>{descriptionError}</p>}
            <Link to='/add-category' className={classes.linkText}>Is your preferred category not listed?</Link>
            {!isLoading && <Button onClick={addProductHandler} style={buttonStyle}>Add This Product</Button>}
            {isLoading && <ActivityIndicator></ActivityIndicator>}
        </div>
    </div>
  )
}

export default AddProductForm