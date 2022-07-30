import React, { Fragment } from 'react'
import Header from '../../components/ui/Header';
import SignupForm from './signup-components/SignupForm';

const SignupPage = () => {
  return (
    <Fragment>
        <Header></Header>
        <SignupForm></SignupForm>
    </Fragment>
  )
}

export default SignupPage;