import React, { Fragment } from 'react'
import Footer from '../../components/ui/Footer';
import Header from '../../components/ui/Header';
import { title } from '../../utils/title';
import StoreProducts from './store-components/StoreProducts';

const StorePage = () => {
  title('Store');
  return (
    <Fragment>
        <Header></Header>
        <StoreProducts></StoreProducts>
        <Footer></Footer>
    </Fragment>
  )
}

export default StorePage;