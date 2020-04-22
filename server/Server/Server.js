require('./Config/Config');

const express = require('express');
const path = require('path');
const db = require('./Database/db');
const cors = require('cors');

const app = express();

// parse application/json
app.use(express.json({extended: true}));

//public directory
app.use(express.static(path.resolve(__dirname, "../public")));

//Set cors
app.use(cors());

//Global routes
app.use(require('./routes/index'));

//Connect to mongo
db.connect();

//Start server
app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto', process.env.PORT);
})