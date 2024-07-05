import { useEffect, useState } from "react";

type useLocalStorageParams = {
  key: string;
  initialState: unknown | unknown[];
};

const useLocalStorage = ({ key, initialState }: useLocalStorageParams) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : initialState;
    } catch (error) {
      console.error(error);
      setStoredValue(initialState);
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
