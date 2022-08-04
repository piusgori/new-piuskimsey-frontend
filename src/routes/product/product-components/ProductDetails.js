import React, { useContext, useEffect, useState } from 'react';
import classes from './ProductDetails.module.css';
import Button from '../../../components/ui/Button';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../../services/app-context';
import ActivityIndicator from '../../../components/ui/ActivityIndicator';

const ProductDetails = () => {

    const buttonStyle = { width: '50%' };
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [imageUrl, setImageUrl] = useState('');
    const { isLoading, setIsLoading, getImageUrl, getProductById, setIsModalVisible, setModalAnimation, setModalButtonText, setModalRoute, setModalText, setModalTitle } = useContext(AppContext);

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
            <Button style={buttonStyle}>Add To Cart</Button>
        </div>}
    </div>
  )
}

export default ProductDetails