const express = require('express');
const Product = require('../controllers/product.js');

const router = express.Router();

router.post('/', (req, res) => {

    let skuf = req.body.artist.substring(0, 3) + req.body.title.substring(0, 3) + req.body.price.toString();

    let newProduct = {
        sku: skuf,
        artist: req.body.artist,
        title: req.body.title,
        year: req.body.year,
        category: req.body.category,
        method: req.body.method,
        dimensions: req.body.dimensions,
        price: req.body.price,
        quantity: req.body.quantity,
        image: req.body.image,
        colection: req.body.collection
    };

    let product = Product(newProduct);

    product.save().then((doc) => {
        res.status(201).send("Producto guardado con éxito");
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send("No se pudo guardar el producto");
    });

});

router.put('/:sku', (req, res) => {
    
        let category = req.body.category,
            year = req.body.year,
            price = req.body.price,
            quantity = req.body.quantity,
            image = req.body.image,
            colection = req.body.collection,
            object_to_update = {},
            flag_updated = false;

        if (year !== undefined)
        {
            object_to_update.year = year;
            flag_updated = true;
        }

        if (category !== undefined)
        {
            object_to_update.category = category;
            flag_updated = true;
        }

        if (price !== undefined)
        {
            object_to_update.price = price;
            flag_updated = true;
        }

        if (quantity !== undefined)
        {
            object_to_update.quantity = quantity;
            flag_updated = true;
        }

        if (image !== undefined)
        {
            object_to_update.image = image;
            flag_updated = true;
        }

        if (colection !== undefined)
        {
            object_to_update.colection = colection;
            flag_updated = true;
        }

        if(flag_updated)
        {
            Product.findOneAndUpdate({sku: req.params.sku}, object_to_update, {new: true}).then((doc) => {
                console.log(doc);
                res.send("Producto actualizado con éxito");
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send("No se pudo actualizar el producto");
            });
        }
});

router.delete('/:sku', (req, res) => {

    Product.findOneAndDelete({sku: req.params.sku}).then((doc) => {
        res.status(201).send("Producto eliminado con éxito");
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send("No se pudo eliminar el producto");
    });

});
module.exports = router;
