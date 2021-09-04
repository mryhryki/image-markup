import { useState, useEffect } from "react";

export const useStorage = <T>(storageKey: string, defaultValue: T): [T, (val: T) => void] => {
  const [val, setVal] = useState<T>(JSON.parse(localStorage.getItem(storageKey) ?? 'null') ?? defaultValue)
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(val))
  }, [val])
  return [val, setVal];
};
