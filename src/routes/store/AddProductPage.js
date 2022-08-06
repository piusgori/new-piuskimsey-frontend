import React, { Fragment } from 'react'
import Header from '../../components/ui/Header'
import { title } from '../../utils/title';
import AddProductForm from './store-components/AddProductForm';

const AddProductPage = () => {
  title('Add New Product');
  return (
    <Fragment>
        <Header></Header>
        <AddProductForm></AddProductForm>
    </Fragment>
  )
}

export default AddProductPage;