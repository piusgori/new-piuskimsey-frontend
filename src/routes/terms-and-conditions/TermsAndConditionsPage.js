import React, { Fragment } from 'react'
import Header from '../../components/ui/Header'
import TermsAndConditionsComponent from './terms-and-conditions-components/TermsAndConditionsComponent'

const TermsAndConditionsPage = () => {
  return (
    <Fragment>
        <Header></Header>
        <TermsAndConditionsComponent></TermsAndConditionsComponent>
    </Fragment>
  )
}

export default TermsAndConditionsPage