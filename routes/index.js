var express = require('express');
var Product = require('../models/product');
var router = express.Router();
var csrf = require('csurf');


var csrfProtectionToken = csrf();
router.use(csrfProtectionToken);

/* GET home page. */
router.get('/', function(req, res) {
    Product.find(function(err, docs){
      var productChunk = []; var chunkSize = 3;
      for(var i=0; i < docs.length; i += chunkSize){
        productChunk.push(docs.slice(i, i + chunkSize));
      }
      console.log(productChunk);
      res.render('shop/index', { title: 'Shopping Cart', products: productChunk});
    });
});

router.get('/user/signup',function(req,res){
  res.render('user/signup',{csrfToken:req.csrfToken()})
})

router.post('user/signup',function(req,res){
  res.redirect('/')
})
module.exports = router;