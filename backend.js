'use strict'

const PORT = 3000;
const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_URL_NODE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

console.log(process.env.DB_NAME)
const app = express();

app.use(express.static('assets'));

app.get('/', function(req, res) {
    res.sendFile('/index.html');  
});

app.get('/cars' ,function(req, res) {
    connection.query('SELECT type FROM car;', function(error, result) {
        if(error) {
            console.log(error.toString())
        } else {
            res.send(result)
        }
    })
})

app.get('/cars/:type' ,function(req, res) {
    let myType = req.params.type;
    connection.query('SELECT type FROM car WHERE type = ?;', myType, function(error, result) {
        if(error) {
            console.log(error.toString())
        } else {
            res.send(result)
        }
    })
})

connection.connect(function(err){
    if(err){
        console.log(err);
        console.log("Error connecting to Db");
        return;
    }
    console.log("Connection established");
  });
  
  app.listen(PORT, () => console.log(`App is listening on ${PORT}`));