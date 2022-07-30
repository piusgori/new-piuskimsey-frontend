import React from 'react';
import Button from './Button';
import classes from './Card.module.css';

const Card = ({ product }) => {

    const buttonStyle = { marginLeft: 10, marginRight: 10 }

  return (
    <div className={classes.container}>
        <div className={classes.innerContainer}>
            <div className={classes.imageContainer}><img className={classes.image} src={product.image} alt={product.title}></img></div>
            <h1 className={classes.title}>{product.title}</h1>
            <div className={classes.priceContainer}>
                <p className={classes.price}>Ksh {product.isDiscount ? product.newPrice : product.price}</p>
                {product.isDiscount && <p className={classes.oldPrice}>Ksh {product.price}</p>}
            </div>
            <div className={classes.buttonContainer}>
                <Button style={buttonStyle}>Details</Button>
                <Button style={buttonStyle}>Cart</Button>
            </div>
        </div>
    </div>
  )
}

export default Card