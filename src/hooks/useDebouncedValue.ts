import { useEffect, useState } from "react";

// Devolve o valor só depois que ele para de mudar por `delay` ms (ex.: busca digitada).
export const useDebouncedValue = <T>(value: T, delay: number): T => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounced;
};
