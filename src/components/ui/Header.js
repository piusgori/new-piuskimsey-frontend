import React, { Fragment, useContext, useEffect, useState } from 'react';
import classes from './Header.module.css';
import { NavLink, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../services/app-context';
import { useWindowScroll } from 'react-use';

const Header = () => {

    const { person, setIsDropdownVisible, logout } = useContext(AppContext);
    const location = useLocation();
    const { y } = useWindowScroll();
    const [isFirstHeader, setIsFirstHeader] = useState(true);

    useEffect(() => {
        if(y >= 100 || location.pathname !== '/'){
            setIsFirstHeader(false);
        } else if(y < 100 && location.pathname === '/') {
            setIsFirstHeader(true);
        }
    }, [location.pathname, y])

    const showDropDownHandler = () => {
        setIsDropdownVisible(true);
    }

    const isActive = (navData) => navData.isActive ? classes.activeText : classes.text;

    const FirstHeader = () => {
        return (
            <div className={classes.absoluteContainer}>
                <div className={classes.container}>
                    <FontAwesomeIcon onClick={showDropDownHandler} className={classes.text} icon={faBars}></FontAwesomeIcon>
                    <div className={classes.navigationLinks}>
                        <NavLink className={isActive} to='/'>Home</NavLink>
                        {!person && <NavLink className={isActive} to='/login'>Login</NavLink>}
                        {person && <p onClick={logout} className={classes.text}>Logout</p>}
                        <NavLink className={isActive} to='/search'><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></NavLink>
                    </div>
                </div>
            </div>
        )
    }

    const StickyHeader = () => {
        return (
            <div className={classes.stickyContainer}>
                <div className={classes.container}>
                    <FontAwesomeIcon onClick={showDropDownHandler} className={classes.text} icon={faBars}></FontAwesomeIcon>
                    <div className={classes.navigationLinks}>
                        <NavLink className={isActive} to='/'>Home</NavLink>
                        {!person && <NavLink className={isActive} to='/login'>Login</NavLink>}
                        {person && <p onClick={logout} className={classes.text}>Logout</p>}
                        <NavLink className={isActive} to='/search'><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></NavLink>
                    </div>
                </div>
            </div>
        )
    }

  return (
    <Fragment>
        {isFirstHeader ? <FirstHeader></FirstHeader> : <StickyHeader></StickyHeader>}
    </Fragment>
  )
}

export default Header