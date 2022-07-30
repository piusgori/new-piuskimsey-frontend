import React, { Fragment, useContext } from 'react';
import ReactDOM from 'react-dom';
import { Route, Routes } from 'react-router-dom'
import Dropdown from '../components/ui/Dropdown'
import HomePage from '../routes/home/HomePage'
import LoginPage from '../routes/login/LoginPage'
import SearchPage from '../routes/search/SearchPage';
import { CSSTransition } from 'react-transition-group';
import { AppContext } from '../services/app-context'
import Modal from '../components/ui/Modal';
import StorePage from '../routes/store/StorePage';
import CategoryPage from '../routes/category/CategoryPage';
import SignupPage from '../routes/signup/SignupPage';
import ForgotPasswordPage from '../routes/password-reset/ForgotPasswordPage';
import PasswordResetPage from '../routes/password-reset/PasswordResetPage';
import AddProductPage from '../routes/store/AddProductPage';

const Routing = () => {

  const { isModalVisible, isDropdownVisible } = useContext(AppContext)

  const Animated = () => {
    const content = <CSSTransition in={isDropdownVisible} timeout={300} classNames='slide-in-left' mountOnEnter unmountOnExit><Dropdown></Dropdown></CSSTransition>
    return (
      ReactDOM.createPortal(content, document.getElementById('drawer-hook'))
    )
  }

  const ModalOverlay = () => {
    const content = <CSSTransition in={isModalVisible} timeout={300} classNames='slide-in-left' mountOnEnter unmountOnExit><Modal></Modal></CSSTransition>
    return (
      ReactDOM.createPortal(content, document.getElementById('modal-hook'))
    )
  }

  return (
    <Fragment>
      <Animated></Animated>
      <ModalOverlay></ModalOverlay>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
        <Route path='/signup' element={<SignupPage></SignupPage>}></Route>
        <Route path='/forgot-password' element={<ForgotPasswordPage></ForgotPasswordPage>}></Route>
        <Route path='/password-reset' element={<PasswordResetPage></PasswordResetPage>}></Route>
        <Route path='/search' element={<SearchPage></SearchPage>}></Route>
        <Route path='/store' element={<StorePage></StorePage>}></Route>
        <Route path='/add-product' element={<AddProductPage></AddProductPage>}></Route>
        <Route path='/category' element={<CategoryPage></CategoryPage>}></Route>
      </Routes>
    </Fragment>
  )
}

export default Routing