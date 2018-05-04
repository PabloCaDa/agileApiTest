const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:agileadmin@ds115420.mlab.com:15420/agileshop');

var USERschema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'This field can not be empty'],
        minlength: [4,'The username must have minimum 5 characters'],
        maxlength: [20, 'The username must have maximum 20 characters'],
        unique:true
    },
    name: {
        type: String,
        required: [true, 'This field can not be empty']
    },
    surname: {
        type: String,
        required: [true, 'This field can not be empty']
    },
    password:{
        type: String,
        required:[true, 'This field can not be empty']

    },
    admin:{
        type: Boolean,
        required: true
    }
    
},
{versionKey: false});

var USER = mongoose.model('users', USERschema);

module.exports = USER;