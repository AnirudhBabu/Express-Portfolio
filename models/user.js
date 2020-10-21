/*
    File Name: user.js (in models)
    Student Name: Anirudh Babu
    Student ID: 301105250
    Date: 20 October, 2020
*/
let mongoose = require('mongoose');
let Schema = mongoose.Schema; // alias
let Model = mongoose.model; // alias
let passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = Schema({
    username: String,
    email: String,
    displayName: String,
    created: 
    {
        type: Date,
        default: Date.now()
    }
},
{
    collection: 'users'
});

//configure options for our User model
let options = ({missingPasswordError: 'wrong / missing password'});

UserSchema.plugin(passportLocalMongoose, options);

module.exports.Model = Model('User', UserSchema);