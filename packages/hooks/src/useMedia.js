import { useState, useEffect } from 'react';

function createUseMediaFactory(useEffectHook) {
  return (query) => {
    const [match, setMatch] = useState(false);

    useEffectHook(() => {
      if (!window || !window.matchMedia) {
        return;
      }

      const matchMedia = window.matchMedia(query);
      const updateMatch = (event) => setMatch(event.matches);

      setMatch(matchMedia.matches);

      matchMedia.addListener(updateMatch);
      return () => {
        matchMedia.removeListener(updateMatch);
      };
    }, [query]);

    return match;
  };
}

export const useMedia = createUseMediaFactory(useEffect);
