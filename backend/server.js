const express = require('express');
const server = express();
const cors = require('cors');
const env = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `./environments/.env.${env}`});
const port = process.env.port || 3000;
require('./database/sequelize');

server.use(express.json());
server.use(cors());

server.listen(port, async () => {
    console.log(`Servidor iniciado na porta ${port}`);
    console.log(`Ambiente: ${env}`);
});

// middleware de debug
server.all("*", (req, res, next) => {
    console.log(`${req.method} ${req.url}`);

    if (req.method === "POST" || req.method === "PUT")
        console.log(req.body);

    next();
});

const farmaceuticoRouter = require('./routers/farmaceuticoRouter');
server.use(farmaceuticoRouter);

const farmaciaRouter = require('./routers/farmaciaRouter');
server.use(farmaciaRouter);

const contratoRouter = require('./routers/contratoController');
server.use(contratoRouter);

const vagaRouter = require('./routers/vagaRouter');
server.use(vagaRouter);

const candidaturaRouter = require('./routers/candidaturaRouter');
server.use(candidaturaRouter);