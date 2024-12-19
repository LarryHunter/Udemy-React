import React from 'react';
import PropTypes from 'prop-types';
import TitleBar from './TitleBar';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import ClearSearch from './ClearSearch';

export default function NavBar({ query, setQuery, movies }) {
  return (
    <nav className='nav-bar'>
      <TitleBar />
      <SearchBar
        query={query}
        setQuery={setQuery}
      />
      <ClearSearch setQuery={setQuery} />
      <SearchResults movies={movies} />
    </nav>
  );
}

NavBar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired,
};
