const fs = require("fs");
const { parse } = require("csv-parse");

// public\stylesheets\carsdata\Cars.csv
// fs.createReadStream("../carsdata/Cars.csv")
//   .pipe(parse({ delimiter: ",", from_line: 2 }))
//   .on("data", function (row) {
//     console.log(row[1]);
//   })
//   .on("end", function () {
//     console.log("finished");
//   })
//   .on("error", function (error) {
//     console.log(error.message);
//   });

  async function load(filename) {
    const readStream = fs.createReadStream(filename)
    .pipe(parse({ delimiter: ",", from_line: 2 }))

    const models = [];
  
    for await (const chunk of readStream) {
      models.push(chunk);
    }

    return models;
  }

  module.exports = {
    load,
  };