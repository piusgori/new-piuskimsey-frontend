import React from 'react'
import Routing from '../routing/Routing';
import Preloader from './Preloader'

const NavigationPage = () => {

  const isMainLoading = false

  return (
    <React.Fragment>
      {isMainLoading ? <Preloader></Preloader> : <Routing></Routing>}
    </React.Fragment>
  )
}

export default NavigationPage