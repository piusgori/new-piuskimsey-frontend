import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../../services/app-context';
import classes from './OrderDetails.module.css';

const OrderDetails = () => {
    const { state } = useLocation();
    const { orders } = state;
    const { person } = useContext(AppContext)

    if (!orders) {
      return (
        <div className={classes.container}>
          <h1 className={classes.title}>Order</h1>
          <p className={classes.text}>You haven't placed any order.</p>
        </div>
      )
    }

  return (
    <div className={classes.container}>
        <h1 className={classes.title}>Order Placement successfull</h1>
        <p className={classes.text}>Your order placement has been successfull. Please click on the buttons below to send messages to the respecive owners via WhatsApp.</p>
        {orders.map((order, index) => {
          const prodText = [];
          for (const i of order.productsOrdered){
            const text = `${i.quantity} ${i.title} each at KSH ${i.price} total costing KSH${i.totalAmount}, `;
            prodText.push(text);
          }
          let link = `https://wa.me/${order.creatorPhoneNumber}?text=Hello ${order.creatorName}, I am ${person.name} and I am interested in buying the products below. `;
          for (const j of prodText){
            link += j;
          }
          return (
            <div key={index} className={classes.anchoredButton}>
              <a href={link} target='_blank' rel="noreferrer">Send to {order.creatorName}</a>
            </div>
          )
        }) }
    </div>
  )
}

export default OrderDetails