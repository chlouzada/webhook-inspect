export default (key: string) => {
  let value: string | null;
  const regex = new RegExp(`(?:(?:^|.*;\\s*)${key}\\s*\\=\\s*([^;]*).*$)|^.*$`);
  value = document.cookie.replace(regex, "$1");
  if (value && value != "" && value != "undefined") return value;
  return localStorage.getItem(key);
};
