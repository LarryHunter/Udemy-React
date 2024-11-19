// import { useState } from 'react';

export default function SearchBar({ handleSearch, queryString }) {
  //const [query, setQuery] = useState('');

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      onChange={(e) => handleSearch(e)}
      value={queryString}
    />
  );
}
