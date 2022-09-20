import React, { useState, useEffect } from 'react';
import { useGlobalContext } from './context';
const SearchForm = () => {
  const { query, setQuery, error } = useGlobalContext();
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue === '') return;
      setQuery(inputValue);
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [inputValue]);

  return (
    <form className='search-form' onSubmit={(e) => e.preventDefault()}>
      <h2>search movies</h2>
      <input
        type='text'
        className='form-input'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {error.show && <div className='error'>{error.msg}</div>}
    </form>
  );
};

export default SearchForm;
