/*
    File Name: index.js (in controllers)
    Student Name: Anirudh Babu
    Student ID: 301105250
    Date: 20 October, 2020
*/
let express = require('express');
let router = express.Router();
let passport = require('passport');

//connect and create the user model
let userModel = require('../models/user');
let User = userModel.Model;

//Page display and processing logic
module.exports.displayHomePage = (req, res, next) => {
    res.render('index', 
    {
        title: 'Home',
        displayName: req.user ? req.user.displayName: ''
    });
};
module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', 
    {
        title: 'About Me',
        displayName: req.user ? req.user.displayName: ''
    });
};
module.exports.displayProjectsPage = (req, res, next) => {
    res.render('index', 
    {
        title: 'Projects',
        displayName: req.user ? req.user.displayName: ''
    });
};
module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', 
    {
        title: 'Services',
        displayName: req.user ? req.user.displayName: ''
    });
};
module.exports.displayContactPage = (req, res, next) => {
    res.render('contact', 
    {
        title: 'Contact',
        displayName: req.user ? req.user.displayName: ''
    });
};
module.exports.displayLoginPage = (req, res, next) => {
    //check if user is already logged in
    if(!req.user)
    {
        //display login page
        res.render('auth/login', 
        {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName: ''
        });
    }
    else
    {
        return res.redirect('/');
    }
};
module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => 
    {
        //server error
        if(err)
        {
            console.log(err);
            return next(err);
        }

        //login error
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        else
        {
            req.login(user, (err) => 
            {
                // db server error
                if(err)
                {
                    console.log(err);
                    return next(err);
                }

                return res.redirect('/contact-list');
            });
        }
    })(req, res, next);
};


module.exports.PerformLogout = (req, res, next) => {
  req.logout();
  res.redirect('/');
};