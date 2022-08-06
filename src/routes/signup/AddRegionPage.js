import React, { Fragment } from 'react'
import Header from '../../components/ui/Header'
import { title } from '../../utils/title'
import AddRegionForm from './signup-components/AddRegionForm'

const AddRegionPage = () => {
  title('Request Region Addition');
  return (
    <Fragment>
        <Header></Header>
        <AddRegionForm></AddRegionForm>
    </Fragment>
  )
}

export default AddRegionPage