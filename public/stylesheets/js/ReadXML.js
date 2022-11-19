// var fs = require("fs");

// fs.readFile("../carsdata/Cars.xml", "utf-8", function(data, err) {
//     if (err) console.log(err);
//     console.log(data);

//   });



// const xml2js = require('xml2js');
// const fs = require('fs');


// fs.readFile(__dirname + '/../carsdata/Cars.xml', function(err, data) {
//             if (err) throw new Error(err);

//             const parser = new xml2js.Parser();

//             parser.parseStringPromise(data)
//                 .then(function (res){
//                     console.log(res.root.row);
       
//                 })
//                 .catch(function(err){
//                     console.error(err);
//                 })
//             return data;
//         })



// const xml2js = require('xml2js');
// const fs = require('fs');
// const parser = new xml2js.Parser({ attrkey: "ATTR" });

// // this example reads the file synchronously
// // you can read it asynchronously also
// let xml_string = fs.readFileSync("../carsdata/Cars.xml", "utf8");

// parser.parseString(xml_string, function(error, result) {
//     if(error === null) {
//         console.log(result.root.row);
//     }
//     else {
//         console.log(error);
//     }

    
  
// });

// const fs = require('fs');
// const xml2js = require('xml2js');
// const util = require('util');
// const { parse } = require('path');

// const parser = new xml2js.Parser();

// fs.readFile('../carsdata/Cars.xml', (err, data) => {
//     parser.parseString(data, (err, result) => {
//         console.log(util.inspect(result, false, null, true));
//     });
// });

var fs           = require('fs');
var xml2js       = require('xml2js');

var  parser       = new xml2js.Parser();

    var xmlfile = ('../carsdata/Cars.xml');

        fs.readFile(xmlfile, "utf-8", function (error, text) {
                if (error) {
                    throw error;
                }else {
                    parser.parseString(text, function (err, result) {
                        var rows = [result['root']['row']];
                                        
                        console.log(result['root']['row']  );
                        return rows;
                    });
                }
                
    });