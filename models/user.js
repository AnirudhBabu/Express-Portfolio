let mongoose = require('mongoose');
let Schema = mongoose.Schema; // alias
let Model = mongoose.model; // alias
let passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = Schema({
    username: String,
    password: String,
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