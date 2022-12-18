const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fastcsv = require("fast-csv");
const csv = require("csv-parser");
const fs = require("fs");
const csvtojson = require("csvtojson");
const file = "../node/csv/ex.csv";

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

// parsingWrite the csvfile content to a new txtfile.Use the following format: https://epa.ms/nodejs19-hw1-ex2.
const csvWriter = createCsvWriter({
  path: "out.txt",
  header: [
    { id: "book", title: "BOOK" },
    { id: "author", title: "AUTHOR" },
    { id: "amount", title: "AMOUNT" },
    { id: "price", title: "PRICE" },
  ],
});
const records = [
  {
    book: "The Compound Effect",
    author: "Darren Hardy",
    amount: "5",
    price: "9.48",
  },
  {
    book: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    amount: "4",
    price: "23.48",
  },
  {
    book: "The Miracle Morning",
    author: "Hal Elrod",
    amount: "10",
    price: "21.34",
  },
  {
    book: "Influence: The Psychology of Persuasion",
    author: "Robert B. Cialdini",
    amount: "4",
    price: "12.99",
  },
  {
    book: "The ONE Thing",
    author: "Gary Keller",
    amount: "1",
    price: "11.18",
  },
];

csvWriter
  .writeRecords(records)
  .then(() => console.log("The CSV file was written successfully"));
