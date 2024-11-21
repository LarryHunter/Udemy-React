import WatchedMovie from './WatchedMovie';

export default function WatchedMovieList({ watched }) {
  return (
    <ul className='list movie-list'>
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbId}
        />
      ))}
    </ul>
  );
}
