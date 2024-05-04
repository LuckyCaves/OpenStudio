require('dotenv').config();
const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const router = require ('./app/controllers/router.js');

const app = express();
const port = process.env.PORT || 3000;

// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use('/', router);
app.use(express.static('app'));
app.use('app/web/', express.static('web'));

// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));
  

// Connect to MongoDB
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use('/', router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
