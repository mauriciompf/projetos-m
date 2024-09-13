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
      console.warn("Failed to get item from localStorage", error);
      return initialState;
    }
  });

  useEffect(() => {
    try {
      const data = JSON.stringify(storedValue);
      const dataSize = new Blob([data]).size;
      const storageLimit = 5 * 1024 * 1024; // 5 MiB

      if (dataSize >= storageLimit) {
        alert("Limite de armazenamento atingido.");
      }

      localStorage.setItem(key, data);
    } catch (error) {
      console.error("Failed to set item in localStorage", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
};

export default useLocalStorage;
