#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printHelp, printInfo, printSuccess, printError } from "./services/log.service.js";
import fs from "node:fs";
import path from "node:path";
import { setKeyValue, STORAGE_CONSTANTS } from "./services/storage.service.js";

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

    if (args.h) {
        // Help
        const helpFilePath = path.resolve(".", "assets", "help.txt");
        const helpText = fs.readFileSync(helpFilePath, { encoding: "utf-8" });
        printHelp(helpText);
    } else if (args.s) {
        // Specify
    } else if (args.t) {
        // Token
        await saveToken(args.t);
    }

    // Weather
};

initCLI();