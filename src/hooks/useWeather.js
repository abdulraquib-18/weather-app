import { useState } from "react";

export const useWeather = () => {

  const [weather, setWeather] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  return {

    weather,

    setWeather,

    loading,

    setLoading,

    error,

    setError

  };

};