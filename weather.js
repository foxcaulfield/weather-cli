#!/usr/bin/env node --no-warnings=ExperimentalWarning

import path from "node:path";
import os from "node:os";
import { App } from "./services/app.service.js";
import { ArgumentManager } from "./services/args.service.js";
import { LogManager } from "./services/log.service.js";
import { StorageManager } from "./services/storage.service.js";
import { WeatherAPI } from "./services/weather.service.js";
import config from "./app.config.json"  with { type: "json" };

const FILE_PATH = path.join(os.homedir(), "weather-data.json"); // Move upper later
const WEATHER_BASE_URL = config.openweater.apiUrl;

const argsManager = new ArgumentManager();
const storageManager = new StorageManager({ filePath: FILE_PATH });
const logManager = new LogManager();
const weatherManager = new WeatherAPI({ baseUrl: WEATHER_BASE_URL });

const application = new App({
    argsManager,
    storageManager,
    logManager,
    weatherManager
});

application
    .launch()
    .catch((error) => console.error(error));
// .then(() => // console.log("App started"))