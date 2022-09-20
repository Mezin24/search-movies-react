import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_ENDPOINT } from '../context';

const SingleMovie = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: '' });
  const [movie, setMovie] = useState({});

  const fetchMovie = async (url) => {
    setError({ show: false, msg: '' });
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.Response === 'True') {
        setMovie(data);
      } else {
        setError({
          show: true,
          msg: data.Error,
        });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie(`${API_ENDPOINT}&i=${id}`);
  }, []);

  if (loading) {
    return <div className='loading'></div>;
  }

  if (error.show) {
    return (
      <div className='page-error'>
        <h1 className='error'>{error.msg}</h1>
      </div>
    );
  }

  const { Poster: poster, Title: title, Plot: plot, Year: year } = movie;
  return (
    <section className='single-movie'>
      <img src={poster} alt={title} />
      <div className='single-movie-info'>
        <h2>{title}</h2>
        <p>{plot}</p>
        <h4>{year}</h4>
        <Link to='/' className='btn'>
          Back to movies
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;
