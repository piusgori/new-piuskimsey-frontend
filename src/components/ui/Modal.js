import React, { useContext } from 'react';
import { AppContext } from '../../services/app-context';
import Button from './Button';
import classes from './Modal.module.css';
import { useNavigate } from 'react-router-dom';

const Modal = () => {

    const style = { width: '50%'};
    const navigate = useNavigate();
    const { modalText, modalTitle, modalButtonText, setIsModalVisible, modalRoute } = useContext(AppContext);

    const modalButtonAction = () => {
        if(modalRoute){
            navigate(modalRoute);
        }
        setIsModalVisible(false);
    }

    return ( 
        <div className={classes.container}>
            <div className={classes.innerContainer}>
                <h1 className={classes.title}>{modalTitle}</h1>
                <p className={classes.text}>{modalText}</p>
                <Button onClick={modalButtonAction} style={style}>{modalButtonText}</Button>
            </div>
        </div>
    )
}

export default Modal;