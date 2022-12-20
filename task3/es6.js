const fs = require("fs");
const csv = require("csvtojson");
const file = process.cwd() + "/csv/ex.csv";
const output = "output.txt";

import onError from "./onError";
import onCompleted from "./onComplete";

let results = [];
fs.createReadStream(file)
  .pipe(csv({}))
  .on(
    "data",
    (data) => {
      results.push(data);
    },
    onError,
    onCompleted
  );

csv()
  .fromFile(file)
  .then(
    (jsonObj) => {
      fs.createWriteStream(output).write(JSON.stringify(jsonObj) + "\n");
    },
    onError,
    onCompleted
  );

