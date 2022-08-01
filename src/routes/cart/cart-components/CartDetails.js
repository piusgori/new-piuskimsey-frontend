import React from 'react';
import Button from '../../../components/ui/Button';
import classes from './CartDetails.module.css';
import CartItem from './CartItem';

const CartDetails = () => {

  return (
    <div className={classes.container}>
        <h1 className={classes.title}>My Cart</h1>
        <p className={classes.emptyText}>You have not added items to your cart yet!</p>
        <div className={classes.cartContainer}>
            <CartItem></CartItem>
            <CartItem></CartItem>
            <CartItem></CartItem>
            <CartItem></CartItem>
            <div className={classes.cartItemContainer}>
                <p className={classes.itemText}>Total Amount: </p>
                <p className={classes.itemText}>Ksh 3000</p>
            </div>
            <Button>Place Order</Button>
        </div>
    </div>
  )
}

export default CartDetails