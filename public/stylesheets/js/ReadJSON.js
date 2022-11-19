// const loadJSON = require('../carsdata/Cars.json');
// console.log(loadJSON);

const { readFileSync } = require('fs');

// read file sample.json file
readFileSync.readFile('../carsdata/Cars.json',
    // callback function that is called when reading file is done
    function(err, data) {       
        // json data
        var jsonData = data;

        // parse json
        var jsonParsed = JSON.parse(jsonData);

         // access elements
         console.log(jsonParsed.Id[0].Name + jsonParsed.persons[0].phone.office);
         console.log(jsonParsed.Id[1].Name + jsonParsed.persons[0].city);

    });



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



