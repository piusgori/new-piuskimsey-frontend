import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ActivityIndicator from '../../../components/ui/ActivityIndicator';
import Button from '../../../components/ui/Button';
import { User } from '../../../models/user';
import { AppContext } from '../../../services/app-context';
import classes from './CartDetails.module.css';
import CartItem from './CartItem';

const CartDetails = () => {

  const { person, setPerson, setPersonCart, personCart, isLoading, createOrder, setModalAnimation, setModalText, setModalButtonText, setModalRoute, setModalTitle, setIsModalVisible } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    if(!person){
      return navigate('/login');
    }
  }, [navigate, person]);

  const orderHandler = async () => {
    try {
      const data = await createOrder();
      if(data.content){
        for (const i of data.content){
          if(i.type === 'admin') {
            setModalAnimation(2);
            setModalButtonText('Okay');
            setModalRoute(null);
            setModalText(i.message)
            setModalTitle('Not Found')
            setIsModalVisible(true);
          }
          else if(i.type === 'user') {
            setModalAnimation(2);
            setModalButtonText('Okay');
            setModalRoute(null);
            setModalText(i.message)
            setModalTitle('Not Found')
            setIsModalVisible(true);
          }
        }
        return;
      }
      const foundPerson = localStorage.getItem('person');
      if(foundPerson){
        const parsedPerson = JSON.parse(foundPerson);
        const changedPerson = new User(parsedPerson.id, parsedPerson.name, parsedPerson.email, parsedPerson.phoneNumber, parsedPerson.region, parsedPerson.products, [], parsedPerson.orders, parsedPerson.token, parsedPerson.isAdmin, parsedPerson.sessionExpiry)
        setPerson(changedPerson);
        localStorage.setItem('person', JSON.stringify(changedPerson))
      }
      setPersonCart([]);
      navigate('/order', { state: { orders: data.responses } })
    } catch (err) {
      setModalAnimation(3);
      setModalButtonText('Okay');
      setModalRoute(null);
      setModalText('An unexpected error has occurred')
      setModalTitle('We are sorry')
      setIsModalVisible(true);
    }
  }

  return (
    <div className={classes.container}>
        <h1 className={classes.title}>My Cart</h1>
        {!person && <p className={classes.itemText}>Please login to your account to view your cart</p>}
        {person && personCart.length === 0 && <p className={classes.emptyText}>You have not added items to your cart yet!</p>}
        {person && personCart.length > 0 &&<div className={classes.cartContainer}>
            {personCart.map((item, index) => <CartItem key={index} product={item}></CartItem>)}
            <div className={classes.cartItemContainer}>
                <p className={classes.itemText}>Total Amount: </p>
                <p className={classes.itemText}>Ksh {personCart.reduce((amt, item) => amt+= item.totalAmount, 0)}</p>
            </div>
            {!isLoading && <Button onClick={orderHandler}>Place Order</Button>}
            {isLoading && <ActivityIndicator></ActivityIndicator>}
        </div>}
    </div>
  )
}

export default CartDetails