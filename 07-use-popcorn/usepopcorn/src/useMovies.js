import { useState, useEffect } from 'react';

export function useMovies(query, callback) {
  const apiKey = '580461e8'; // - Key assigned to larry.hunter@outlook.com

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    callback?.();

    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`, {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error('Fetching movie data failed!');
        const data = await response.json();

        if (data.Response === 'False') throw new Error(`No movie or too many results found for search: ${query}`);
        setMovies(data.Search);
        setError('');
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        } else {
          console.log(`Abort occurred: ${err}`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
