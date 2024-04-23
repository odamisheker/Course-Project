import { useState, useEffect } from "react";

export const useLocaleStorage = (key, initValue) => {
  const [value, setValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initValue;
  });

  useEffect(() => {
    if (initValue) {
      window.localStorage.setItem(key, JSON.stringify(initValue));
    }
  }, [initValue, key]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) setValue(JSON.parse(e.newValue));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [value, setValue];
};
