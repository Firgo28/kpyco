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

router.post('/add', function(req, res) {
    var insert = 'INSERT INTO carsdata (brand, model, price) VALUES (?,?,?)'
    db.run(insert, [req.body.dataBrand,req.body.dataType,req.body.dataPrice], (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(200).json({"message":'Berhasil'});
      })
  });

router.get('/list', function(req, res) {
    var sql = "select * from carsdata"
    var params = []
    
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        // res.render('table-view',  { rows:  rows });
        res.status(200).json({"data":rows});
      });
    
    
  });

router.post('/delete', function(req, res) {
    var delsql = "delete from carsdata WHERE id = ?"
    db.run(delsql, [req.body.id], (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(200).json({"message":'Berhasil Hapus !'});
      })
  });


router.post('/edit', function(req, res) {
    var sql = "update carsdata set brand = ?, model = ?, price = ? where id = ?"
    var params = [req.body.dataBrand, req.body.dataType, req.body.dataPrice, req.body.id]

    db.run(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(200).json({"message":'Berhasil Update !'});
      });
    
  });
  
module.exports = router;
