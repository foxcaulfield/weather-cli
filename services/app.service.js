import { ArgumentParser } from "./args.service.js";
import { LogManager } from "./log.service.js";
import { StorageManager } from "./storage.service.js";
import os from "node:os";
import path from "node:path";
const FILE_PATH = path.join(os.homedir(), "weather-data.json"); // Move upper later

export class App {
    #token;
    #argsParser;
    #storageManager;
    #logManager;
    STORAGE_CONSTANTS = {
        TOKEN: Symbol("token"),
        CITY: Symbol("city")
    } 

    constructor() {
        this.#argsParser = new ArgumentParser();
        this.#storageManager = new StorageManager({ filePath: FILE_PATH });
        this.#logManager = new LogManager();
        console.log("App instance instantiated");
    }
    async init() {
        try {
            await this.#argsParser.init();
            await this.#storageManager.init();
            this.#token = await this.#storageManager.getToken();
            console.log("App instance initialized");
        } catch (error) {
            this.#logManager.printError(error.message);
            process.exit(1);
        }

        // // Check arguments
        // // - check token
        // this.#argsParser.myArgs
        // // - check city

        // // Check stored data
        // // - check token
        // const isTokenExist = await this.#checkTokenExist();
        // // - check city
        // const isCityExist = await this.#checkCityExist();



        // Init
    }
    // async #checkTokenExist() {
    //     // const token = process.env.APIKEY ?? await getKeyValue(STORAGE_CONSTANTS.TOKEN);
    //     return Boolean(await this.#storageManager.getKeyValue(StorageManager.STORAGE_CONSTANTS.TOKEN));
    // }
    // async #checkCityExist() {
    //     return Boolean(await this.#storageManager.getKeyValue(StorageManager.STORAGE_CONSTANTS.CITY));
    // }
    // get args() {
    //     return this.#argsParser.myArgs;
    // }

}


/*
const argParses = new ArgumentParser();
const args = await argParses.init();

console.log("args");
console.log(args);

class CLI {
    constructor({ ARGS }) {
        if (!ARGS.key) {
            throw new Error("No API key provided");
        }
    }
    async init() {

        // const token = process.env.APIKEY ?? await getKeyValue(STORAGE_CONSTANTS.TOKEN);

        if (!token) {
            throw new Error("No APIKEY provided");
        }

        const weatherApi = new WeatherAPI({
            baseUrl: config.openweater.apiUrl,
            token: token
        });


        const getForecast = async () => {
            try {
                // console.log(await weatherApi.getCityWeather(args.c));
                console.log(await weatherApi.getCityWeather(process.env.CITY)); // 
            } catch (error) {
                if (error?.response?.status === 404) {
                    printError("City value is invalid");
                } else if (error?.response?.status === 401) {
                    printError("API-key value is invalid");
                } else {
                    printError(error.message);
                }
            }
        };


        if (args.h) {
            // Help
            const helpFilePath = path.resolve(".", "assets", "help.txt");
            const helpText = fs.readFileSync(helpFilePath, { encoding: "utf-8" });
            printHelp(helpText);
        } else if (args.c) {
            // Specify the city
        } else if (args.k) {
            // Token
            await saveToken(args.k);
        }
        // set lang
        // set units

        // Weather
        await getForecast();

    }
}


const saveToken = async (token) => {
    if (!token.length) {
        printError("No token provided");
        return;
    }
    try {
        await setKeyValue(STORAGE_CONSTANTS.TOKEN, token);
        printSuccess("Token saved!");
    } catch (error) {
        printError("Token not saved! " + error.message);
    }
}





// initCLI();

const cli = new CLI({ ARGS });

cli.init();
*/