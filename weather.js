#!/usr/bin/env node --no-warnings=ExperimentalWarning

import { getArgs } from "./helpers/args.js";
import { printHelp, printInfo, printSuccess, printError } from "./services/log.service.js";
import fs from "node:fs";
import path from "node:path";
import { getKeyValue, setKeyValue, STORAGE_CONSTANTS } from "./services/storage.service.js";
import { WeatherAPI } from "./services/weather.service.js";
import config from "./app.config.json"  with { type: "json" };
import yargs from "yargs";
import { hideBin } from 'yargs/helpers';
import { ArgumentParser } from "./services/args.service.js";
import { App } from "./services/app.service.js";

const app = new App();
app.init();