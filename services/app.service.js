export class App {
    #argsManager;
    #storageManager;
    #logManager;
    #weatherManager;
    STORAGE_CONSTANTS = {
        API_KEY: "key",
        CITY: "city"
    }

    constructor({ argsManager, storageManager, logManager, weatherManager }) {
        this.#argsManager = argsManager;
        this.#storageManager = storageManager;
        this.#logManager = logManager;
        this.#weatherManager = weatherManager;
        console.log("App instance instantiated");
    }

    async launch() {
        try {
            await this.#argsManager.launch(); // Includes arg conflicts check
            await this.#storageManager.launch(); // Includes file permission check

            // for (let [key] of Object.keys(this.#argsManager.options)) {
            const callbacks = [];

            for (let [key, value] of Object.entries(this.STORAGE_CONSTANTS)) {
                const hasInArgs = value in this.#argsManager.args;
                const hasInStorage = value in this.#storageManager.data;
                if (hasInArgs) {
                    // await this.#storageManager.setKeyValue(value, this.#argsManager.args[value]);
                    callbacks.push(async () => await this.#storageManager.setKeyValue(value, this.#argsManager.args[value]));
                } else if (!hasInStorage) {
                    // Prompt is possible
                    throw new Error(`Key '${value}' is required. Please provide it as a command-line argument (check the help).`);
                }
            }

            console.log("Data checked");

            for (let cb of callbacks) {
                await cb();
            }

            console.log("Callbacks called");

            const apikey = await this.#storageManager.getKeyValue(this.STORAGE_CONSTANTS.API_KEY);
            const city = await this.#storageManager.getKeyValue(this.STORAGE_CONSTANTS.CITY);

            console.log("apikey", apikey);
            console.log("city", city);

            await this.#weatherManager.launch({ apikey });
            console.log("App initialized");

            const weather = await this.#weatherManager.getCityWeather(city);

        } catch (error) {
            this.#logManager.printError(error.message);
            process.exit(1);
        }
    }
}
