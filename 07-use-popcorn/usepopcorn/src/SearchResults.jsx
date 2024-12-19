import PropTypes from 'prop-types';

export default function SearchResults({ movies }) {
  return (
    <p className='num-results'>
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

SearchResults.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};
