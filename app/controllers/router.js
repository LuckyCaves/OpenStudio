const express = require('express');
const path = require('path');

const router = express.Router();

const productRouter = require('../routes/products.js');
const cartRouter = require('../routes/cart.js');
const adminProductRouter = require('../routes/admin_products.js');
const uploadRouter = require('../routes/upload_image.js');

router.use('/products', productRouter);
router.use('/cart', cartRouter);
router.use('/admin/products', validateAdmin, adminProductRouter);
router.use('/upload', uploadRouter);

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
router.get('/about_us', (req, res) => res.sendFile(path.resolve(__dirname + "/../web/views/about_us.html")));
router.get('/cart', (req, res) => res.sendFile(path.resolve(__dirname + "/../web/views/cart.html")));
router.get('/edit_profile', (req, res) => res.sendFile(path.resolve(__dirname + "/../web/views/edit_profile.html")));
router.get('/product', (req, res) => res.sendFile(path.resolve(__dirname + "/../web/views/product.html")));
router.get('/profile', (req, res) => res.sendFile(path.resolve(__dirname + "/../web/views/profile.html")));
router.get('/upload', (req, res) => res.sendFile(path.resolve(__dirname + "/../web/views/upload.html")));
router.get('/user', (req, res) => res.sendFile(path.resolve(__dirname + "/../web/views/user.html")));

module.exports = router;