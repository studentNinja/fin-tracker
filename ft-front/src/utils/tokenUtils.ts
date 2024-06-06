export const setTokenWithExpiry = (key: string, value: string, ttl: number) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    console.log('Setting token in localStorage:', item);
    localStorage.setItem(key, JSON.stringify(item));
  };
  
  export const getTokenWithExpiry = (key: string) => {
    // localStorage.removeItem(key);
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  };