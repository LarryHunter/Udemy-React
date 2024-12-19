import { useEffect } from 'react';

export function useKey(keyCode, action) {
  useEffect(() => {
    const closeMovieCallback = (e) => {
      if (e.code.toUpperCase() === keyCode.toUpperCase()) {
        action?.();
      }
    };
    document.addEventListener('keydown', closeMovieCallback);

    return () => {
      document.removeEventListener('keydown', closeMovieCallback);
    };
  }, [keyCode, action]);
}
