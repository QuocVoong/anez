import { useRef, useState } from 'react';

export function useLazyRef(getValue) {
  const [value] = useState(getValue);
  const ref = useRef(value);

  return ref;
}