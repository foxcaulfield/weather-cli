import chalk from "chalk";

class LogManager {
    constructor() {

    }
    printError = (text) => {
        const errorText = `${chalk.bgRed("ERROR")}  ${text}`;
        console.log(errorText);
    };

    printSuccess = (text) => {
        const successText = `${chalk.bgGreen("SUCCESS")} ${text}`;
        console.log(successText);
    };

    printInfo = (text) => {
        const infoText = chalk.bgCyan(text);
        console.log(infoText);
    };

    printHelp = (text) => {
        const helpText = `${chalk.bgCyan("HELP")}\n${text}}`;
        console.log(helpText);
    }
}
// const printError = (text) => {
//     const errorText = `${chalk.bgRed("ERROR")}  ${text}`;
//     console.log(errorText);
// };

// const printSuccess = (text) => {
//     const successText = `${chalk.bgGreen("SUCCESS")} ${text}`;
//     console.log(successText);
// };

// const printInfo = (text) => {
//     const infoText = chalk.bgCyan(text);
//     console.log(infoText);
// };

// const printHelp = (text) => {
//     const helpText = `${chalk.bgCyan("HELP")}\n${text}}`;
//     console.log(helpText);
// }


// export { printError, printSuccess, printInfo, printHelp };
export { LogManager };