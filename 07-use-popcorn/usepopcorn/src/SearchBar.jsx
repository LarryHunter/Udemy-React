import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useKey } from './useKey';

export default function SearchBar({ query, setQuery }) {
  const initialFocusElememnt = useRef(null);

  const clearSearchAndSetFocus = () => {
    if (document.activeElement === initialFocusElememnt.current) return;
    initialFocusElememnt.current.focus();
    setQuery('');
  };
  useKey('Enter', clearSearchAndSetFocus);

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={initialFocusElememnt}
    />
  );
}

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};
