let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let Contact = require('../models/contact');

module.exports.displayContactList = (req, res, next) => {
    Contact.Model.find( (err, data) => {
        if(err)
        {
          console.error(err);
          res.end();
        }
    
        res.render('secure/contact-list', 
        {
            title: 'Contact List',
            contacts: data,
            displayName: req.user ? req.user.displayName: ''
        });
    })
};

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    // pass id to the db 
    Contact.Model.findById(id, (err, ContactToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        // show the edit view
        res.render('secure/edit', 
        {
            title: 'Edit Contact',
            contact: ContactToEdit,
            displayName: req.user ? req.user.displayName: ''
        });
    });
};

module.exports.processEditPage = (req, res, next)=> {
    let id = req.params.id;

     // instantiate a new object of type Component
     /* let updatedComponent = Component.Model({
        "_id": id, 
        "partID":req.body.partID,
        "name": req.body.name,
        "description": req.body.description,
        "price": req.body.price
    }); */

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

    Component.Model.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        res.redirect('/component-list');
    });
};
