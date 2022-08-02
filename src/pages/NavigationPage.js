import React, { useContext, useEffect, useState } from 'react'
import Routing from '../routing/Routing';
import { AppContext } from '../services/app-context';
import Preloader from './Preloader'

const NavigationPage = () => {

  const [isMainLoading, setIsMainLoading] = useState(true);
  const { getJoke, getImages, getRegions, getCategories, getProducts, setPerson } = useContext(AppContext);
  

  useEffect(() => {
    const fetchingItemsHandler = async () => {
      const foundPerson = localStorage.getItem('person');
      if(foundPerson){
        const parsedPerson = JSON.parse(foundPerson);
        const timeNow = new Date().getTime();
        if(timeNow >= parsedPerson.sessionExpiry){
          setPerson(null);
          localStorage.removeItem('person');
        } else if (timeNow < parsedPerson.sessionExpiry){
          setPerson(parsedPerson);
        }
      } else if (!foundPerson){
        setPerson(null);
      }
      await getJoke();
      await getRegions();
      await getCategories();
      await getImages();
      await getProducts();
      setIsMainLoading(false);
    };

    fetchingItemsHandler();
    //eslint-disable-next-line
  }, [])

  return (
    <React.Fragment>
      {isMainLoading ? <Preloader></Preloader> : <Routing></Routing>}
    </React.Fragment>
  )
}

export default NavigationPage