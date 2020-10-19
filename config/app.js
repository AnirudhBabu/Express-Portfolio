/*
    File Name: app.js (In config)
    Student Name: Anirudh Babu
    Student ID: 301105250
    Date: 9 October, 2020
*/
//installed third-party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//modules for authentication 
let session = require('express-session');
let passport = require('passport');

//authentication strategy
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy; //alias for local strategy

//authentication message display
let flash = require('connect-flash');

//connect to user model
let user = require('../models/user');

//connect to contact model
let contact = require('../models/contact');

let indexRouter = require('../routes/index');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

app.use('/', indexRouter);

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
  res.render('error', { title: 'Error' });
});

module.exports = app;
