export const getStorageItem = <T>(storageKey: string): T | null => {
  const value = localStorage.getItem(storageKey);

  if (value === null) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch (error) {
    return value as any as T;
  }
};

export const setStorageItem = (storageKey: string, newValue: unknown) => {
  const oldValue = getStorageItem(storageKey);
  const newValuesStr = JSON.stringify(newValue);

  if (JSON.stringify(oldValue) === newValuesStr) {
    return;
  }

  localStorage.setItem(storageKey, newValuesStr);

  window.dispatchEvent(
    new CustomEvent('STORAGE_AFTER_UPDATE', { detail: { storageKey, oldValue, newValue } })
  );
};

export const removeStorageItem = (storageKey: string) => {
  const oldValue = getStorageItem(storageKey);
  if (oldValue === null) {
    return;
  }

  localStorage.removeItem(storageKey);

  window.dispatchEvent(
    new CustomEvent('STORAGE_AFTER_UPDATE', { detail: { storageKey, oldValue, newValue: null } })
  );
};

export const addStorageCallback = <T>(
  event: 'STORAGE_AFTER_UPDATE',
  key: string,
  callback: (prevValue: T | null, currentValue: T | null) => void
) => {

  const eventHandler = (event) => {
    const { storageKey, oldValue, newValue } = event.detail;
    if (key !== storageKey) {
      return;
    }

    callback(oldValue, newValue);
  };

  window.addEventListener('STORAGE_AFTER_UPDATE', eventHandler);

  const unlistener = () => { window.removeEventListener('STORAGE_AFTER_UPDATE', eventHandler); };

  return unlistener;
};