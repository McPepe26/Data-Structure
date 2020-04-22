const express = require('express');
const app = express();

app.use('/api/user/', require('./UserRoutes'));
app.use('/api/group/', require('./GroupRoutes'));
app.use('/api/test/', require('./TestRoutes'));


module.exports = app;