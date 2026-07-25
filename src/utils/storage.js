const THEME_KEY = "weather_theme";

export const saveTheme = (theme) => {
  localStorage.setItem(THEME_KEY, theme);
};

export const getTheme = () => {
  return localStorage.getItem(THEME_KEY) || "light";
};

export const removeTheme = () => {
  localStorage.removeItem(THEME_KEY);
};