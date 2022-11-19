const express = require('express');
const router = express.Router();
const csvReader = require('../public/stylesheets/js/ReadCSV')
var fs           = require('fs');
var xml2js       = require('xml2js');
var parser       = new xml2js.Parser();



/* GET/POST home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Kopy.Co Teams' });
});

/* Coba bikin route*/
router.get('/contact', (req, res) => {
    res.send('Hello World!')
  })

//Asyncronous data to read CSV
router.get('/cars-csv', async function(req, res, next) {
    const load = await csvReader.load('./public/stylesheets/carsdata/Cars.csv')
    const models = [];

    // 
    load.forEach((value, index, array) => {
        models.push({
            nomor: value[0],
            merk: value[1],
            seri: value[2]
        });
    })

    res.render('cars-csv', { items: models })
  })


router.get('/cars-xml', function(req, res, next) {
    var xmlfile = __dirname + "/../public/stylesheets/carsdata/Cars.xml";
    fs.readFile(xmlfile, "utf-8", function (error, text) {
        if (error) {
            throw error;
        }else {
            parser.parseString(text, function (err, result) {
                var rows = result['root']['row'];
                res.render('cars-xml', { rows:  rows });
            });
        }
   });
});

// router.get('/cars-josn', function(req, res, next) {
//     const { readFileSync } = require('fs');
//     const data = readFileSync('../carsdata/Cars.json');



// });

module.exports = router;
