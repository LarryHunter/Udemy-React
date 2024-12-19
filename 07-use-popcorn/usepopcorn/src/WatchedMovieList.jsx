import WatchedMovie from './WatchedMovie';
import PropTypes from 'prop-types';

export default function WatchedMovieList({ watched, onRemoveWatched }) {
  return (
    <ul className='list movie-list'>
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onRemoveWatched={onRemoveWatched}
        />
      ))}
    </ul>
  );
}

WatchedMovieList.propTypes = {
  watched: PropTypes.array.isRequired,
  onRemoveWatched: PropTypes.func.isRequired,
};
