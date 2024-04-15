import axios from "axios";
import config from "../app.config.json"  with { type: "json" };
import chalk from "chalk";
import dedent from "dedent";

class WeatherAPI {
    #baseUrl;
    #apikey;
    #axiosInstance;
    constructor({ baseUrl }) {
        this.#baseUrl = baseUrl;
        // console.log("Weather manager instantiated");
    }
    async launch({ apikey }) {
        this.#axiosInstance = axios.create({
            baseURL: this.#baseUrl,
            // responseType: "json",
            // transformResponse: res => res
        });
        this.#apikey = apikey;
        // console.log("Weather manager initialized");
    }
    async #getWeather(lat, lon) {
        const result = await this.#axiosInstance.get(config.openweater.endpoints.weather, {
            params: {
                lat,
                lon,
                appid: this.#apikey,
                lang: config.openweater.language,
                units: "metric"
            }
        });
        return (result.data);
    }
    async #getCity(name) {
        try {
            const result = await this.#axiosInstance.get(config.openweater.endpoints.geocodingLocation, {
                params: {
                    q: name,
                    appid: this.#apikey
                }
            });
            if (!result.data?.length) {
                throw new Error("Invalid city name. Please provide another value.")
            }
            return (result.data)[0];
        } catch (error) {
            if (error.name === "AxiosError" && error.response.status === 401) {
                throw new Error("Invalid api key. Please provide another value.")
            }
            throw error;
        }
    }
    async getCityWeather(name) {
        const cityData = await this.#getCity(name);
        return await this.#getWeather(cityData.lat, cityData.lon);
    }
    async printCityWeather(name) {
        const weatherData = await this.getCityWeather(name);
        console.log(dedent(`
        ${chalk.bgBlue("WEATHER")} in ${weatherData.name} (${weatherData.sys.country})
        ${weatherData.weather[0].icon}  ${weatherData.weather[0].main}/${weatherData.weather[0].description}
        Temperature:\t${weatherData.main.temp}
        Feels like:\t${weatherData.main.feels_like}
        Humidity:\t${weatherData.main.humidity} %
        Wind speed:\t${weatherData.wind.speed} m/s
        `));
    }
}



export { WeatherAPI };