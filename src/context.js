import React, { useState, useContext } from 'react';
import useFetch from './hooks/useFetch';

const AppContext = React.createContext({
  isLoading: null,
  error: { show: null, msg: '' },
  movies: [],
  query: '',
  setQuery: () => {},
});

const AppProvider = ({ children }) => {
  const [query, setQuery] = useState('back to the future');
  const { isLoading, error, data: movies } = useFetch(`&s=${query}`);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        error,
        movies,
        query,
        setQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
