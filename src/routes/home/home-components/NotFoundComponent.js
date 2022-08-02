import React from 'react';
import classes from './NotFoundComponent.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons'

const NotFoundComponent = () => {
  return (
    <div className={classes.container}>
        <p className={classes.icon}><FontAwesomeIcon icon={faFaceFrown}></FontAwesomeIcon></p>
        <h1 className={classes.title}>404</h1>
        <p className={classes.text}>The page you are looking for is not found or an error occured. Please navigate back to the home page to follow a new direction.</p>
    </div>
  )
}

export default NotFoundComponent