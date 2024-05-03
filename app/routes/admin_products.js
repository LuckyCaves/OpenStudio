const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

function connectDB()
{
    let mongoConnection = "";
    let db = mongoose.connection;

    db.on('connecting', () => {
        console.log('Conectando a la base de datos...');
        console.log(mongoose.connection.readyState);
    });

    db.on('connected', () => {
        console.log('Conectado a la base de datos');
        console.log(mongoose.connection.readyState);
    });

    mongoose.connect(mongoConnection, {useNewUrlParser: true});
}

let productSchema = mongoose.Schema({
    artist: String,
    title: String,
    year: Number,
    description: String,
    method: String,
    dimensions: String,
    price: Number,
    quantity: Number,
    image: String
});

//let Product = mongoose.model('Product', art_products);

router.post('/', (req, res) => {

    let sku = req.body.artist.substring(0, 3) + req.body.title.substring(0, 3) + req.body.price.toString();

    let newProduct = {
        sku: sku,
        artist: req.body.artist,
        title: req.body.title,
        year: req.body.year,
        description: req.body.description,
        method: req.body.method,
        dimensions: req.body.dimensions,
        price: req.body.price,
        quantity: req.body.quantity,
        image: req.body.image
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
    
        let sku = req.params.sku,
            year = req.body.year,
            description = req.body.description,
            price = req.body.price,
            quantity = req.body.quantity,
            image = req.body.image,
            object_to_update = {},
            flag_updated = false;

        if (year !== undefined)
        {
            object_to_update.year = year;
            flag_updated = true;
        }

        if (description !== undefined)
        {
            object_to_update.description = description;
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

        if(flag_updated)
        {
            Product.findbyIdAndUpdate(sky, object_to_update, {new: true}).then((doc) => {
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

    let sku = req.params.sku;

    Product.findByIdAndDelete(sku).then((doc) => {
        res.status(201).send("Producto eliminado con éxito");
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send("No se pudo eliminar el producto");
    });

});
module.exports = router;
