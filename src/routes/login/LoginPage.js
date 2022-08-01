import React, { Fragment } from 'react'
import Header from '../../components/ui/Header'
import LoginForm from './login-components/LoginForm';

const LoginPage = () => {

  return (
    <Fragment>
      <Header></Header>
      <LoginForm></LoginForm>
    </Fragment>
  )
}

export default LoginPage