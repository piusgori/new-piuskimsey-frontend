import React from 'react';
import Button from '../../../components/ui/Button';
import classes from './OrderDetails.module.css';

const OrderDetails = () => {
    const buttonStyle = { marginTop: 10, marginBottom: 10 }

  return (
    <div className={classes.container}>
        <h1 className={classes.title}>Order Placement successfull</h1>
        <p className={classes.text}>Your order placement has been successfull. Please click on the buttons below to send messages to the respecive owners via WhatsApp.</p>
        <Button style={buttonStyle}>Send to Seller 1</Button>
        <Button style={buttonStyle}>Send to Seller 2</Button>
    </div>
  )
}

export default OrderDetails