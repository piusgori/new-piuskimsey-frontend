import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ActivityIndicator from '../../components/ui/ActivityIndicator';
import { AppContext } from '../../services/app-context';
import SearchInput from './search-components/SearchInput';
import classes from './SearchPage.module.css';

const SearchPage = () => {

  const [input, setInput] = useState('');
  const [products, setProducts] = useState([]);
  const [people, setPeople] =useState([]);
  const navigate = useNavigate();
  const { isLoading, search, setIsModalVisible, setModalAnimation, setModalButtonText, setModalRoute, setModalText, setModalTitle } = useContext(AppContext);

  useEffect(() => {
    const getResultsHandler = async () => {
      try {
        const data = await search(input);
        setProducts(data.products);
        setPeople(data.people)
        console.log(data.people);
      } catch (err) {
        setModalAnimation(3);
        setModalButtonText('Okay');
        setModalRoute(null);
        setModalText('An unexpected error has occured');
        setModalTitle('We are sorry');
        setIsModalVisible(true);
      }
    };
    if(input.length > 0) {
      getResultsHandler();
    }
    //eslint-disable-next-line
  }, [input])

  return (
    <Fragment>
      <SearchInput input={input} setInput={setInput}></SearchInput>
      {isLoading && <ActivityIndicator></ActivityIndicator>}
      {!isLoading && input.length > 0 && <div className={classes.resultsContainer}>
        <h1 className={classes.resultsTitle}>Search Results</h1>
        <h2 className={classes.eachTitle}>Products</h2>
        {products.length === 0 && <p className={classes.text}>There are no products found</p>}
        {products.length > 0 && products.map((prod, index) => {
          const navigateToProdHandler = () => {
            navigate(`/product/${prod.id}`)
          }

          return (
            <p onClick={navigateToProdHandler} key={index} className={classes.text}>{prod.title}</p>
          )
        })}
        <h2 className={classes.eachTitle}>People</h2>
        {people.length === 0 && <p className={classes.text}>There are no people found</p>}
        {people.length > 0 && people.map((person, index) => {
          const navigateToProdHandler = () => {
            navigate(`/person/${person.id}`)
          }

          return (
            <p onClick={navigateToProdHandler} key={index} className={classes.text}>{person.name}</p>
          )
        })}
      </div>}
    </Fragment>
  )
}

export default SearchPage