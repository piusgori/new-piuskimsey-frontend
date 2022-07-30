import React, { useContext } from 'react';
import classes from './Dropdown.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlusCircle, faShoppingCart, faStore, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../../images/pius-icon.png'
import { AppContext } from '../../services/app-context';
import { NavLink } from 'react-router-dom'

const Dropdown = () => {

    const { setIsDropdownVisible, person } = useContext(AppContext);

    const hideDropDownHandler = () => {
        setIsDropdownVisible(false);
    }

  return (
    <div className={classes.container}>
        <div className={classes.dropdownContainer}>
            <div className={classes.topContainer}>
                <FontAwesomeIcon onClick={hideDropDownHandler} className={classes.topIcon} icon={faTimes}></FontAwesomeIcon>
                <img className={classes.image} src={logo} alt='icon'></img>
            </div>
            <div className={classes.bottomContainer}>
                {person && <hr className={classes.hr}></hr>}
                {person && <h1 className={classes.title}>My Account</h1>}
                {person && <p className={classes.text}><FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon> My Cart</p>}
                {person && person.isAdmin && <p className={classes.text}><FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon> Add Item</p>}
                {person && <p className={classes.text}><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> My Account</p>}
                <hr className={classes.hr}></hr>
                <h1 className={classes.title}>Our Store</h1>
                <NavLink onClick={hideDropDownHandler} to='/store' className={classes.text}><FontAwesomeIcon icon={faStore}></FontAwesomeIcon> Store</NavLink>
                <hr className={classes.hr}></hr>
                <h1 className={classes.title}>Our Categories</h1>
                <NavLink onClick={hideDropDownHandler} to='/category' className={classes.text}>Foodstuff</NavLink>
                <p className={classes.text}>Clothing</p>
                <p className={classes.text}>Gaming</p>
                <p className={classes.text}>Electronic Assets</p>
                <p className={classes.text}>Fashion</p>
                <p className={classes.text}>Stickers</p>
                <p className={classes.text}>Photography</p>
                <p className={classes.text}>Design</p>
                <p className={classes.text}>Software Development</p>
            </div>
        </div>
    </div>
  )
}

export default Dropdown