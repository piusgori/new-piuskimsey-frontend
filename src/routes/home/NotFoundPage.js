import React, { Fragment } from 'react'
import Header from '../../components/ui/Header'
import { title } from '../../utils/title'
import NotFoundComponent from './home-components/NotFoundComponent'

const NotFoundPage = () => {
  title('Page Not Found');
  return (
    <Fragment>
        <Header></Header>
        <NotFoundComponent></NotFoundComponent>
    </Fragment>
  )
}

export default NotFoundPage