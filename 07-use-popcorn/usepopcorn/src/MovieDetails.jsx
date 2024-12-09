import { useEffect, useState, useRef } from 'react';
import StarRating from './StarRating';
import Loader from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';

export default function MovieDetails({ apiKey, selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');
  const [error, setError] = useState('');

  const countRef = useRef(0);
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const curRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating;

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

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

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
  }, [selectedId, apiKey]);

  useEffect(() => {
    if (!title) return;
    document.title = title;

    return () => {
      document.title = 'Movie App';
    };
  }, [title]);

  useEffect(() => {
    const closeMovieCallback = (e) => {
      if (e.code === 'Escape') {
        onCloseMovie();
      }
    };
    document.addEventListener('keydown', closeMovieCallback);

    return () => {
      document.removeEventListener('keydown', closeMovieCallback);
    };
  }, [onCloseMovie]);

  return (
    <div className='details'>
      {error && <ErrorMessage message={error}></ErrorMessage>}
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
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />

                  {userRating && (
                    <button
                      className='btn-add'
                      onClick={handleAdd}>
                      Add to Watched List
                    </button>
                  )}
                </>
              ) : (
                <p>You have already watched this movie and rated {curRating} ⭐️'s.</p>
              )}
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
