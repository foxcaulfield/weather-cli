import fs from "node:fs";

class StorageManager {
    /* readonly */ #filePath;
    #data;

    get filePath() {
        return this.#filePath;
    }
    get data() {
        return this.#data;
    }

    constructor({ filePath }) {
        this.#filePath = filePath;
        // console.log("Storage manager instantiated");
    }
    async setKeyValue(key, value) {
        this.#data[key] = value;
        await this.#synchronize();
    }

    async getKeyValue(key) {
        return this.#data[key];
    }

    async #getParsedFileData() {
        const fileContent = await fs.promises.readFile(this.#filePath);
        const data = JSON.parse(fileContent);
        return data;
    }
    async launch() {
        const isExist = await this.#isFileExist(this.#filePath);

        if (!isExist) {
            await this.#createStorageFile(this.#filePath);
        }

        const canReadWrite = await this.#canReadWrite(this.#filePath);

        if (!canReadWrite) {
            throw new Error("Unable to read/write to the file, check permissions");
        }

        const fileContent = await fs.promises.readFile(this.#filePath);
        this.#data = JSON.parse(fileContent);
        // console.log("Storage manager initialized");
    }
    async #isFileExist(filePath) {
        try {
            await fs.promises.access(filePath);
            return true;
        } catch (error) {
            return false;
        }
    }
    async #canReadWrite(filePath) {
        try {
            await fs.promises.access(filePath, fs.constants.R_OK | fs.constants.W_OK);
            return true;
        } catch (error) {
            return false;
        }
    }

    async #createStorageFile(filePath, data) {
        await fs.promises.writeFile(filePath, JSON.stringify({}));
    }

    async #synchronize() {
        const fileContent = await this.#getParsedFileData();
        const combined = { ...fileContent, ...this.#data };
        this.#data = combined;
        await fs.promises.writeFile(this.#filePath, JSON.stringify(combined));
    }
}

export { StorageManager };