import React, { Fragment } from 'react'
import Header from '../../components/ui/Header'
import { title } from '../../utils/title'
import PasswordResetForm from './password-reset-components/PasswordResetForm'

const PasswordResetPage = () => {
  title('Password Reset');
  return (
    <Fragment>
        <Header></Header>
        <PasswordResetForm></PasswordResetForm>
    </Fragment>
  )
}

export default PasswordResetPage