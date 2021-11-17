import express from 'express';
import router from './routes/index.js'
import db from './config/db.js'
import dotenv from 'dotenv'

dotenv.config({ path : 'variables.env'})


const app = express();

// conectar a la base de datos

db.authenticate()
    .then( () => console.log('Base de datos conectada!') )
    .catch( error => console.log(error))

    //Definir Puerto
const port = process.env.PORT || 4000;

// habilitar pug -- : template engine

app.set('view engine', 'pug')

// Agregar body parser para leer los datos del formulario

app.use(express.urlencoded({extended : true}))

// Obtener el año actual

app.use( ( req, res, next) => {
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes'

    next();
} )

// 

// definir carpeta publica

app.use(express.static('public'));

// agregar router

app.use('/', router);
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
    console.log(`El Servidor está funcionando en el puerto ${port}`)

})