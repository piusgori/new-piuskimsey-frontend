import React, { useContext } from 'react';
import Button from '../../../components/ui/Button';
import classes from './Top.module.css';
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../../services/app-context';

const Top = () => {

    const { joke } = useContext(AppContext)
    const buttonStyle = { marginBottom: 10, marginTop: 10, width: '30%'}
    const navigate = useNavigate();

    const goToStoreHandler = () => {
        navigate('/store')
    }

  return (
    <div className={classes.container}>
        <div className={classes.contentContainer}>
            <p className={classes.jokeText}>{joke}</p>
            <h1 className={classes.titleText}>Welcome to Piuskimsey</h1>
            <div className={classes.buttonContainer}>
                <Button onClick={goToStoreHandler} style={buttonStyle}>Store</Button>
                <Button style={buttonStyle}>Cart</Button>
            </div>

        </div>
    </div>
  )
}

export default Top