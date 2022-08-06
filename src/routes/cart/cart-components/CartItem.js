import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import Button from '../../../components/ui/Button';
import { AppContext } from '../../../services/app-context';
import classes from './CartDetails.module.css';
import { useNavigate } from 'react-router-dom'

const CartItem = ({ product }) => {

    const editButtonStyle = { backgroundColor : '#005e00', color: 'white', borderColor: "#005e00", marginRight: 10 }
    const deleteButtonStyle = { backgroundColor: '#d40101', color: 'white', borderColor: "#d40101"}
    const { addToCart, person, setModalAnimation, setModalButtonText, setModalRoute, setModalText, setModalTitle, setIsModalVisible } = useContext(AppContext);
    const navigate = useNavigate();

    const manipulateCartHandler = async (method) => {
      if(!person){
          return navigate('/login');
      } else if (person && person.id === product.creator){
          setModalAnimation(3);
          setModalTitle('Error');
          setModalText('You cannot add to cart your product');
          setModalRoute(null);
          setModalButtonText('Okay');
          setIsModalVisible(true);
          return;
      } else {
         await addToCart(product, method); 
      }
  }

  const increaseCartHandler = async () => {
      await manipulateCartHandler('increase');
  }

  const decreaseCartHandler = async () => {
      await manipulateCartHandler('decrease');
  }

  const deleteCartHandler = async () => {
    await manipulateCartHandler('delete');
}

  return (
    <div className={classes.cartItemContainer}>
        <p className={classes.itemText}>{product.title}</p>
        <p className={classes.itemText}>{product.quantity}: KSH {product.totalAmount}</p>
        <Button onClick={increaseCartHandler} style={editButtonStyle}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>
        <Button onClick={decreaseCartHandler} style={editButtonStyle}><FontAwesomeIcon icon={faMinus}></FontAwesomeIcon></Button>
        <Button onClick={deleteCartHandler} style={deleteButtonStyle}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
    </div>
  )
}

export default CartItem