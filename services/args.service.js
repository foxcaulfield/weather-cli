import yargs from "yargs";
import { hideBin } from 'yargs/helpers';
import { printError } from "./log.service.js";

// const ARGS = yargs(hideBin(process.argv))
// .parse();

export class ArgumentParser {
    myArgs;
    constructor() {
        this.yargsInstance = yargs;
        this.#setupOptions();
    }
    #setupOptions() {
        this.myArgs = this.yargsInstance(hideBin(process.argv))
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
    init() {
        try {
            return this.myArgs.parse();
        } catch (error) {
            printError(error.message);
            process.exit(1);
        }
    }
}