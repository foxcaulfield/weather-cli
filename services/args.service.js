import yargs from "yargs";
import { hideBin } from 'yargs/helpers';
// import { printError } from "./log.service.js";

// const ARGS = yargs(hideBin(process.argv))
// .parse();

export class ArgumentParser {
    args;
    #yargsLib;
    #yargsInstance;

    constructor() {
        this.#yargsLib = yargs;
        this.#setupOptions();
        // this.#init();
        console.log("Argument parser instantiated");
    }
    #setupOptions() {
        this.#yargsInstance = this.#yargsLib(hideBin(process.argv))
            .option("key", {
                alias: "k",
                describe: "Provide an API key",
                type: "string",
                nargs: 1,
                demandOption: false
            })
            .option("city", {
                alias: "c",
                describe: "Provide a target city",
                type: "string",
                nargs: 1,
                demandOption: false
            })
            .help()
            .alias("h", "help")
            .conflicts({
                "k": "c"
            })
            .exitProcess(false);
    }
    async init() {
        this.args = await this.#yargsInstance.parseAsync();
        console.log("Argument parser initialized");
    }
}