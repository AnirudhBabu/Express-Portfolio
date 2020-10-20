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

let mongoose = require('mongoose');
let DB = require('./db');
const { Strategy } = require('passport');

mongoose.connect(DB.uri, {useNewUrlParser: true, useUnifiedTopology: true});
let dbConnection = mongoose.connection; // alias

dbConnection.on('error', console.error.bind(console, 'connection error:'));
dbConnection.once('open', ()=>{
  console.log('MongoDB Connection OPEN');
});

dbConnection.once('connected', ()=>{
  console.log('MongoDB Connected');
});

dbConnection.on('disconnected', ()=>{
  console.log('MongoDB Disconnected');
});

dbConnection.on('reconnected', ()=>{
  console.log('MongoDB Reconnected');
});

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

//set up express session
app.use(session({
  secret: DB.Secret,
  saveUnintialized: false,
  resave: false
}));

//initialize flash
app.use(flash());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//configure our models
let User = user.Model;
let Contact = contact.Model;

//implement a user authentication strategy
passport.use(User.createStrategy());

//serialization and deserialization
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


/* User.register(new User({
    username: 'jamesHill702',
    email: 'jHill@hills.com',
    displayName: 'James'
  }), 'james702');  */

/* Contact.create(
    {
      contactName: "Katy Peter",
      contactNumber: "4165789999",
      email: "katy@hotmail.com"
    },
    {
      contactName: "Aswin Prasad",
      contactNumber: "+918070654389",
      email: "aswinsp@gmail.com"
    },
    {
      contactName: "Muhammed Khan",
      contactNumber: "6474329999",
      email: "khan@yahoo.com"
    },
    {
      contactName: "Sara Palmer",
      contactNumber: "6475091234",
      email: "saraPlm@gmail.com"
    },
    {
      contactName: "Thomas Hunter",
      contactNumber: "4163528765",
      email: "jHunter@outlook.com"
    },
    {
      contactName: "Joseph Stanlee",
      contactNumber: "6476667777",
      email: "stanlee456@yahoo.com"
    },
    {
      contactName: "Ganga Yash",
      contactNumber: "6475879002",
      email: "gng658@gmail.com"
    }
  ); */

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
