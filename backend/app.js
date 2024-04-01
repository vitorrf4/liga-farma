const express = require('express');
const app = express();
const cors = require('cors');
const env = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `./environments/.env.${env}`});
const port = process.env.port || 3000;
require('./database/sequelize');

app.use(express.json());
app.use(cors());

app.listen(port, async () => {
    console.log(`Servidor iniciado na porta ${port}`);
    console.log(`Ambiente: ${env}`);
});

// middleware de debug
app.all("*", (req, res, next) => {
    console.log(`${req.method} ${req.url}`);

    if (req.method === "POST" || req.method === "PUT")
        console.log(req.body);

    next();
});

const farmaceuticoRouter = require('./routers/farmaceuticoRouter');
app.use(farmaceuticoRouter);

const farmaciaRouter = require('./routers/farmaciaRouter');
app.use(farmaciaRouter);

const contratoRouter = require('./routers/contratoController');
app.use(contratoRouter);

const vagaRouter = require('./routers/vagaRouter');
app.use(vagaRouter);

const candidaturaRouter = require('./routers/candidaturaRouter');
app.use(candidaturaRouter);