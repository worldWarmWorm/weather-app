import chalk from "chalk";
import dedent from "dedent-js";

const _getPrettyDate = date => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(new Date(date * 1000))
}

const _capitalizeFirstLetter = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const printError = (error) => {
  console.log(`${chalk.bgRed(" ERROR! ")} ${error}`);
};

const printSuccess = (message) => {
  console.log(`${chalk.bgGreen(" SUCCESS! ")} ${message}`);
};

const printHelp = () => {
  console.log(dedent`
    ${chalk.bgCyan(" HELP ")}
    Без параметров - вывод погоды
    -s [CITY] для установки города
    -h для вывода помощи
    -t [API_KEY] для сохранения токена
  `);
};

const printWeather = (res) => {
  console.log(dedent`
    ${chalk.bgMagenta(" WEATHER ")} Погода в городе ${res.name} по состоянию на ${_getPrettyDate(res.dt)}:
    ${_capitalizeFirstLetter(res.weather[0].description)}
    Температура: ${res.main.temp} C°, ощущается как ${res.main.feels_like} C°
    Влажность: ${res.main.humidity}%
    Скорость ветра: ${res.wind.speed} м/с
  `);
};

export { printError, printSuccess, printHelp, printWeather };
