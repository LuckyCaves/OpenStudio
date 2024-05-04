const mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    sku: String,
    artist: String,
    title: String,
    year: Number,
    category: String,
    method: String,
    dimensions: String,
    price: Number,
    quantity: Number,
    image: String,
    colection: String
});

let Product = mongoose.model('art_products', productSchema);

module.exports = Product;