import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import Loader from './LoadingIndicator';

export default function MovieDetails({ selectedId, onCloseMovie, apiKey }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState('');
  const [movie, setMovie] = useState({});

  const {
    Title: title,
    Genre: genre,
    Released: released,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    Plot: plot,
    Actors: actors,
    Director: director,
    imdbRating,
  } = movie;

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`);
        if (!response.ok) throw new Error('Fetching movie data failed!');
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieDetails();
  }, [selectedId]);

  return (
    <div className='details'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button
              className='btn-back'
              onClick={onCloseMovie}>
              &larr;
            </button>
            <img
              src={poster}
              alt={`Poster of movie: ${title}`}
            />
            <div className='details-overview'>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className='rating'>
              <StarRating
                maxRating={10}
                size={24}
              />
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Staring: {actors}</p>
            <p>Directed by: {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
