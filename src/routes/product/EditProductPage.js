import React, { Fragment } from 'react'
import Header from '../../components/ui/Header';
import EditProductForm from './product-components/EditProductForm';

const EditProductPage = () => {
  return (
    <Fragment>
        <Header></Header>
        <EditProductForm></EditProductForm>
    </Fragment>
  )
}

export default EditProductPage;