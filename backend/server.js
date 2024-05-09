const express = require('express');
const cors = require('cors');
const server = express();
// decide qual env usar
const env = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `./environments/.env.${env}`});
const port = process.env.PORT || 3000;
const { criaAssociacoes } = require('./database/sequelize');
const seed = require('./database/seed');

const logNoArquivo = require('./config/logging');
logNoArquivo();

server.use(express.json());
server.use(cors());

server.listen(port, async () => {
    await criaAssociacoes();
    // inclui valores inicias na database
    await seed.seedTodos();
    
    console.log(`Servidor iniciado na porta ${port}`);
    console.log(`Ambiente: ${env}`);
});

// loga todas as rotas que foram requisitadas
server.all("*", (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// rotas
const auth = require('./routers/authRouter');
server.use(auth);

const pdf = require('./routers/pdfRouter');
server.use(pdf);

const farmaceuticoRouter = require('./routers/farmaceuticoRouter');
server.use(farmaceuticoRouter);

const farmaciaRouter = require('./routers/farmaciaRouter');
server.use(farmaciaRouter);

const vagaRouter = require('./routers/vagaRouter');
server.use(vagaRouter);

const contratoRouter = require('./routers/contratoController');
server.use(contratoRouter);

const candidaturaRouter = require('./routers/candidaturaRouter');
server.use(candidaturaRouter);
