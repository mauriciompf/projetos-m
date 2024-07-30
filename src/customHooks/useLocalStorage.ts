import React, { useEffect, useState } from "react";

type useLocalStorageParams<T> = {
  key: string;
  initialState: T;
};

const useLocalStorage = <T>({
  key,
  initialState,
}: useLocalStorageParams<T>): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialState;
    } catch (error) {
      console.error("Failed to get item from localStorage", error);
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export { useLocalStorage };
