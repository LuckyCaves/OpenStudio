const express = require('express');
const Product = require('../controllers/product.js');

const router = express.Router();

async function getItems()
{
    const products = await Product.find({});
    return products;
}

router.get('/', (req, res) => {

    if(req.body.page !== undefined)
    {
        let page = req.body.page;
    }

    getItems().then((products) => {
        res.status(200).send(products);
    })
    .catch((err) => {
        res.status(400).send("No se pudieron obtener los productos");
    });

});

router.get('/:field', (req, res) => {

    const value = req.headers['value'];
    const field = req.params.field;

    Product.find({
        [field]: value
    }).
    then(function (docs){
        res.status(200).send(docs);
    }).
    catch((err) => {
        res.status(400).send("No se pudo obtener el producto");
    });

});

module.exports = router;
