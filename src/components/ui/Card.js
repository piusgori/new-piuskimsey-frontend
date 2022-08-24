import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../services/app-context';
import Button from './Button';
import classes from './Card.module.css';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Card = ({ product }) => {

    const buttonStyle = { marginLeft: 10, marginRight: 10 };
    const manipulateButtonStyle = { marginLeft: 10, marginRight: 10, width: '40%' }
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [url, setUrl] = useState('');
    const [itemInCart, setItemInCart] = useState({});
    const { getImageUrl, person, personCart, addToCart, setIsModalVisible, setModalAnimation, setModalButtonText, setModalRoute, setModalText, setModalTitle } = useContext(AppContext);
    const navigate = useNavigate();

    const navigateToProductDetailsHandler = () => {
        navigate(`/product/${product.id}`);
    }

    const navigateToEditHandler = () => {
        navigate(`/edit-product/${product.id}`);
    }

    const manipulateCartHandler = async (method) => {
        const now = new Date().getTime();
        const subscriptionCheck = new Date(product.creatorSubscription).getTime();
        if(!person){
            return navigate('/login');
        } else if (person && person.id === product.creator){
            setModalAnimation(3);
            setModalTitle('Error');
            setModalText('You cannot add to cart your product');
            setModalRoute(null);
            setModalButtonText('Okay');
            setIsModalVisible(true);
            return;
        } else if (now >= subscriptionCheck){
            setModalAnimation(3);
            setModalTitle('Error');
            setModalText('The owner of this product has not subscribed yet');
            setModalRoute(null);
            setModalButtonText('Okay');
            setIsModalVisible(true);
            return;
        } else {
           await addToCart(product, method); 
        }
    }

    const increaseCartHandler = async () => {
        await manipulateCartHandler('increase');
    }

    const decreaseCartHandler = async () => {
        await manipulateCartHandler('decrease');
    }
    
    useEffect(() => {
        const foundItem = personCart.find((prod) => prod.id === product.id);
        if(foundItem){
            setItemInCart(foundItem);
        } else {
            setItemInCart({});
        }
        const gettingImageHandler = async () => {
            try {
                const imageUrl = await getImageUrl(product.image);
                setUrl(imageUrl);
            } catch (err) {} finally {
                setIsImageLoading(false);
            }
        }
        gettingImageHandler();
    }, [getImageUrl, product.image, personCart, product.id]);

  return (
    <div className={classes.container}>
        <div className={classes.innerContainer}>
            <div className={classes.imageContainer}>
                {isImageLoading && <p>Loading...</p>}
                {!isImageLoading && <img className={classes.image} src={url} alt={product.title}></img>}
            </div>
            <h1 className={classes.title}>{product.title}</h1>
            <div className={classes.priceContainer}>
                <p className={classes.price}>Ksh {product.isDiscount ? product.newPrice : product.price}</p>
                {product.isDiscount && <p className={classes.oldPrice}>Ksh {product.price}</p>}
            </div>
            {!person && <div className={classes.buttonContainer}>
                <Button onClick={navigateToProductDetailsHandler} style={buttonStyle}>Details</Button>
                <Button onClick={increaseCartHandler} style={buttonStyle}>Cart</Button>
            </div>}
            {person && product.creator !== person.id && !itemInCart.quantity && <div className={classes.buttonContainer}>
                <Button onClick={navigateToProductDetailsHandler} style={buttonStyle}>Details</Button>
                <Button onClick={increaseCartHandler} style={buttonStyle}>Cart</Button>
            </div>}
            {person && product.creator !== person.id && itemInCart.quantity && <div className={classes.buttonContainer}>
                <Button onClick={decreaseCartHandler} style={manipulateButtonStyle}><FontAwesomeIcon icon={faMinus}></FontAwesomeIcon></Button>
                <p className={classes.price}>{itemInCart.quantity}</p>
                <Button onClick={increaseCartHandler} style={manipulateButtonStyle}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>
            </div>}
            {person && product.creator === person.id && <div className={classes.buttonContainer}>
                <Button onClick={navigateToEditHandler} style={manipulateButtonStyle}>Edit</Button>
                <Button onClick={navigateToProductDetailsHandler} style={manipulateButtonStyle}>Detail</Button>
            </div>}
        </div>
    </div>
  )
}

export default Card