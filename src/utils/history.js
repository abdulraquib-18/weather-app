const HISTORY_KEY = "weather_history";

export const getHistory = () => {
  const history = localStorage.getItem(HISTORY_KEY);
  return history ? JSON.parse(history) : [];
};

export const saveHistory = (city) => {
  let history = getHistory();

  history = history.filter(
    (item) => item.toLowerCase() !== city.toLowerCase()
  );

  history.unshift(city);

  if (history.length > 3) {
    history = history.slice(0, 3);
  }

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

export const clearHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
};