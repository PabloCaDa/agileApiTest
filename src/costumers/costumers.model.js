const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:agileadmin@ds115420.mlab.com:15420/agileshop');

var COSTUMERschema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'This field can not be empty']
    },
    surname: {
        type: String,
        required: [true, 'This field can not be empty']
    },
    photoURL:{
        type: String
        

    },
    createdBy:{
        type: String,
        required:true
    },
    lastModified: {
        type: String,
        required:true
    }
    
},
{versionKey: false});

var COSTUMER = mongoose.model('costumer', COSTUMERschema);

module.exports = COSTUMER;