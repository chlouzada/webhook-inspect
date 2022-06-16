export default (key: string, value: string) => {
  document.cookie = `${key}=${value}`;
  localStorage.setItem(key, value);
};
