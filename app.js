var express=require('express')
var path = require('path');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session=require('express-session')
var cookieParser=require('cookie-parser')
var bodyParser=require('body-parser')
var passport=require('passport')
var flash=require('connect-flash')
var expressValidator = require('express-validator');
var MongoStore=require('connect-mongo')(session)


var routes = require('./routes/index');
var UserRoutes = require('./routes/user');
var AdminRoutes = require('./routes/admin');
var app=express()

mongoose.connect('mongodb://localhost:27017/shop',{useNewUrlParser: true});
require('./config/passport')


app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extented:true}))
app.use(expressValidator())
app.use(cookieParser())
app.use(session({secret:'mylongsecret!!!12345',
resave:false,
saveUninitialized:false,
store:new MongoStore({mongooseConnection:mongoose.connection}),
cookie:{maxAge:180*60*1000}
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  res.locals.login=req.isAuthenticated()
  res.locals.session=req.session
  next()
})
app.use('/admin', AdminRoutes);
app.use('/user', UserRoutes);
app.use('/', routes);


app.listen(3000,()=>{
    console.log('Server Running on http://localhost:3000')
})