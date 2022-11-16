var express = require('express');
var router = express.Router();

/* GET/POST home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Kopy.Co Teams' });
});

/* Coba bikin route*/
router.get('/cars-csv', (req, res) => {
    res.render('cars-csv')
  })

module.exports = router;
