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
            contacts: data.sort((a, b) => {   //collection sorting based on contactName
                if(a.contactName == b.contactName) //if names are the same
                {
                    return 0; //0 indicates an equal position
                }
                else
                {
                    //determining the short name and the long name among the given documents
                    let contactName_short = a.contactName.length <= b.contactName.length ? a.contactName : b.contactName,
                    contactName_long = a.contactName.length <= b.contactName.length ? b.contactName: a.contactName;

                    // looping through each character of each contactName to find the one to be placed before and after
                    for (let index = 0; index < contactName_short.length; index++) {
                        //if characters are equal, comparison moves to the next character
                        if(contactName_short[index] == contactName_long[index])
                        {
                            //if short string ends and still the chars are equal, the short string is placed before the longer string
                            if(index == contactName_short.length - 1)
                            {
                                return contactName_short == a.contactName ? -1 : 1; //negative values indicate the first parameter to be lesser (placed before the other)
                            }
                            continue;
                        }
                        if(contactName_short == a.contactName)
                        {
                            return contactName_short[index] < contactName_long[index] ? -1 : 1; //negative values indicate the first parameter to be lesser (placed before the other)  
                        }
                        else
                        {
                            return contactName_short[index] < contactName_long[index] ? 1 : -1; //positive values indicate the second parameter to be lesser (placed before the other)  
                        }                        
                    }   
                }
                   
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

module.exports.ProcessDeletePage = (req, res, next)=> {
    let id = req.params.id;

    Contact.Model.remove({_id: id}, (err) => {
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