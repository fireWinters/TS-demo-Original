import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import useEventListener from './useEventListener';
declare global {
  interface WindowEventMap {
    'local-storage': CustomEvent;
  }
}

type SetValue<T> = Dispatch<SetStateAction<T>>;

function parseJSON<T>(value: string | null): T | undefined {
  try {
    //元编程
    return value === 'undefined' ? undefined : JSON.parse(value ?? '');
  } catch {
    console.log('parsing error on', { value });
    return undefined;
  }
  //   Reflect.getOwnPropertyDescriptor(value, 'value');
}
function useLocalStorage<T>(key: string, initialValue: T) {
  const readValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);

      return item ? <T>parseJSON(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  }, [initialValue, key]);
  const [storedValue, setStoredValue] = useState<T>(readValue);
  const setValueRef = useRef<SetValue<T>>();
  //全局唯一的一个 localStorage.setItem == 平级的react迁移
  setValueRef.current = value => {
    if (typeof window == 'undefined') {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`
      );
    }
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(newValue));
      setStoredValue(newValue);
      window.dispatchEvent(new Event('local-storage'));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };
  const setValue: SetValue<T> = useCallback(value => {
    setValueRef.current?.(value);
  }, []);
  useEffect(() => {
    setStoredValue(readValue());
  }, [readValue]);

  const handleStorageChange = useCallback(() => {
    setStoredValue(readValue());
  }, [readValue]);

  //放大hooks的能力
  useEventListener('storage', handleStorageChange);
  useEventListener('local-storage', handleStorageChange);

  return [storedValue, setValue] as const;
}

export { useLocalStorage };
