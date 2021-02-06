var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('./config/passport');


var mongoose = require('mongoose')
var mongoDB = 'mongodb://localhost/proyectoveg';

mongoose.connect(mongoDB, {useNewUrlParser : true})
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'))

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var usuariosApiRouter = require('./routes/api/usuariosApi');
var tokenRouter = require('./routes/token')
var sessionRouter = require('./routes/session')
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/api/usuarios', usuariosApiRouter);
app.use('/token', tokenRouter)
app.use('/login', sessionRouter)
// app.get('/login', (req,res,next)=>{
//   res.render('session/login')
// })

// app.post('/login', (req,res,next)=>{
//   passport.authenticate('local', (err,usuario,info)=>{
//     if(err) return next(err);
//     if(!usuario) return res.render('session/login', {info})
//     req.logIn(usuario, (err)=>{
//       if (err) return next(err), console.log(err.message);
//       return res.redirect('/admin')
//     })
//   })(req,res,next)
//   })


app.get('/admin', (req,res)=>{
  
  res.render('administrator/admin')
})

app.get('/forgotpassword', (req,res,next)=>{
  res.render('session/login')
})
app.post('/forgotpassword', (req,res,next)=>{
  
})
app.get('/logout', (req,res,next)=>{
  req.logout();
  res.redirect('/')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
