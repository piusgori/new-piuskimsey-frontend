import React from 'react';
import classes from './Processes.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faUsers } from '@fortawesome/free-solid-svg-icons'

const Processes = () => {
  return (
    <div className={classes.container}>
        <div className={classes.serviceContainer}>
            <FontAwesomeIcon className={classes.icon} icon={faUser}></FontAwesomeIcon>
            <h2 className={classes.header}>Free Registration</h2>
            <p className={classes.text}>For any comrade who sells to join our community</p>
        </div>
        <div className={classes.serviceContainer}>
            <FontAwesomeIcon className={classes.icon} icon={faShoppingCart}></FontAwesomeIcon>
            <h2 className={classes.header}>Shop Anything</h2>
            <p className={classes.text}>Get anything your comrades sell in your campus</p>
        </div>
        <div className={classes.serviceContainer}>
            <FontAwesomeIcon className={classes.icon} icon={faUsers}></FontAwesomeIcon>
            <h2 className={classes.header}>Join The Great Community</h2>
            <p className={classes.text}>Where different comrades interactively sell and buy</p>
        </div>
    </div>
  )
}

export default Processes