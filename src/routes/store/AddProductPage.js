import React, { Fragment } from 'react'
import Header from '../../components/ui/Header'
import AddProductForm from './store-components/AddProductForm';

const AddProductPage = () => {
  return (
    <Fragment>
        <Header></Header>
        <AddProductForm></AddProductForm>
    </Fragment>
  )
}

export default AddProductPage;