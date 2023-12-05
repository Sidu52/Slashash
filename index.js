require('dotenv').config();
const express = require('express');
const db = require('./config/mysql');
const createTable = require('./createTable/createTable');
const dotenve = require('dotenv');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4000;

//BodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }));
//Set View engine
app.set('view engine', 'ejs');
// Serve static files (Bootstrap CSS)
app.use(express.static('public'));

// Set routes
app.use('/', require('./routes'));

//Set Server
app.listen(port, (err) => {
    if (err) {
        console.log('Error in server run:', err);
        return;
    }
    console.log('Server run successful for port', port);
});