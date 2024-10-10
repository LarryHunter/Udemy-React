import { useState } from 'react';
import { tempMovieData } from './movieData';
import { tempWatchedMovieData } from './watchedMovieData';
import NavBar from './NavBar';
import Box from './Box';
import WatchedMoviesSummary from './WatchedMoviesSummary';
import WatchedMovieList from './WatchedMovieList';

import Main from './Main';
import MovieList from './MovieList';

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedMovieData);

  return (
    <>
      <NavBar movies={movies} />
      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <div>
            <WatchedMoviesSummary watched={watched} />
            <WatchedMovieList watched={watched} />
          </div>
        </Box>
      </Main>
    </>
  );
}
