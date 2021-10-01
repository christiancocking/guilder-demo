var express = require('express');
var router = express.Router();
const arc = require('../controllers/adrequest.controller');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ad-request', arc.requestAd, function (req, res, next) {
  var templateParams = { 
    title: 'Express', 
    product_id: res.locals.product_id, 
    rendering_data_id: res.locals.rendering_data_id, 
    click_url: res.locals.click_url
  }
  res.render('index', templateParams);
});

module.exports = router;
