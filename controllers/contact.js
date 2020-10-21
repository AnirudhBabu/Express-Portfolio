/*
    File Name: contact.js (in routes)
    Student Name: Anirudh Babu
    Student ID: 301105250
    Date: 20 October, 2020
*/
let express = require('express');
let router = express.Router();

//connect and create the Contact Model
let mongoose = require('mongoose');
let Contact = require('../models/contact');

//Page display and processing logic
module.exports.displayContactList = (req, res, next) => {
    Contact.Model.find( (err, data) => {
        // server error
        if(err)
        {
          console.error(err);
          res.end();
        }
        //if no error
        res.render('secure/contact-list', 
        {
            title: 'Contact List',
            contacts: data.sort((a, b) => {   
                let sortedNames = [a.contactName, b.contactName].sort();
                return sortedNames[0] == a.contactName ? -1 : 1;
            }),
            displayName: req.user ? req.user.displayName: ''
        });
    })
};

module.exports.displayUpdatePage = (req, res, next) => {
    let id = req.params.id;

    // pass id to the db 
    Contact.Model.findById(id, (err, ContactToUpdate) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        // show the update view
        res.render('secure/update', 
        {
            title: 'Update Contact',
            contact: ContactToUpdate,
            id: id,
            displayName: req.user ? req.user.displayName: ''
        });
    });
};

module.exports.processUpdatePage = (req, res, next)=> {
    let id = req.params.id;

    Contact.Model.updateOne({_id: id},
    {
        "_id": id,
        "contactName": req.body.contactName,
        "contactNumber": req.body.contactNumber,
        "email": req.body.email,
        "updated": Date.now()   
    }, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        res.redirect('/contact-list');
    });
};

module.exports.processDeletePage = (req, res, next)=> {
    let id = req.params.id;

    Contact.Model.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        res.redirect('/contact-list');
    });
}