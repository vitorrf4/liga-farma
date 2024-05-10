const express = require('express');
const cors = require('cors');
const server = express();
// decide qual env usar
const env = process.env.NODE_ENV || (process.env.USER == 'ligafarma') ? 'production' : 'development';
require('dotenv').config({ path: `./environments/.env.${env}`});
const port = process.env.PORT;
const { criaAssociacoes } = require('./database/sequelize');
const seed = require('./database/seed');

const logNoArquivo = require('./config/logging');
if (env == 'production')
    logNoArquivo();

server.use(express.json());
server.use(cors());

server.listen(port, async () => {
    await criaAssociacoes();

    if (env == 'development') {
        // inclui valores inicias na database
        await seed.seedTodos();
    }

    console.log(`Servidor iniciado na porta ${port}`);
    console.log(`Ambiente: ${env}`);
});

// loga todas as rotas que foram requisitadas
server.all("*", (req, _, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// rotas
const auth = require('./routers/authRouter');
server.use('/auth', auth);

const pdf = require('./routers/pdfRouter');
server.use('/pdf', pdf);

const farmaceuticoRouter = require('./routers/farmaceuticoRouter');
server.use('/farmaceutico', farmaceuticoRouter);

const farmaciaRouter = require('./routers/farmaciaRouter');
server.use('/farmacia', farmaciaRouter);

const vagaRouter = require('./routers/vagaRouter');
server.use('/vaga', vagaRouter);

const contratoRouter = require('./routers/contratoController');
server.use('/contrato', contratoRouter);

const candidaturaRouter = require('./routers/candidaturaRouter');
server.use('/candidatura', candidaturaRouter);

server.use((_, res) => {
    res.status(404).send('Pagina nao encontrada');
});