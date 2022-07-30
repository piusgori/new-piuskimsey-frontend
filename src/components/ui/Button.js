import React from 'react';
import classes from './Button.module.css'

const Button = ({ children, onClick, style }) => {
  return (
    <button onClick={onClick} style={style} className={classes.button}>{children}</button>
  )
}

export default Button