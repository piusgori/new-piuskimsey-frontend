import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Button from '../../../components/ui/Button';
import classes from './CartDetails.module.css';

const CartItem = () => {

    const editButtonStyle = { backgroundColor : '#005e00', color: 'white', borderColor: "#005e00", marginRight: 10 }
    const deleteButtonStyle = { backgroundColor: '#d40101', color: 'white', borderColor: "#d40101"}

  return (
    <div className={classes.cartItemContainer}>
        <p className={classes.itemText}>Title</p>
        <p className={classes.itemText}>5: KSH 250</p>
        <Button style={editButtonStyle}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>
        <Button style={editButtonStyle}><FontAwesomeIcon icon={faMinus}></FontAwesomeIcon></Button>
        <Button style={deleteButtonStyle}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
    </div>
  )
}

export default CartItem