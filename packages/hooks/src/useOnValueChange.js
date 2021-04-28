import React, {useEffect} from 'react';

export function useOnValueChange(value, onChange) {
  const tracked = React.useRef(value);
  useEffect(() => {
    const oldValue = tracked.current;
    if (value !== tracked.current) {
      tracked.current = value;
      onChange(value, oldValue);
    }
  }, [value, onChange]);
}
