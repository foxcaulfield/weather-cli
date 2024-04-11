#!/usr/bin/env node --no-warnings=ExperimentalWarning

import { getArgs } from "./helpers/args.js";
import { printHelp, printInfo, printSuccess, printError } from "./services/log.service.js";
import fs from "node:fs";
import path from "node:path";
import { getKeyValue, setKeyValue, STORAGE_CONSTANTS } from "./services/storage.service.js";
import { WeatherAPI } from "./services/weather.service.js";
import config from "./app.config.json"  with { type: "json" };

const saveToken = async (token) => {
    try {
        await setKeyValue(STORAGE_CONSTANTS.TOKEN, token);
        printSuccess("Token saved!");
    } catch (error) {
        printError("Token not saved! " + error.message);
    }
}

const initCLI = async () => {
    const args = getArgs(process.argv);
    const weatherApi = new WeatherAPI({
        baseUrl: config.openweater.apiUrl,
        token: await getKeyValue(STORAGE_CONSTANTS.TOKEN)
    });


    if (args.h) {
        // Help
        const helpFilePath = path.resolve(".", "assets", "help.txt");
        const helpText = fs.readFileSync(helpFilePath, { encoding: "utf-8" });
        printHelp(helpText);
    } else if (args.c) {
        console.log(await weatherApi.getCityWeather(args.c));
        // Specify
    } else if (args.k) {
        // Token
        await saveToken(args.k);
    }

    // Weather
};

initCLI();