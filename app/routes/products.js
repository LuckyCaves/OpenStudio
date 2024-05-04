const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

connectDB();

function connectDB()
{
    let mongoConnection = "mongodb+srv://admin:Tadeo6714@myapp.ycpafeh.mongodb.net/OpenStudio";
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

router.get('/', (req, res) => {

    Product.find({}, (err, products) => {
        if(err) {
            res.status(500).send(err);
        }
        res.status(200).send(products);
    });

});

module.exports = router;
