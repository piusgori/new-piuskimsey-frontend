import React, { Fragment } from 'react'
import Footer from '../../components/ui/Footer';
import Header from '../../components/ui/Header';
import CategoryProducts from './category-components/CategoryProducts';

const CategoryPage = () => {
  return (
    <Fragment>
        <Header></Header>
        <CategoryProducts></CategoryProducts>
        <Footer></Footer>
    </Fragment>
  )
}

export default CategoryPage;