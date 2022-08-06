import React, { Fragment } from 'react'
import Header from '../../components/ui/Header'
import { title } from '../../utils/title';
import CartDetails from './cart-components/CartDetails';

const CartPage = () => {
  title('My Cart');
  return (
    <Fragment>
        <Header></Header>
        <CartDetails></CartDetails>
    </Fragment>
  )
}

export default CartPage;
