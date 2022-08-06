import React, { Fragment } from 'react'
import Header from '../../components/ui/Header'
import { title } from '../../utils/title';
import LoginForm from './login-components/LoginForm';

const LoginPage = () => {
  title('Log In To PiusKimsey')
  return (
    <Fragment>
      <Header></Header>
      <LoginForm></LoginForm>
    </Fragment>
  )
}

export default LoginPage