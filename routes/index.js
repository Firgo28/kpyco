const express = require('express');
const router = express.Router();
const csvReader = require('../public/stylesheets/js/ReadCSV')
// const { loadJSON } = require('../public/stylesheets/js/ReadJSON')
var fs           = require('fs');
var xml2js       = require('xml2js');
var parser       = new xml2js.Parser();

//connecting DB
const sqlite3 = require('sqlite3').verbose()
const md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE carsdata (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            brand text, 
            model text,
            price INTEGER
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO carsdata (id, brand, model, price) VALUES (?,?,?,?)'
                db.run(insert, ["101","Honda","Accord","150"])
                db.run(insert, ["106","Volvo","C30","250"])
                db.run(insert, ["110","Tesla","Model","450"])
            }
        });  
    }
});
// Connecting DB

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
                var a = rows.filter((_, i) => i > 0);
                res.render('cars-xml', { rows:  a });
            });
        }
   });
});

router.get('/cars-json', function(req, res, next) {
// read file sample.json file
var jsonfile = __dirname + "/../public/stylesheets/carsdata/Cars.json";
fs.readFile(jsonfile, "utf-8",
    // callback function that is called when reading file is done
    function(err, data) {       
        // json data
        var jsonData = data;

        // parse json
        var jsonParsed = JSON.parse(jsonData);

        // access elements
        //  console.log(jsonParsed[0]);
         var datacars = jsonParsed;
         
         res.render('cars-json', { datacars:  datacars });
    });
});


router.get("/api/users", (req, res, next) => {
    var sql = "select * from user"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

router.post('/add-form', function(req, res) {
    var insert = 'INSERT INTO carsdata (brand, model, price) VALUES (?,?,?)'
    db.run(insert, [req.body.dataBrand,req.body.dataType,req.body.dataPrice], (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
         res.redirect("/view-form")
      })
  });

router.get('/view-form', function(req, res) {
    var sql = "select * from carsdata"
    var params = []
    
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.render('table-view',  { rows:  rows });
      });
    
    
  });

router.get('/delete', function(req, res) {
    var delsql = "delete from carsdata WHERE id = ?"
    
    db.run(delsql, [req.query.id])
    res.redirect("/view-form")
  });

  router.get('/edit', function(req, res) {
    var sql = "select * from carsdata WHERE id = ? LIMIT 1"
    var params = [req.query.id]

    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.render('form-edit',  { data:  row });
      });
    
  });

  router.post('/edit', function(req, res) {
    var sql = "update carsdata set brand = ?, model = ?, price = ? where id = ?"
    var params = [req.body.dataBrand, req.body.dataType, req.body.dataPrice, req.query.id]

    db.run(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.redirect("/view-form")
      });
    
  });
  
router.get('/add-form', function(req, res) {
    res.render('form-add');
  });

module.exports = router;
