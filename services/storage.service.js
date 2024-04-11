import os from "node:os";
import path from "node:path";
import fs from "node:fs";
import fsPromise from "node:fs/promises";

const filePath = path.join(os.homedir(), "weather-data.json")

const setKeyValue = async (key, value) => {
    // console.log(path.basename(filePath));
    let data = {};

    if (fs.existsSync(filePath)) {
        const fileContent = await fs.promises.readFile(filePath);
        data = JSON.parse(fileContent);
    }

    data[key] = value;
    await fs.promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
    if (fs.existsSync(filePath)) {
        const fileContent = await fs.promises.readFile(filePath);
        const data = JSON.parse(fileContent);
        return data[key];
    }
    return undefined;
};


export { setKeyValue, getKeyValue };