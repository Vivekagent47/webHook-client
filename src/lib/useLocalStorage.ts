import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type UseLocalStorageJSONOpts = {
  /**
   * Automatically save the value to local storage when it changes.
   * If true, will save the value every time it changes.
   *
   * Provide an object to configure the debounce interval.
   */
  autoSave?: boolean | { debounceIntervalMs?: number };
};

/**
 * Hook to use local storage to persist a state.
 * Uses JSON.stringify and JSON.parse to store and retrieve the value.
 *
 * Will reload the value from local storage when the key changes.
 *
 * Does not automatically save the value to local storage on change, use
 * saveValue() to save the value, or specify the autoSave option.
 *
 * Will automatically save the value to local storage when the component
 * unmounts.
 */
export function useLocalStorageJSON<T>(
  key: string,
  defaultValue: T,
  { autoSave }: UseLocalStorageJSONOpts = {},
) {
  const [initialValue, setInitialValue] = useState<T>(
    readLocalStorageJSON(key) || defaultValue,
  );
  const [value, setValue] = useState(initialValue);
  const [hasValueChanged, setHasValueChanged] = useState(false);
  const prevKeyRef = useRef(key);

  /** Save the value to local storage */
  const saveValue = useCallback(() => {
    if (!hasValueChanged) {
      return;
    }

    writeLocalStorageJSON(key, value);
    setInitialValue(value);
    setHasValueChanged(false);
  }, [hasValueChanged, value]);

  /** Reload the value from local storage */
  const reloadValue = useCallback(() => {
    const newValue = readLocalStorageJSON<T>(key) || defaultValue;
    setInitialValue(newValue);
    setValue(newValue);
  }, [key]);

  /** Reset to defaultValue & remove from localStorage */
  const clearValue = useCallback(() => {
    window.localStorage.removeItem(key);
    setInitialValue(defaultValue);
    setValue(defaultValue);
  }, [key]);

  useEffect(() => {
    if (prevKeyRef.current === key) {
      return;
    }

    // save changes before changing key
    if (hasValueChanged) {
      writeLocalStorageJSON(prevKeyRef.current, value);
    }

    reloadValue();
    prevKeyRef.current = key;
  }, [key, value, hasValueChanged]);

  useEffect(() => {
    if (value !== initialValue) {
      setHasValueChanged(true);
    }
  }, [value]);

  if (autoSave) {
    useEffect(() => {
      if (!hasValueChanged) {
        return;
      }

      // if interval provided, debounce the save
      if (typeof autoSave === "object") {
        const timeout = setTimeout(() => {
          saveValue();
        }, autoSave.debounceIntervalMs);

        return () => {
          clearTimeout(timeout);
        };
      }

      // pure boolean, save on every change
      saveValue();
    }, [hasValueChanged, saveValue]);
  }

  return {
    value,
    hasValueChanged,
    setValue,
    saveValue,
    reloadValue,
    clearValue,
  };
}

export function readLocalStorageJSON<T>(key: string) {
  const value = window.localStorage.getItem(key);
  if (value === null) {
    return;
  }

  return JSON.parse(value) as T;
}

export function writeLocalStorageJSON<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export default function useLocalStorageString(
  id: string,
  defaultValue: string,
) {
  const key = id;
  const state = useState(
    localStorage.getItem(key) === null
      ? defaultValue
      : (localStorage.getItem(key) as string),
  );
  const setCollapse = useMemo(
    () => (value: string) => {
      localStorage.setItem(key, value.toString());
      state[1](value);
    },
    [state[1]],
  );

  const value = useMemo(() => [state[0], setCollapse], [state[0], setCollapse]);
  return value as typeof state;
}
