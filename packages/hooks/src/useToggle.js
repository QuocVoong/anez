import { useCallback, useState } from 'react';

export function useToggle(initialState) {
  const [value, setValue] = useState(initialState);
  const toggle = useCallback(() => {
    setValue(!value);
  }, [value]);

  return [value, toggle];
}
