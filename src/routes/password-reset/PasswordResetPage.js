import React, { Fragment } from 'react'
import Header from '../../components/ui/Header'
import PasswordResetForm from './password-reset-components/PasswordResetForm'

const PasswordResetPage = () => {
  return (
    <Fragment>
        <Header></Header>
        <PasswordResetForm></PasswordResetForm>
    </Fragment>
  )
}

export default PasswordResetPage