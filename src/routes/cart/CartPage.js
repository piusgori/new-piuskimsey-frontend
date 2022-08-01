import React, { Fragment } from 'react'
import Header from '../../components/ui/Header'
import CartDetails from './cart-components/CartDetails';

const CartPage = () => {
  return (
    <Fragment>
        <Header></Header>
        <CartDetails></CartDetails>
    </Fragment>
  )
}

export default CartPage;
