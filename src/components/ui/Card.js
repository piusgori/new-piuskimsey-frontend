import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../services/app-context';
import Button from './Button';
import classes from './Card.module.css';

const Card = ({ product }) => {

    const buttonStyle = { marginLeft: 10, marginRight: 10 };
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [url, setUrl] = useState('');
    const { getImageUrl } = useContext(AppContext);
    const navigate = useNavigate();

    const navigateToProductDetailsHandler = () => {
        navigate(`/product/${product.id}`);
    }
    
    useEffect(() => {
        const gettingImageHandler = async () => {
            try {
                const imageUrl = await getImageUrl(product.image);
                setUrl(imageUrl);
            } catch (err) {} finally {
                setIsImageLoading(false);
            }
        }
        gettingImageHandler();
    }, [getImageUrl, product.image]);

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
            <div className={classes.buttonContainer}>
                <Button onClick={navigateToProductDetailsHandler} style={buttonStyle}>Details</Button>
                <Button style={buttonStyle}>Cart</Button>
            </div>
        </div>
    </div>
  )
}

export default Card