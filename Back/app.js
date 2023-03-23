
require('dotenv').config()//variables de entorno
const express = require('express')
const cors = require('cors')
const path =require('path')
const app = express()
const PORT = process.env.PORT || 3000 //puerto declarado en la variable de entorno
const { dbConnect } = require('./config/mongo') //requiere la conexion
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res)=>{
  res.render('recovery');//conecta con la vista recovery
})

app.get('/', function(req, res){
  res.render("public/fondo")
})

app.use(cors())
app.use(express.json()) //permite envie de datos

app.set("view engine", "ejs"); //usa el motor de plantilla
app.set("views", __dirname + "/views"); //importa la carpeta view para renderizar los archivos d

app.use('/', require('./app/routes')) //ruta de la api

dbConnect()
app.listen(PORT, ()=>{ //Api escuchando
  console.log('api lista por el puerto', PORT)
})
