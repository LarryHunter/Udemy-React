import { useState } from 'react';
import { useMovies } from './useMovies';
import { useLocalStorageState } from './useLocalStorageState';
import Main from './Main';
import NavBar from './NavBar';
import Box from './Box';
import WatchedMoviesSummary from './WatchedMoviesSummary';
import WatchedMovieList from './WatchedMovieList';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], 'watchedMovies');
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  const handleSelectMovie = (movieId) => {
    setSelectedId((selectedId) => (selectedId === movieId ? null : movieId));
  };

  function handleCloseMovie() {
    setSelectedId(null);
  }

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleRemoveWatched = (movieId) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== movieId));
  };

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
