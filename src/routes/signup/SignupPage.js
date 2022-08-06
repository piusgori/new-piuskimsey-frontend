import React, { Fragment } from 'react'
import Header from '../../components/ui/Header';
import { title } from '../../utils/title';
import SignupForm from './signup-components/SignupForm';

const SignupPage = () => {
  title('Create Account');
  return (
    <Fragment>
        <Header></Header>
        <SignupForm></SignupForm>
    </Fragment>
  )
}

export default SignupPage;