'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const Route = require('./routes');
app.use(require("body-parser").json({ limit: `50mb` }));
app.use(require("body-parser").urlencoded({ limit: `50mb`, extended: true }));


/*******************************
 *** For handling CORS Error ***
 *******************************/
app.all('/*', (REQUEST, RESPONSE, NEXT) => {
    RESPONSE.header('Access-Control-Allow-Origin', '*');
    RESPONSE.header('Access-Control-Allow-Headers','Content-Type, api_key, Authorization, x-requested-with, Total-Count, Total-Pages, Error-Message');
    RESPONSE.header('Access-Control-Allow-Methods','POST, GET, DELETE, PUT, OPTIONS');
    RESPONSE.header('Access-Control-Max-Age', 1800);
    NEXT();
});

new Route(app);

process.on('unhandledRejection', exception => { throw exception });
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}...`);
});