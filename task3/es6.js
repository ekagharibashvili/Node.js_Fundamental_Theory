const fs = require("fs");
const csv = require("csvtojson");
const file = process.cwd() + "/csv/ex.csv";
const output = "output.txt";

import onError from "./onError";
import onCompleted from "./onComplete";

csv()
  .fromStream(fs.createReadStream(file))
  .then(
    (jsonObj) => {
      fs.createWriteStream(output).write(JSON.stringify(jsonObj) + "\n");
    },
    onError,
    onCompleted
  );
