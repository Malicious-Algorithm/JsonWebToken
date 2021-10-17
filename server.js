//-------------- Requires --------------------------
require('dotenv').config();
const express = require('express');
const app = express();
const conectarDB = require('./DB/Connection'); 
const cors = require('cors');
//-------------------------------------------------


//--------- Conexion puerto ---------------//
const PORT = process.env.PORT || 3000;
//-----------------------------------------//



//--------- Conexion DB Atlas -------------//
conectarDB();
//-----------------------------------------//


//---------- Middlewares -------------------//
var corsOpt = {
    origin: '*', //poner nuestro dominio
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOpt));
//------------------------------------------//

//---------------------  RUTAS  ----------------------------------//
const authRoutes = require('./routes/autenticacion');

app.use('/api/user', authRoutes);
//----------------------------------------------------------------//



//-------------------- Server Escuchando -------------------------//
app.listen(PORT, () => {
    console.log('Server up')
});
//----------------------------------------------------------------//