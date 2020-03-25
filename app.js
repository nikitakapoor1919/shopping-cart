var express=require('express')
var path = require('path');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session=require('express-session')
var cookieParser=require('cookie-parser')
var bodyParser=require('body-parser')

var routes = require('./routes/index');
var app=express()

mongoose.connect('mongodb://localhost:27017/shop',{useNewUrlParser: true});


app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extented:true}))
app.use(cookieParser())
app.use(session({secret:'mylongsecret',resave:false,saveUninitialized:false}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.listen(3000,()=>{
    console.log('Server Running on http://localhost:3000')
})