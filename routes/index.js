var express = require('express');
var router = express.Router();
const arc = require('../controllers/adrequest.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/ad-request', arc.requestAd ,function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
