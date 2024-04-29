const express = require('express');
const fs = require('fs');
const router = require ('./app/controllers/router.js');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', router);
app.use(express.static('app'));
app.use('app/web/', express.static('web'));

app.listen(port, () => {
    console.log("Aplicacion de ejemplo corriendo en puerto " + port);
});