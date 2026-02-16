import fs from "fs";

/**
 * Reads from a json file
 * @param {*} filename
 * @returns {*} The data read from the json file
 */
export function readFromJsonFile(filename) {
  const rawText = fs.readFileSync(filename);
  const text = rawText.toString();

  const parsedJson = JSON.parse(text);
  return parsedJson;
}

/**
 * Writes data to a json file
 * @param {*} filename
 * @param {*} data
 */

export function writeToJsonFile(filename, data) {
  const stringToWrite = JSON.stringify(data);
  fs.writeFileSync(filename, stringToWrite);
}
