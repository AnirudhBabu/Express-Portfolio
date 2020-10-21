/*
    File Name: contact.js (in models)
    Student Name: Anirudh Babu
    Student ID: 301105250
    Date: 20 October, 2020
*/
let mongoose = require('mongoose');
let Schema = mongoose.Schema; // alias
let Model = mongoose.model; // alias
let passportLocalMongoose = require('passport-local-mongoose');

let contactSchema = Schema({
    contactName: String,
    contactNumber: String,
    email: String,
    updated: 
    {
        type: Date,
        default: Date.now()
    }
},
{
    collection: 'contacts'
});


//configure options for our User model
let options = ({});

contactSchema.plugin(passportLocalMongoose, options);

module.exports.Model = Model('Contact', contactSchema);
