const setStorageItem = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getStorageItem = <T>(key: string): T | null => {
  const rawContent = localStorage.getItem(key);
  if (rawContent) return JSON.parse(rawContent);
  return null;
};

export { setStorageItem, getStorageItem };
