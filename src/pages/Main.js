import React from 'react'
import { AppContextProvider } from '../services/app-context'
import NavigationPage from './NavigationPage'

const Main = () => {
  return (
    <AppContextProvider>
        <NavigationPage></NavigationPage>
    </AppContextProvider>
  )
}

export default Main