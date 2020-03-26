var express = require('express');
var router = express.Router();
var Cart=require('../models/cart')

var Product = require('../models/product');

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

router.get('/add-to-cart/:id',function(req,res){
  var productId=req.params.id
  var cart=new Cart(req.session.cart? req.session.cart:{})

  Product.findById(productId,function(err,product){
    if(err)
    return res.redirect('/')
    cart.add(product,product.id)
    req.session.cart=cart
    console.log(req.session.cart)
    res.redirect('/')
  })
})

router.get('/reduce/:id',function(req,res){
  var productId=req.params.id
  var cart=new Cart(req.session.cart ? req.session.cart:{})

  cart.reduceByOne(productId)
  req.session.cart=cart
  res.redirect('/shopping-cart')
})

router.get('/remove/:id',function(req,res){
  var productId=req.params.id
  var cart=new Cart(req.session.cart ? req.session.cart:{})

  cart.removeItem(productId)
  req.session.cart=cart
  res.redirect('/shopping-cart')
})
router.get('/shopping-cart', function(req, res, next){
  if(!req.session.cart){
    return res.render('shop/shopping-cart', {products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});
router.get('/buy-now',isLoggedIn,function(req,res){
  if(!req.session.cart){
    return res.redirect('/shopping-cart')
  }
  res.render('shop/buy-now');
})
module.exports = router;
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.session.oldUrl=req.url
  res.redirect('/user/signin');
}
