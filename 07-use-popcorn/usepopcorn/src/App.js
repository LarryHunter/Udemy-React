import { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Box from './Box';
import WatchedMoviesSummary from './WatchedMoviesSummary';
import WatchedMovieList from './WatchedMovieList';
import Main from './Main';
import MovieList from './MovieList';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';
import Movie from './Movie';
import MovieDetails from './MovieDetails';
// import { tempMovieData } from './movieData';
// import { tempWatchedMovieData } from './watchedMovieData';

const apiKey = '580461e8'; // - Key assigned to larry.hunter@outlook.com

export default function App() {
  // const [movies, setMovies] = useState(tempMovieData);
  // const [watched, setWatched] = useState(tempWatchedMovieData);
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleSelectMovie = (movieId) => {
    setSelectedId((selectedId) => (selectedId === movieId ? null : movieId));
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
        if (!response.ok) throw new Error('Fetching movie data failed!');
        const data = await response.json();

        if (data.Response === 'False') throw new Error(`No movie or too many results found for search: ${query}`);
        setMovies(data.Search);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }
    fetchMovies();
  }, [query]);

  return (
    <>
      <NavBar
        handleSearch={handleSearch}
        queryString={query}
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
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                apiKey={apiKey}
              />
            ) : (
              <>
                <WatchedMoviesSummary watched={watched} />
                <WatchedMovieList watched={watched} />
              </>
            )}
          </div>
        </Box>
      </Main>
    </>
  );
}
