import React, { Fragment } from 'react'
import Header from '../../components/ui/Header'
import PersonComponent from './search-components/PersonComponent'

const PersonPage = () => {
  return (
    <Fragment>
        <Header></Header>
        <PersonComponent></PersonComponent>
    </Fragment>
  )
}

export default PersonPage;