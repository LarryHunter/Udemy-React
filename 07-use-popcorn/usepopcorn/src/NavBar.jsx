import React from 'react';
import TitleBar from './TitleBar';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

export default function NavBar({ query, setQuery, movies }) {
  return (
    <nav className='nav-bar'>
      <TitleBar />
      <SearchBar
        query={query}
        setQuery={setQuery}
      />
      <SearchResults movies={movies} />
    </nav>
  );
}
