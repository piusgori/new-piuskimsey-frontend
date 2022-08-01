import React, { Fragment } from 'react'
import Header from '../../components/ui/Header'
import AddCategoryForm from './store-components/AddCategoryForm'

const AddCategoryPage = () => {
  return (
    <Fragment>
        <Header></Header>
        <AddCategoryForm></AddCategoryForm>
    </Fragment>
  )
}

export default AddCategoryPage