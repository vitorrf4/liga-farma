const express = require('express');
const app = express()
require('dotenv').config();
const port = process.env.PORT || 3000;
require('./database/sequelize');

app.use(express.json());

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});

// middleware de debug
app.all("*", (req, res, next) => {
    console.log(`${req.method} ${req.url}`);

    if (req.method === "POST" || req.method === "PUT")
        console.log(req.body);

    next();
});

const farmaceuticoRouter = require('./routers/farmaceuticoRouter');
app.use (farmaceuticoRouter);