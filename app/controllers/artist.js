const mongoose = require('mongoose');

let artistSchema = mongoose.Schema({
    artistNumber: Number,
    artist: String,
    year: Number,
    nationality: String,
    description: String,
    facebook: String,
    instagram: String,
    pinterest: String,

});

let Artist = mongoose.model('artists', artistSchema);

module.exports = Artist;