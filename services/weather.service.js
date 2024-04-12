import axios from "axios";
import config from "../app.config.json"  with { type: "json" };

class WeatherAPI {
    #token;
    #axiosInstance;
    constructor({ baseUrl, token }) {
        this.#axiosInstance = axios.create({
            baseURL: baseUrl,
            // responseType: "json",
            // transformResponse: res => res
        });
        this.#token = token;
    }
    async #getWeather(lat, lon) {
        const result = await this.#axiosInstance.get(config.openweater.endpoints.weather, {
            params: {
                lat,
                lon,
                appid: this.#token,
                lang: config.openweater.language,
                units: "metric"
            }
        });
        return (result.data);
    }
    async #getCity(name) {
        const result = await this.#axiosInstance.get(config.openweater.endpoints.geocodingLocation, {
            params: {
                q: name,
                appid: this.#token
            }
        });
        return (result.data)[0];
    }
    async getCityWeather(name) {
        console.log(this.#axiosInstance);
        const cityData = await this.#getCity(name);
        return await this.#getWeather(cityData.lat, cityData.lon);
    }
}



export { WeatherAPI };