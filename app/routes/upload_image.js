const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../web/images/product/')); 
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Change to use SKU
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), (req, res) => {
    console.log('File uploaded:', req.file);

    let fileName = req.file.filename;
    res.send(fileName);
});

module.exports = router;