import React from 'react';
import piusImage from '../images/pius-icon.png';
import classes from './Preloader.module.css';

const Preloader = () => {
  
  return (
    <div className={classes.container}>
      <div className={classes.ring}></div>
      <div className={classes.down}>
        <img src={piusImage} alt='Welcome to Piuskimsey' className={classes.picture}></img>
        <p className={classes.text}>Hello...</p>
      </div>
    </div>
  )
}

export default Preloader