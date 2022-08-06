import React, { Fragment } from 'react'
import Header from '../../components/ui/Header'
import { title } from '../../utils/title'
import OrderDetails from './order-components/OrderDetails'

const OrderPage = () => {
  title('Order');
  return (
    <Fragment>
        <Header></Header>
        <OrderDetails></OrderDetails>
    </Fragment>
  )
}

export default OrderPage