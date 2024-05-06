const express = require('express');
const path = require('path');
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

const productRouter = require('../routes/products.js');
const artistRouter = require('../routes/artists.js');
const cartRouter = require('../routes/cart.js');
const adminProductRouter = require('../routes/admin_products.js');
const adminArtistRouter = require('../routes/admin_artists.js');
const uploadRouter = require('../routes/upload_image.js');
const accountRoutes = require('../routes/account');
const paymentRouter = require('../routes/payment.js');

router.use('/products', productRouter);
router.use('/artists', artistRouter);
router.use('/carts', cartRouter);
router.use('/admin/products', validateAdmin, adminProductRouter);
router.use('/admin/artists', validateAdmin, adminArtistRouter);
router.use('/upload', uploadRouter);
router.use('/payment', paymentRouter);
router.use(accountRoutes);

function validateAdmin(req, res, next)
{

    if (!req.headers['x-auth'])
        res.status(403).send('Acceso no autorizado, no se cuenta con privilegios de administrador');
    else
        next();
}

router.get('/', (req, res) => res.sendFile(path.resolve(__dirname + "/../web/views/home.html")));
router.get('/home', (req, res) => res.sendFile(path.resolve(__dirname + "/../web/views/home.html")));

router.get('/art_collection', (req, res) => res.sendFile(path.resolve(__dirname + "/../web/views/art_collection.html")));
router.get('/art_collectionA', (req, res) => res.sendFile(path.resolve(__dirname + "/../web/views/art_collectionA.html")));
router.get('/art_collectionB', (req, res) => res.sendFile(path.resolve(__dirname + "/../web/views/art_collectionB.html")));
router.get('/about_us', (req, res) => res.sendFile(path.resolve(__dirname + "/../web/views/about_us.html")));
router.get('/cart', (req, res) => res.sendFile(path.resolve(__dirname + "/../web/views/cart.html")));
router.get('/payment', (req, res) => res.sendFile(path.resolve(__dirname + "/../web/views/payment.html")));
router.get('/edit_profile', (req, res) => res.sendFile(path.resolve(__dirname + "/../web/views/edit_profile.html")));
router.get('/product', (req, res) => res.sendFile(path.resolve(__dirname + "/../web/views/product.html")));
router.get('/profile', (req, res) => res.sendFile(path.resolve(__dirname + "/../web/views/profile.html")));
router.get('/upload', (req, res) => res.sendFile(path.resolve(__dirname + "/../web/views/upload.html")));
router.get('/user', (req, res) => res.sendFile(path.resolve(__dirname + "/../web/views/user.html")));

module.exports = router;