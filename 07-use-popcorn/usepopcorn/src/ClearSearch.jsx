import PropTypes from 'prop-types';

export default function ClearSearch({ setQuery }) {
  return (
    <button
      className='btn-clear'
      onClick={() => setQuery('')}>
      Clear
    </button>
  );
}

ClearSearch.propTypes = {
  setQuery: PropTypes.func.isRequired,
};
