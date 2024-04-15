import axios from "axios";
import chalk from "chalk";
import dedent from "dedent";

class WeatherAPI {
    #config;
    #apikey;
    #axiosInstance;
    #icons = {
        "01d": "☀️",
        "02d": "⛅️",
        "03d": "☁️",
        "04d": "☁️",
        "09d": "\uD83C\uDF27",
        "10d": "\uD83C\uDF26",
        "11d": "⛈",
        "13d": "❄️",
        "50d": "\uD83C\uDF2B",
        "01n": "\uD83C\uDF11",
        "02n": "\uD83C\uDF11 ☁",
        "03n": "☁️",
        "04n": "️️☁☁",
        "09n": "\uD83C\uDF27",
        "10n": "☔️",
        "11n": "⛈",
        "13n": "❄️",
        "50n": "\uD83C\uDF2B"
    };
    constructor({ config }) {
        this.#config = config;
        // console.log("Weather manager instantiated");
    }
    async launch({ apikey }) {
        this.#axiosInstance = axios.create({
            baseURL: this.#config.apiUrl,
            // responseType: "json",
            // transformResponse: res => res
        });
        this.#apikey = apikey;
        // console.log("Weather manager initialized");
    }
    async #getWeather(lat, lon) {
        const result = await this.#axiosInstance.get(this.#config.endpoints.weather, {
            params: {
                lat,
                lon,
                appid: this.#apikey,
                lang: this.#config.language,
                units: "metric"
            }
        });
        return (result.data);
    }
    async #getCity(name) {
        try {
            const result = await this.#axiosInstance.get(this.#config.endpoints.geocodingLocation, {
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
        ${this.#icons[weatherData.weather[0].icon]}  ${weatherData.weather[0].main}/${weatherData.weather[0].description}
        Temperature:\t${weatherData.main.temp}
        Feels like:\t${weatherData.main.feels_like}
        Humidity:\t${weatherData.main.humidity} %
        Wind speed:\t${weatherData.wind.speed} m/s
        `));
    }
}



export { WeatherAPI };