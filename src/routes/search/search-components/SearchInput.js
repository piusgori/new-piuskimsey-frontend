import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import classes from './SearchInput.module.css';

const SearchInput = ({ input, setInput }) => {
  return (
    <div className={classes.container}>
        <input value={input} onChange={(event) => {setInput(event.target.value)}} className={classes.input} placeholder='Search a person or product'></input>
        <p className={classes.icon}><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></p>
    </div>
  )
}

export default SearchInput