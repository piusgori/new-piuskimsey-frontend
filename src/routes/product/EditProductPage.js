import React, { Fragment } from 'react'
import Header from '../../components/ui/Header';
import { title } from '../../utils/title';
import EditProductForm from './product-components/EditProductForm';

const EditProductPage = () => {
  title('Edit Product');
  return (
    <Fragment>
        <Header></Header>
        <EditProductForm></EditProductForm>
    </Fragment>
  )
}

export default EditProductPage;