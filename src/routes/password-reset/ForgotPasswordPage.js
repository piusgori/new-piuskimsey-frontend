import React, { Fragment } from 'react'
import Header from '../../components/ui/Header'
import { title } from '../../utils/title'
import ForgotPasswordForm from './password-reset-components/ForgotPasswordForm'

const ForgotPasswordPage = () => {
  title('Forgot Password');
  return (
    <Fragment>
        <Header></Header>
        <ForgotPasswordForm></ForgotPasswordForm>
    </Fragment>
  )
}

export default ForgotPasswordPage;