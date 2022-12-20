const csv = require("csv-parser");
const fs = require("fs");
const csvtojson = require("csvtojson");
const file = process.cwd() + "/csv/ex.csv";

// parsing CSV
let results = [];
fs.createReadStream(file)
  .pipe(csv({}))
  .on("data", (data) => results.push(data))
  .on("end", () => {
    console.log(results);
  })
  .on("error", (error) => {
    console.log(error.message);
  });

//  convert csvfile to jsonobject using the csvtojsonpackage
csvtojson()
  .fromFile(file)
  .then((jsonObj) => {
    console.log(jsonObj);
  });


