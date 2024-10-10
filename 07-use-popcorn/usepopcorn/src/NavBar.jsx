import React from 'react';
import TitleBar from './TitleBar';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

export default function NavBar({ movies }) {
  return (
    <nav className='nav-bar'>
      <TitleBar />
      <SearchBar />
      <SearchResults movies={movies} />
    </nav>
  );
}
