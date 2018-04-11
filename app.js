const express = require('express');
//
const router = require('./src/router');
const { port } = require('./config');

const app = express();
app.use('/', router);



app.listen(3000, () => {
    console.log(`Server is listening on port: ${port}`);
});
