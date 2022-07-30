import React, { Fragment } from 'react'
import Footer from '../../components/ui/Footer';
import Header from '../../components/ui/Header';
import StoreProducts from './store-components/StoreProducts';

const StorePage = () => {
  return (
    <Fragment>
        <Header></Header>
        <StoreProducts></StoreProducts>
        <Footer></Footer>
    </Fragment>
  )
}

export default StorePage;