// const fs = require("fs");
import fs from "fs";

export function readJSONFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

export function writeJSONFile(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(data, null, 4), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// module.exports = {
//   readJSONFile,
//   writeJSONFile,
// };
