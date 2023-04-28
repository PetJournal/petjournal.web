// Hooks
import { ChangeEvent, useState } from 'react';

import { UseInput } from '@/types/useInputTypes';

function useInput(options: UseInput = {}) {
  const { initialValue = '', validate } = options;
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | undefined>(undefined);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (validate) {
      setError(validate(newValue));
    }
  };

  return { value, onChange, error };
}

export default useInput;
