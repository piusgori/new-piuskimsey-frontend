import React, { Fragment, Suspense, useContext } from 'react';
import ReactDOM from 'react-dom';
import { Route, Routes } from 'react-router-dom'
import Dropdown from '../components/ui/Dropdown'
import { CSSTransition } from 'react-transition-group';
import { AppContext } from '../services/app-context'
import Modal from '../components/ui/Modal';
import HomePage from '../routes/home/HomePage'; 
import Preloader from '../pages/Preloader';
const LoginPage = React.lazy(() => import('../routes/login/LoginPage')); 
const SearchPage = React.lazy(() => import('../routes/search/SearchPage'));
const StorePage = React.lazy(() => import('../routes/store/StorePage'));
const CategoryPage = React.lazy(() => import('../routes/category/CategoryPage'));
const SignupPage = React.lazy(() => import('../routes/signup/SignupPage'));
const ForgotPasswordPage = React.lazy(() => import('../routes/password-reset/ForgotPasswordPage'));
const PasswordResetPage = React.lazy(() => import('../routes/password-reset/PasswordResetPage'));
const AddProductPage = React.lazy(() => import('../routes/store/AddProductPage'));
const ProfilePage = React.lazy(() => import('../routes/profile/ProfilePage'));
const AddCategoryPage = React.lazy(() => import('../routes/store/AddCategoryPage'));
const AddRegionPage = React.lazy(() => import('../routes/signup/AddRegionPage'));
const CartPage = React.lazy(() => import('../routes/cart/CartPage'));
const OrderPage = React.lazy(() => import('../routes/order/OrderPage'));
const NotFoundPage = React.lazy(() => import('../routes/home/NotFoundPage'));
const ProductPage = React.lazy(() => import('../routes/product/ProductPage'));
const EditProductPage = React.lazy(() => import('../routes/product/EditProductPage'));
const PersonPage = React.lazy(() => import('../routes/search/PersonPage'));
const TermsAndConditionsPage = React.lazy(() => import('../routes/terms-and-conditions/TermsAndConditionsPage'));

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
        <Route path='/login' element={<Suspense fallback={<Preloader></Preloader>}><LoginPage></LoginPage></Suspense>}></Route>
        <Route path='/signup' element={<Suspense fallback={<Preloader></Preloader>}><SignupPage></SignupPage></Suspense>}></Route>
        <Route path='/forgot-password' element={<Suspense fallback={<Preloader></Preloader>}><ForgotPasswordPage></ForgotPasswordPage></Suspense>}></Route>
        <Route path='/password-reset/:token' element={<Suspense fallback={<Preloader></Preloader>}><PasswordResetPage></PasswordResetPage></Suspense>}></Route>
        <Route path='/search' element={<Suspense fallback={<Preloader></Preloader>}><SearchPage></SearchPage></Suspense>}></Route>
        <Route path='/store' element={<Suspense fallback={<Preloader></Preloader>}><StorePage></StorePage></Suspense>}></Route>
        <Route path='/add-product' element={<Suspense fallback={<Preloader></Preloader>}><AddProductPage></AddProductPage></Suspense>}></Route>
        <Route path='/add-region' element={<Suspense fallback={<Preloader></Preloader>}><AddRegionPage></AddRegionPage></Suspense>}></Route>
        <Route path='/add-category' element={<Suspense fallback={<Preloader></Preloader>}><AddCategoryPage></AddCategoryPage></Suspense>}></Route>
        <Route path='/category/:cat' element={<Suspense fallback={<Preloader></Preloader>}><CategoryPage></CategoryPage></Suspense>}></Route>
        <Route path='/product/:productId' element={<Suspense fallback={<Preloader></Preloader>}><ProductPage></ProductPage></Suspense>}></Route>
        <Route path='/edit-product/:productId' element={<Suspense fallback={<Preloader></Preloader>}><EditProductPage></EditProductPage></Suspense>}></Route>
        <Route path='/profile' element={<Suspense fallback={<Preloader></Preloader>}><ProfilePage></ProfilePage></Suspense>}></Route>
        <Route path='/person/:personId' element={<Suspense fallback={<Preloader></Preloader>}><PersonPage></PersonPage></Suspense>}></Route>
        <Route path='/cart' element={<Suspense fallback={<Preloader></Preloader>}><CartPage></CartPage></Suspense>}></Route>
        <Route path='/terms-and-conditions' element={<Suspense fallback={<Preloader></Preloader>}><TermsAndConditionsPage></TermsAndConditionsPage></Suspense>}></Route>
        <Route path='/order' element={<Suspense fallback={<Preloader></Preloader>}><OrderPage></OrderPage></Suspense>}></Route>
        <Route path='*' element={<Suspense fallback={<Preloader></Preloader>}><NotFoundPage></NotFoundPage></Suspense>}></Route>
      </Routes>
    </Fragment>
  )
}

export default Routing