// const loadJSON = require('../carsdata/Cars.json');
// console.log(loadJSON);

// const fs = require('fs');
// // read file sample.json file
// fs.readFile('../carsdata/Cars.json',
//     // callback function that is called when reading file is done
//     function(err, data) {       
//         // json data
//         var jsonData = data;

//         // parse json
//         var jsonParsed = JSON.parse(jsonData);

//          // access elements
//          console.log(jsonParsed[2].Id + '   ' + jsonParsed[2].Name);
//         //  var datacars = jsonParsed;
//     });



// // include file system module
// var fs = require('fs');
 
// // read file sample.json file
// fs.readFile('sample.json',
//     // callback function that is called when reading file is done
//     function(err, data) {       
//         // json data
//         var jsonData = data;
 
//         // parse json
//         var jsonParsed = JSON.parse(jsonData);
 
//         // access elements
//         console.log(jsonParsed.persons[0].name + "'s office phone number is " + jsonParsed.persons[0].phone.office);
//         console.log(jsonParsed.persons[1].name + " is from " + jsonParsed.persons[0].city);
// });


const { readFileSync } = require('fs');

let loadJSON = () => JSON.parse(readFileSync(__dirname + '/../carsdata/Cars.json'));
console.log(loadJSON());

module.exports= { loadJSON }
