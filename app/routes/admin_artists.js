const express = require('express');
const Artist = require('../controllers/artist.js');

const router = express.Router();

router.post('/', (req, res) => {

    let newArtist = {
        artistNumber: req.body.artistNumber,
        artist: req.body.artist,
        year: req.body.year,
        nationality: req.body.nationality,
        description: req.body.description,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        pinterest: req.body.pinterest
    };

    let artist = Artist(newArtist);

    artist.save().then((doc) => {
        res.status(201).send("Artista guardado con éxito");
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send("No se pudo guardar el artista");
    });

});

router.put('/:artistNumber', (req, res) => {
    
        let year = req.body.year,
            nationality = req.body.nationality,
            description = req.body.description,
            facebook = req.body.facebook,
            instagram = req.body.instagram,
            pinterest = req.body.pinterest,
            object_to_update = {},
            flag_updated = false;

        if (year !== undefined)
        {
            object_to_update.year = year;
            flag_updated = true;
        }

        if (nationality !== undefined)
        {
            object_to_update.nationality = nationality;
            flag_updated = true;
        }

        if (description !== undefined)
        {
            object_to_update.description = description;
            flag_updated = true;
        }

        if (facebook !== undefined)
        {
            object_to_update.facebook = facebook;
            flag_updated = true;
        }

        if (instagram !== undefined)
        {
            object_to_update.instagram = instagram;
            flag_updated = true;
        }

        if (pinterest !== undefined)
        {
            object_to_update.pinterest = pinterest;
            flag_updated = true;
        }

        if(flag_updated)
        {
            Artist.findOneAndUpdate({artistNumber: req.params.artistNumber}, object_to_update, {new: true}).then((doc) => {
                console.log(doc);
                res.send("Artista actualizado con éxito");
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send("No se pudo actualizar el artista");
            });
        }
});

router.delete('/:artistNumber', (req, res) => {

    Artist.findOneAndDelete({artistNumber: req.params.artistNumber}).then((doc) => {
        res.status(201).send("Artista eliminado con éxito");
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send("No se pudo eliminar el artista");
    });

});
module.exports = router;
