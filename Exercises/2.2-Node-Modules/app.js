import { faker } from "@faker-js/faker";
import { readFromJsonFile, writeToJsonFile } from "./utilities.js";

// import fs from "fs";

// const text = "hello";
// fs.writeFileSync("core-modules.txt", text);

// const check = fs.readFileSync("core-modules.txt");
// console.log(check.toString());

const data = readFromJsonFile("Pokemon.json");

data[0].nickname = faker.internet.username();
writeToJsonFile("Pokemon.json", data);

console.log(data);
