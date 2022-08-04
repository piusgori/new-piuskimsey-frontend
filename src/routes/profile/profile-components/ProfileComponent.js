import React, { useContext, useEffect, useState } from 'react';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import classes from './ProfileComponent.module.css';
import {  useNavigate } from 'react-router-dom';
import { AppContext } from '../../../services/app-context';
import ActivityIndicator from '../../../components/ui/ActivityIndicator';
import { User } from '../../../models/user';

const ProfileComponent = () => {
    const navigate = useNavigate();
    const { person, setModalAnimation, getProductsByAdminId, isLoading, upgrade, setModalTitle, setModalText, setModalButtonText, setModalRoute, setIsModalVisible, setPerson } = useContext(AppContext);
    const [requestProceed, setRequestProceed] = useState(false);
    const [personalProducts, setPersonalProducts] = useState([]);

    useEffect(() => {
        const myProductsHandler = async () => {
            try {
                const data = await getProductsByAdminId(person.id);
                if(data.content){
                    for (const i of data.content){
                        if(i.type === 'Admin'){
                            setModalTitle('Not existing');
                            setModalText(i.message);
                            setModalButtonText('Try Again Later');
                            setModalRoute('/');
                            setIsModalVisible(true);
                        }
                    }
                    return;
                }
                setPersonalProducts(data.products);
            } catch (err) {
                setModalTitle('We are sorry');
                setModalAnimation(3);
                setModalText('An unexpected error has occured. Sorry About That');
                setModalButtonText('Okay');
                setModalRoute('/');
                setIsModalVisible(true); 
            }
        }
        myProductsHandler();
        // eslint-disable-next-line
    }, [])

    const notProceedingHandler = () => {
        setRequestProceed(false);
    }

    const proceedingHandler = () => {
        setRequestProceed(true);
    }

    const upgradeAccountHandler = async () => {
        try {
            const data = await upgrade(person.id);
            if(data.content){
                for (const i of data.content){
                    if(i.type === 'Not Found'){
                        setModalTitle('Not existing');
                        setModalText(i.message);
                        setModalButtonText('Try Again Later');
                        setModalRoute(null);
                        setIsModalVisible(true);
                    }
                }
                return;
            }
            const sessionExpiry = new Date().getTime() + 3600000;
            const upgradedUser = new User(data.id, data.name, data.email, data.phoneNumber, data.region, data.products, data.cart, data.orders, data.token, data.isAdmin, sessionExpiry);
            setPerson(upgradedUser);
            const foundUser = localStorage.getItem('person');
            if(foundUser){
                localStorage.removeItem('person');
            }
            localStorage.setItem('person', JSON.stringify(upgradedUser));
            setModalTitle('Success!');
            setModalText('You have upgraded successfully');
            setModalAnimation(1);
            setModalButtonText('Okay');
            setModalRoute('/');
            setIsModalVisible(true);
        } catch (err) {
            setModalTitle('We are sorry');
            setModalAnimation(3);
            setModalText('An unexpected error has occured. Sorry About That');
            setModalButtonText('Okay');
            setModalRoute(null);
            setIsModalVisible(true);
        }
    }

    const buttonStyle = { marginRight: 18 }

    
    useEffect(() => {
        if(!person){
            return navigate('/login');
        }
    }, [person, navigate])
    
    if(!person){
        return (
            <div className={classes.container}>
                <h1 className={classes.title}>Please Login</h1>
            </div>
        )
    }
  return (
    <div className={classes.container}>
        <h1 className={classes.title}>My Profile</h1>
        <div className={classes.detailContainer}>
            <div className={classes.fieldContainer}>
                <p className={classes.fieldText}>Name:</p>
                <p className={classes.valueText}>{person.name}</p>
            </div>
            <div className={classes.fieldContainer}>
                <p className={classes.fieldText}>E-Mail Address:</p>
                <p className={classes.valueText}>{person.email}</p>
            </div>
            <div className={classes.fieldContainer}>
                <p className={classes.fieldText}>Phone Number:</p>
                <p className={classes.valueText}>{person.phoneNumber}</p>
            </div>
            <div className={classes.fieldContainer}>
                <p className={classes.fieldText}>Region:</p>
                <p className={classes.valueText}>{person.region}</p>
            </div>
            {!person.isAdmin && !requestProceed && !isLoading && <Button onClick={proceedingHandler}>Become an Admin</Button>}
            {!person.isAdmin && requestProceed && !isLoading && <div className={classes.proceedContainer}>
                <p className={classes.fieldText}>Do you really want to proceed?</p>
                <div className={classes.proceedButtonContainer}>
                    <Button onClick={upgradeAccountHandler} style={buttonStyle}>Yes</Button>
                    <Button onClick={notProceedingHandler} style={buttonStyle}>No</Button>
                </div>
            </div>}
            {!person.isAdmin && isLoading && <ActivityIndicator></ActivityIndicator>}
        </div>
        {person.isAdmin && <div>
            <h1 className={classes.productsTitle}>My Products</h1>
            {person.isAdmin && isLoading && <ActivityIndicator></ActivityIndicator>}
            {person.isAdmin && !isLoading && <div>
                {personalProducts.length === 0 && !isLoading && <p className={classes.emptyProductsText}>I have not yet Added Any Products</p>}
                {personalProducts.length > 0 && !isLoading && <div className={classes.productsContainer}>
                    {personalProducts.map((prod) => <Card key={prod.id} product={prod}></Card>)}
                </div>}
            </div>}
        </div>}
    </div>
  )
}

export default ProfileComponent