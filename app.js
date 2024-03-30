require('dotenv').config();
const express = require('express');
const app = express()
const port = process.env.PORT;
require('./databases/db.js');

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});