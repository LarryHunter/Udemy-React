import { useEffect, useRef } from 'react';

export default function SearchBar({ query, setQuery }) {
  const initialFocusElememnt = useRef(null);

  useEffect(() => {
    const callback = (e) => {
      if (document.activeElement === initialFocusElememnt.current) return;
      if (e.code === 'Enter') {
        initialFocusElememnt.current.focus();
        setQuery('');
      }
    };

    document.addEventListener('keydown', callback);
    return () => document.addEventListener('keydown', callback);
  }, [setQuery]);

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
