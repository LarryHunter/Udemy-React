import React from 'react';
import TitleBar from './TitleBar';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

export default function NavBar({ handleSearch, queryString, movies }) {
  return (
    <nav className='nav-bar'>
      <TitleBar />
      <SearchBar
        queryString={queryString}
        handleSearch={handleSearch}
      />
      <SearchResults movies={movies} />
    </nav>
  );
}
