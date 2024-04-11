import axios from "axios";
import config from "../app.config.json"  with { type: "json" };
import { STORAGE_CONSTANTS, getKeyValue } from "./storage.service.js";

class WeatherAPI extends axios.Axios {
    token;
    constructor({ baseUrl, token }) {
        super({
            baseURL: baseUrl
        });
        this.token = token;
    }
    async getWeather(lat, lon) {
        const result = await this.get(config.openweater.endpoints.weather, {
            params: {
                lat,
                lon,
                appid: this.token,
                units: "metric"
            }
        });
        return JSON.parse(result.data);
    }
    async getCity(name) {
        const result = await this.get(config.openweater.endpoints.geocodingLocation, {
            params: {
                q: name,
                appid: this.token
            }
        });
        return JSON.parse(result.data)[0];
    }
    async getCityWeather(name) {
        const cityData = await this.getCity(name);
        return await this.getWeather(cityData.lat, cityData.lon);
    }
}



export { WeatherAPI };