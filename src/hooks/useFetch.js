import { useState, useEffect } from 'react';
const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;

const useFetch = (urlParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: '' });
  const [data, setData] = useState({});

  const fetchMovie = async (url) => {
    setError({ show: false, msg: '' });
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.Response === 'True') {
        setData(data.Search || data);
      } else {
        setError({
          show: true,
          msg: data.Error,
        });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie(`${API_ENDPOINT}${urlParams}`);
  }, [urlParams]);

  return {
    isLoading,
    error,
    data,
  };
};

export default useFetch;
