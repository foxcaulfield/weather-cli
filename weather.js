#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printHelp, printInfo } from "./services/log_service.js";
import fs from "node:fs";
import path from "node:path";

const initCLI = () => {
    const args = getArgs(process.argv);

    if (args.h) {
        // Help
        const helpFilePath = path.resolve(".", "assets", "help.txt");
        const helpText = fs.readFileSync(helpFilePath, { encoding: "utf-8" });
        printHelp(helpText);
    }

    if (args.s) {
        // Specify
    }

    if (args.t) {
        // Token
    }

    // Weather
};

initCLI();