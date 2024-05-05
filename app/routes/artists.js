const express = require('express');
const Artist = require('../controllers/artist.js');

const router = express.Router();

async function getItems()
{
    const artists = await Artist.find({});
    return artists;
}

router.get('/', (req, res) => {

    getItems().then((artists) => {
        res.status(200).send(artists);
    })
    .catch((err) => {
        res.status(400).send("No se pudieron obtener los artistas");
    });

});

router.get('/:field', (req, res) => {

    const value = req.headers['value'];
    const field = req.params.field;

    Artist.find({
        [field]: value
    }).
    then(function (docs){
        res.status(200).send(docs);
    }).
    catch((err) => {
        res.status(400).send("No se pudo obtener el artista");
    });

});

module.exports = router;
