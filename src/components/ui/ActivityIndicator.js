import React from 'react';
import classes from './ActivityIndicator.module.css';

const ActivityIndicator = () => {
  return (
    <div className={classes.container}>
      <div className={classes.spaced}></div>
      <div className={classes.ring}></div>
    </div>
  )
}

export default ActivityIndicator