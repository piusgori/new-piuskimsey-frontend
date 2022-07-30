import React, { Fragment } from 'react'
import Header from '../../components/ui/Header'
import ForgotPasswordForm from './password-reset-components/ForgotPasswordForm'

const ForgotPasswordPage = () => {
  return (
    <Fragment>
        <Header></Header>
        <ForgotPasswordForm></ForgotPasswordForm>
    </Fragment>
  )
}

export default ForgotPasswordPage;