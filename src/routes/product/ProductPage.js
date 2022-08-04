import React, { Fragment } from 'react'
import Header from '../../components/ui/Header'
import ProductDetails from './product-components/ProductDetails'

const ProductPage = () => {
  return (
    <Fragment>
        <Header></Header>
        <ProductDetails></ProductDetails>
    </Fragment>
  )
}

export default ProductPage