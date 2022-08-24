import React, { useContext, useEffect, useState } from 'react';
import classes from './ProductDetails.module.css';
import Button from '../../../components/ui/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../services/app-context';
import ActivityIndicator from '../../../components/ui/ActivityIndicator';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { title } from '../../../utils/title';

const ProductDetails = () => {

    const buttonStyle = { width: '50%' };
    const manipulateButtonStyle = { width: '42%' };
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [itemInCart, setItemInCart] = useState({});
    const [imageUrl, setImageUrl] = useState('');
    const { isLoading, person, personCart, addToCart, setIsLoading, getImageUrl, getProductById, setIsModalVisible, setModalAnimation, setModalButtonText, setModalRoute, setModalText, setModalTitle } = useContext(AppContext);

    const navigate = useNavigate();
    const navigateToEditHandler = () => {
        navigate(`/edit-product/${productId}`);
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
        const gettingProductHandler = async () => {
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
                title(data.title);
                setProduct(foundProduct);
                const foundUrl = await getImageUrl(data.image);
                setImageUrl(foundUrl);
            } catch (err) {
                setModalTitle('We Are Sorry');
                setModalText('An unexpected error has occured');
                setModalAnimation(3);
                setModalButtonText('Okay');
                setModalRoute('/');
                setIsModalVisible(true);
            } finally {
                setIsLoading(false);
            }
        }
        gettingProductHandler();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const foundItem = personCart.find((prod) => prod.id === product.id);
        if(foundItem){
            setItemInCart(foundItem);
        } else {
            setItemInCart({});
        }
    }, [product.id, personCart])

    if(!product.id && !isLoading) {
        return (
            <div className={classes.container}>
                <h1 className={classes.title}>Product</h1>
                <p className={classes.productDescription}>No product has been found!</p>
            </div>
        )
    }

  return (
    <div className={classes.container}>
        <h1 className={classes.title}>Product</h1>
        {isLoading && <ActivityIndicator></ActivityIndicator>}
        {!isLoading && <div className={classes.productContainer}>
            <h2 className={classes.productTitle}>{product.title}</h2>
            <div className={classes.imageContainer}>
                <img src={imageUrl} alt={product.title}></img>
            </div>
            <p className={classes.productDescription}>{product.description}</p>
            <div className={classes.priceContainer}>
                <p className={classes.price}>KSH {product.isDiscount ? product.newPrice : product.price}</p>
                {product.isDiscount && <p className={classes.oldPrice}>KSH {product.price}</p>}
            </div>
            {!person && <Button onClick={increaseCartHandler} style={buttonStyle}>Add To Cart</Button>}
            {person && !itemInCart.quantity && person.id !== product.creator && <Button onClick={increaseCartHandler} style={buttonStyle}>Add To Cart</Button>}
            {person && itemInCart.quantity && person.id !== product.creator && <div className={classes.buttonContainer}>
                <Button onClick={decreaseCartHandler} style={manipulateButtonStyle}><FontAwesomeIcon icon={faMinus}></FontAwesomeIcon></Button>
                <p className={classes.price}>{itemInCart.quantity}</p>
                <Button onClick={increaseCartHandler} style={manipulateButtonStyle}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>
            </div>}
            {person && person.id === product.creator && <Button onClick={navigateToEditHandler} style={buttonStyle}>Edit</Button>}
        </div>}
    </div>
  )
}

export default ProductDetails