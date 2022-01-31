#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import {
  printHelp,
  printError,
  printSuccess,
  printWeather,
} from "./services/log.service.js";
import { saveKeyValue, DICTIONARY } from "./services/storage.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Не передан токен");
    return;
  }
  try {
    await saveKeyValue(DICTIONARY.token, token);
    printSuccess("Токен сохранен");
  } catch (error) {
    printError(error.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError("Не передан город");
    return;
  }
  try {
    await saveKeyValue(DICTIONARY.city, city);
    printSuccess("Город сохранен");
  } catch (error) {
    printError(error.message);
  }
};

const getForcast = async () => {
  try {
    const weather = await getWeather(process.env.CITY);
    printWeather(weather);
    // console.log(weather)
  } catch (error) {
    if (error?.response?.status == 404) {
      printError("Неверно указан город");
    } else if (error?.response?.status == 401) {
      printError("Неверно указан токен");
    } else {
      printError(error.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  } else if (args.s) {
    return saveCity(args.s);
  } else if (args.t) {
    return saveToken(args.t);
  }
  return getForcast();
};

initCLI();
