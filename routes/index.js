var express = require('express');
var router = express.Router();

/* GET/POST home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Kopy.Co Teams' });
});

/* Coba bikin route*/
router.get('/contact', (req, res) => {
    res.send('Hello World!')
  })

module.exports = router;
