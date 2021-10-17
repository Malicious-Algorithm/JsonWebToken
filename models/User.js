//-------------- Requires --------------------------
const mongoose = require('mongoose');
//-------------------------------------------------


const user = new mongoose.Schema({
    nickname:{
        type: String,
        required: true,
        min: 6,
        max: 200
    },
    email:{
        type: String,
        required: true,
        min: 8,
        max: 200
    },
    password:{
        type: String,
        required: true,
        min: 8,
        max: 200
    }
    //le agregamos algo mas?
});

module.exports = User = mongoose.model('User', user);