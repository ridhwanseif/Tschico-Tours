// useTabState.js

import { useState } from 'react';

export function useTabState(initialValue = 0) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return { value, handleChange };
}
