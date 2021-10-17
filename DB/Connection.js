//-------------- Requires --------------------------
require('dotenv').config();
const mongoose = require('mongoose');
//-------------------------------------------------


const us = process.env.DB_USSER;
const pass = process.env.DB_PASS;
const db_name = process.env.DB_NAME;

const URI = 'mongodb+srv://'+us+':'+pass+'@freecluster.ddnuy.mongodb.net/'+db_name+'?retryWrites=true&w=majority';

const conectarDB = async () => {
    try {
        await mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('db conectada');
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = conectarDB;