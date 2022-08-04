import React, { useContext, useEffect, useState } from 'react';
import Button from '../../../components/ui/Button';
import classes from './EditProductForm.module.css';
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../../../services/app-context';
import ActivityIndicator from '../../../components/ui/ActivityIndicator';

const EditProductForm = () => {
    const [product, setProduct] = useState({});
    const [titleInput, setTitleInput] = useState('');
    const [titleIsValid, setTitleIsValid] = useState(true);
    const [titleError, setTitleError] = useState('');
    const [isFinishedInput, setIsFinishedInput] = useState('No');
    const [isFinishedIsValid, setIsFinishedIsValid] = useState(true);
    const [isFinishedError, setIsFinishedError] = useState('');
    const [isDiscountInput, setIsDiscountInput] = useState('No');
    const [isDiscountIsValid, setIsDiscountIsValid] = useState(true);
    const [isDiscountError, setIsDiscountError] = useState('');
    const [newPriceInput, setNewPriceInput] = useState(0);
    const [newPriceIsValid, setNewPriceIsValid] = useState(true);
    const [newPriceError, setNewPriceError] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [descriptionIsValid, setDescriptionIsValid] = useState(true);
    const [descriptionError, setDescriptionError] = useState('');
    const navigate = useNavigate();
    const [isManipulationLoading, setIsManipulationLoading] = useState(false);

    const { isLoading, products, setProducts, editProduct, deleteProduct, setIsLoading, person, getProductById, setIsModalVisible, setModalAnimation, setModalButtonText, setModalRoute, setModalText, setModalTitle } = useContext(AppContext);
    const buttonStyle = { width: '45%' };
    const { productId } = useParams();

    const checkTitleIsValid = () => {
      if(titleInput.trim().length < 3){
          setTitleIsValid(false);
          setTitleError('Please enter a valid title for the product at least 3 characters');
      } else if (titleInput.trim().length >= 3){
          setTitleIsValid(true);
          setTitleError(null);
      }
    }

    const checkIsDiscountIsValid = () => {
      if(isDiscountInput.trim().length < 2){
          setIsDiscountIsValid(false);
          setIsDiscountError('Please select');
      } else if (isDiscountInput.trim().length >= 2){
          setIsDiscountIsValid(true);
          setIsDiscountError(null);
      }
    }

    const checkIsFinishedIsValid = () => {
      if(isFinishedInput.trim().length < 2){
          setIsFinishedIsValid(false);
          setIsFinishedError('Please select');
      } else if (isFinishedInput.trim().length >= 2){
          setIsFinishedIsValid(true);
          setIsFinishedError(null);
      }
    }

    const checkNewPriceIsValid = () => {
      if(newPriceInput.length < 1) {
          setNewPriceIsValid(false);
          setNewPriceError('Please enter the discount price you want to offer');
      } else if (newPriceInput.length >= 1){
          setNewPriceIsValid(true);
          setNewPriceError(null);
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

    const editProductHandler = async () => {
      checkTitleIsValid();
      checkIsDiscountIsValid();
      checkIsFinishedIsValid();
      checkNewPriceIsValid();
      checkDescriptionIsValid();
      if(!titleIsValid || !isDiscountIsValid || !isFinishedIsValid || !newPriceIsValid || !descriptionIsValid){
        return;
      }
      try {
        setIsManipulationLoading(true);
        const data = await editProduct(productId, titleInput, isDiscountInput, isFinishedInput, newPriceInput, descriptionInput);
        if(data.content) {
          for (const i of data.content){
            if(i.type === 'Admin'){
              setModalAnimation(2);
              setModalButtonText('Okay');
              setModalRoute('/');
              setModalText('Not Found');
              setIsModalVisible(true);
              setModalTitle(i.message);
            } else if (i.type === 'Product') {
              setModalAnimation(2);
              setModalButtonText('Okay');
              setModalRoute('/');
              setModalText(i.message);
              setModalTitle('Error');
              setIsModalVisible(true);
            }
          }
          return; 
        }
        const editedProduct = products.find((prod) => prod.id === productId);
        const editedProductIndex = products.findIndex((prod) => prod.id === productId);
        editedProduct.title = data.title;
        editedProduct.isDiscount = data.isDiscount;
        editedProduct.isFinished = data.isFinished;
        editedProduct.newPrice = data.newPrice;
        editedProduct.description = data.description;
        products[editedProductIndex] = editedProduct;
        setModalAnimation(1);
        setModalButtonText('Okay');
        setModalRoute('/');
        setModalText('Your product has been edited successfully');
        setModalTitle('Success');
        setIsModalVisible(true);
      } catch (err) {
          setModalAnimation(3);
          setModalButtonText('Okay');
          setModalRoute('/');
          setModalText('An Unexpected Error Occured');
          setModalTitle('We are Sorry');
          setIsModalVisible(true);
      } finally {
        setIsManipulationLoading(false);
      }
    }

    const deleteProductHandler = async () => {
      try {
        setIsManipulationLoading(true);
        const data = await deleteProduct(productId);
        if(data.content) {
          for (const i of data.content){
            if (i.type === 'product') {
              setModalAnimation(2);
              setModalButtonText('Okay');
              setModalRoute('/');
              setModalText(i.message);
              setModalTitle('Error');
              setIsModalVisible(true);
            }
          }
          return; 
        }
        setProducts(prevProds => prevProds.filter((prod) => prod.id !== productId))
        setModalAnimation(1);
        setModalButtonText('Okay');
        setModalRoute('/');
        setModalText('Your product has been deleted successfully');
        setModalTitle('Success');
        setIsModalVisible(true);
      } catch (err) {
        setModalAnimation(3);
        setModalButtonText('Okay');
        setModalRoute('/');
        setModalText('An Unexpected Error Occured');
        setModalTitle('We are Sorry');
        setIsModalVisible(true);
      } finally {
        setIsManipulationLoading(false);
      }
    }

    useEffect(() => {
      if(!person){
        return navigate('/login');
      }

      const gettingProductDetailsHandler = async () => {
        try {
          setIsLoading(true);
          const data = await getProductById(productId);
          if(data.content){
            for (const i of data.content){
                if(i.type === 'product'){
                    setModalTitle('Not Found');
                    setModalText(i.message);
                    setModalAnimation(2);
                    setModalButtonText('Okay');
                    setModalRoute('/');
                    setIsModalVisible(true);
                }
            }
            return;
        }
        const foundProduct = { id: data.id, title: data.title, price: data.price, isDiscount: data.isDiscount, isFinished: data.isFinished, newPrice: data.newPrice, category: data.category, image: data.image, description: data.description, region: data.region, creator: data.creator, creatorDetails: data.creatorDetails, createdAt: data.createdAt };
        setProduct(foundProduct);
        setTitleInput(data.title);
        setDescriptionInput(data.description);
        setNewPriceInput(data.newPrice)
        } catch (err) {
          setModalAnimation(3);
          setModalButtonText('Okay');
          setModalRoute('/');
          setModalText('An Unexpected Error Occured');
          setModalTitle('We are Sorry');
          setIsModalVisible(true);
        } finally {
          setIsLoading(false);
        }
      } 
      if(person){
        gettingProductDetailsHandler();
      }
      //eslint-disable-next-line
    }, []);

    if(!isLoading && !productId){
      return (
        <div className={classes.loggedContainer}>
          <h1 className={classes.title}>No Product</h1>
          <h1 className={classes.formLabel}>There is no product found.</h1>
          <Button onClick={() => {navigate('/')}}>Okay</Button>
        </div>
      )
    }

    if(!isLoading && !person){
      return (
        <div className={classes.loggedContainer}>
          <h1 className={classes.title}>Login</h1>
          <h1 className={classes.formLabel}>Please Login First to your account</h1>
          <Button onClick={() => {navigate('/login')}}>Okay</Button>
        </div>
      )
    } 

    if(!isLoading && product.creator !== person.id){
      return (
        <div className={classes.loggedContainer}>
          <h1 className={classes.title}>Not Allowed</h1>
          <h1 className={classes.formLabel}>This is not your product and you are therefore not allowed to edit it.</h1>
          <Button onClick={() => {navigate('/')}}>Okay</Button>
        </div>
      )
    }

  return (
    <div className={classes.container}>
        <h1 className={classes.title}>Edit Product</h1>
        {isLoading && <ActivityIndicator></ActivityIndicator>}
        {!isLoading && <div className={classes.formContainer}>
            <label className={titleIsValid ? classes.formLabel : classes.formLabelError}>Product Title</label>
            <input type='text' onChange={(event) => {setTitleInput(event.target.value)}} value={titleInput} className={ titleIsValid ? classes.formInput : classes.formInputError} placeholder='Title of the Product'></input>
            {!titleIsValid && <p className={classes.errorMessage}>{titleError}</p>}
            <label className={isFinishedIsValid ? classes.formLabel : classes.formLabelError}>Is your product out of stock?</label>
            <select onChange={(event) => {setIsFinishedInput(event.target.value)}} value={isFinishedInput} className={ isFinishedIsValid ? classes.formInput : classes.formInputError} placeholder='Select Yes or No'>
                <option>No</option>
                <option>Yes</option>
            </select>
            {!isFinishedIsValid && <p className={classes.errorMessage}>{isFinishedError}</p>}
            <label className={isDiscountIsValid ? classes.formLabel : classes.formLabelError}>Would you like to offer a discount?</label>
            <select onChange={(event) => {setIsDiscountInput(event.target.value)}} value={isDiscountInput} className={ isDiscountIsValid ? classes.formInput : classes.formInputError} placeholder='Select Yes or No'>
                <option>No</option>
                <option>Yes</option>
            </select>
            {!isDiscountIsValid && <p className={classes.errorMessage}>{isDiscountError}</p>}
            {isDiscountInput === 'Yes' && <label className={newPriceIsValid ? classes.formLabel : classes.formLabelError}>New Price</label>}
            {isDiscountInput === 'Yes' && <input type='number' onChange={(event) => {setNewPriceInput(event.target.value)}} value={newPriceInput} className={ newPriceIsValid ? classes.formInput : classes.formInputError} placeholder='Enter the discount price'></input>}
            {!newPriceIsValid && isDiscountInput === 'Yes' &&  <p className={classes.errorMessage}>{newPriceError}</p>}
            <label className={descriptionIsValid ? classes.formLabel : classes.formLabelError}>Description</label>
            <textarea type='text' onChange={(event) => {setDescriptionInput(event.target.value)}} value={descriptionInput} className={ descriptionIsValid ? classes.formInput : classes.formInputError} placeholder='Enter the description of your product'></textarea>
            {!descriptionIsValid && <p className={classes.errorMessage}>{descriptionError}</p>}
            {!isManipulationLoading && <div className={classes.buttonContainer}>
                <Button onClick={editProductHandler} style={buttonStyle}>Edit</Button>
                <Button onClick={deleteProductHandler} style={buttonStyle}>Delete</Button>
            </div>}
            {isManipulationLoading && <ActivityIndicator></ActivityIndicator>}
        </div>}
    </div>
  )
}

export default EditProductForm