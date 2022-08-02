import React, { Fragment } from 'react'
import Header from '../../components/ui/Header'
import NotFoundComponent from './home-components/NotFoundComponent'

const NotFoundPage = () => {
  return (
    <Fragment>
        <Header></Header>
        <NotFoundComponent></NotFoundComponent>
    </Fragment>
  )
}

export default NotFoundPage