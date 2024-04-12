
export class App {
    constructor() {
        console.log("App instance created");
    }
    init() {
        console.log("App instance initialized");
    }
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