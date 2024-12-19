import { useEffect, useState } from 'react';
import Main from './Main';
import NavBar from './NavBar';
import Box from './Box';
import WatchedMoviesSummary from './WatchedMoviesSummary';
import WatchedMovieList from './WatchedMovieList';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';

const apiKey = '580461e8'; // - Key assigned to larry.hunter@outlook.com
const watchedMoviesKey = 'watchedMovies';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState(() => {
    const savedWatchedList = JSON.parse(localStorage.getItem(watchedMoviesKey));
    return savedWatchedList || [];
  });

  const handleSelectMovie = (movieId) => {
    setSelectedId((selectedId) => (selectedId === movieId ? null : movieId));
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleRemoveWatched = (movieId) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== movieId));
  };

  useEffect(() => {
    localStorage.setItem(watchedMoviesKey, JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`, {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error('Fetching movie data failed!');
        const data = await response.json();

        if (data.Response === 'False') throw new Error(`No movie or too many results found for search: ${query}`);
        setMovies(data.Search);
        setError('');
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        } else {
          console.log(`Abort occurred: ${err}`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }
    handleCloseMovie();
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <NavBar
        query={query}
        setQuery={setQuery}
        movies={movies}
      />
      <Main>
        <Box>
          {isLoading && <LoadingIndicator />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              onSelectMovie={handleSelectMovie}
            />
          )}
          {error && <ErrorMessage message={error}></ErrorMessage>}
        </Box>
        <Box>
          <div>
            {selectedId ? (
              <MovieDetails
                apiKey={apiKey}
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
                watched={watched}
              />
            ) : (
              <>
                <WatchedMoviesSummary watched={watched} />
                <WatchedMovieList
                  watched={watched}
                  onRemoveWatched={handleRemoveWatched}
                />
              </>
            )}
          </div>
        </Box>
      </Main>
    </>
  );
}
