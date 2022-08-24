import React from 'react';
import classes from './TermsAndConditionsComponent.module.css';

const TermsAndConditionsComponent = () => {
  return (
    <div className={classes.container}>
        <h1 className={classes.title}> Terms & Conditions</h1>
        <h3 className={classes.paragraph}>Please ensure you have read the terms and conditions carefully</h3>
        <table>
            <tbody>
                <tr className={classes.row}><td className={classes.data}>1.</td><td className={classes.data}>We welcome you to Piuskimsey website. This is an ecommerce platform we have made with love for you to reach as many customers as you desire.</td></tr>
                <tr className={classes.row}><td className={classes.data}>2.</td><td className={classes.data}>Please note than we are not liable for the delivery of your products. Please communicate with your customers concerning that. We have made it possible for your customers to reach you through WhatsApp whenever they make a purchase of your item.</td></tr>
                <tr className={classes.row}><td className={classes.data}>3.</td><td className={classes.data}>Joining as a user is free. However, if you would like to upgrade and become an admin, you have accepted that you will be legible for a Ksh 50 monthly subscription. We offer the first month free and we charge afterwards per month.</td></tr>
                <tr className={classes.row}><td className={classes.data}>4.</td><td className={classes.data}>When your subscription expires, you will be limited in some aspects. Customers won't be able to purchase your products and you cannot add more as well.</td></tr>
                <tr className={classes.row}><td className={classes.data}>5.</td><td className={classes.data}>We will notify you of your subscription expiry three days before it expires.</td></tr>
            </tbody>
        </table>
        <h3 className={classes.paragraph}>We are happy to have you on board!</h3>
    </div>
  )
}

export default TermsAndConditionsComponent