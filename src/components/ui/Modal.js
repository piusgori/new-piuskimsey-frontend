import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../services/app-context';
import Button from './Button';
import classes from './Modal.module.css';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-web';

const Modal = () => {

    const style = { width: '50%'};
    const navigate = useNavigate();
    const { modalText, modalTitle, modalAnimation, modalButtonText, setIsModalVisible, modalRoute } = useContext(AppContext);
    const animationRef = useRef(null);
    const animations = [
        require('../../images/animations/welcome.json'),
        require('../../images/animations/success.json'),
        require('../../images/animations/not-found.json'),
        require('../../images/animations/error-animation.json'),
    ]

    useEffect(() => {
        Lottie.loadAnimation({
            container: animationRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animations[modalAnimation],
        })
    })

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
                <div ref={animationRef} className={classes.animationContainer}></div>
                <p className={classes.text}>{modalText}</p>
                <Button onClick={modalButtonAction} style={style}>{modalButtonText}</Button>
            </div>
        </div>
    )
}

export default Modal;