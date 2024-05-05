const express = require('express');
const fs = require('fs');
const bodyParser = require('express').urlencoded;
const session = require('express-session');
const path = require('path');
const router = require ('./app/controllers/router.js');

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser({ extended: true }));

app.use(express.static('app'));
app.use('app/web/', express.static('web'));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use('/', router);

app.listen(port, () => {
    console.log("Aplicacion de ejemplo corriendo en puerto " + port);
});