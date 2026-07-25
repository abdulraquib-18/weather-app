export const getBackground = (weather) => {
  if (!weather) return "default-bg";

  const condition = weather.weather[0].main.toLowerCase();

  if (condition.includes("clear")) return "clear-bg";

  if (condition.includes("cloud")) return "cloud-bg";

  if (condition.includes("rain")) return "rain-bg";

  if (condition.includes("snow")) return "snow-bg";

  if (condition.includes("thunder")) return "storm-bg";

  if (condition.includes("mist")) return "mist-bg";

  if (condition.includes("fog")) return "mist-bg";

  return "default-bg";
};