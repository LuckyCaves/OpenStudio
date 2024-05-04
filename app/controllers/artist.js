const mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    id: Number,
    artist: String,
    year: Number,
    nationality: String,
    description: String,
    facebook: String,
    instagram: String,
    pinterest: String,

});

let Product = mongoose.model('art_products', productSchema);

module.exports = Product;