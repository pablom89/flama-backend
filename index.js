const express = require('express');
const path = require ('path');
require('dotenv').config();
const { dbConnection } = require('./database/config')
const cors = require('cors');





// SERVIDOR

const app = express();

// CONEXION A DB


dbConnection();


// CORS

app.use(cors())

// DIRECTORIO PÙBLICO 

app.use( express.static('public'));

// LECTURA Y PARSEO DEL BODY

app.use( express.json() );


// RUTAS / ENDPOINTS



app.use('/api/auth', require('./routes/auth'));

app.use('/api/toppings', require('./routes/toppings'))

app.use('/api/pizzas', require('./routes/pizzas'))

app.use('/api/comandas', require('./routes/comandas'))
/* 
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
}); */

// ESCUCHAR PETICIONES 

app.listen(process.env.PORT, () => {

    console.log( `servidor corriendo en puerto ${ process.env.PORT }`)

})
