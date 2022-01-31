import { getKeyValue, DICTIONARY } from "./storage.service.js";
import axios from "axios";

const getWeather = async () => {
  const token = process.env.TOKEN ?? (await getKeyValue(DICTIONARY.token));
  const city = process.env.CITY ?? (await getKeyValue(DICTIONARY.city));

  if (!token) {
    throw new Error(
      "Не задан ключ API, задайте его через команду -t [API_KEY]"
    );
  }

  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city,
        appid: token,
        lang: "ru",
        units: "metric",
      },
    }
  );

  return data;
};

export { getWeather };
