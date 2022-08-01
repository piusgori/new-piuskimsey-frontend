import React, { Fragment } from 'react'
import Header from '../../components/ui/Header'
import OrderDetails from './order-components/OrderDetails'

const OrderPage = () => {
  return (
    <Fragment>
        <Header></Header>
        <OrderDetails></OrderDetails>
    </Fragment>
  )
}

export default OrderPage