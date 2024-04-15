import axios from "axios";
import config from "../app.config.json"  with { type: "json" };

class WeatherAPI {
    #baseUrl;
    #apikey;
    #axiosInstance;
    constructor({ baseUrl }) {
        this.#baseUrl = baseUrl;
        console.log("Weather manager instantiated");
    }
    async launch({ apikey }) {
        this.#axiosInstance = axios.create({
            baseURL: this.#baseUrl,
            // responseType: "json",
            // transformResponse: res => res
        });
        this.#apikey = apikey;
        console.log("Weather manager initialized");
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
}



export { WeatherAPI };