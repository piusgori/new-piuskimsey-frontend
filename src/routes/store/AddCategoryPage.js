import React, { Fragment } from 'react'
import Header from '../../components/ui/Header'
import { title } from '../../utils/title'
import AddCategoryForm from './store-components/AddCategoryForm'

const AddCategoryPage = () => {
  title('Request Category Addition');
  return (
    <Fragment>
        <Header></Header>
        <AddCategoryForm></AddCategoryForm>
    </Fragment>
  )
}

export default AddCategoryPage