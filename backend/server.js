const express = require('express');
const server = express();
const cors = require('cors');
// decide qual env usar
const env = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `./environments/.env.${env}`});
const port = process.env.port || 3000;
const { createAssociations } = require('./database/sequelize');
const seed = require('./database/seed');

logNoArquivo();

server.use(express.json());
server.use(cors());

server.listen(port, async () => {
    // cria associacoes das entidades
    await createAssociations();
    // inclui valores inicias na database
    await seed.seedTodos();

    // ngrok gera uma URL pública para o servidor 
    if (env === 'production') {
        const ngrok = require('./config/ngrok');
        ngrok.then(r => console.log(`Ngrok iniciado na url ${r.url()}`));
    }
    
    console.log(`Servidor iniciado na porta ${port}`);
    console.log(`Ambiente: ${env}`);
});

// middleware de debug
server.all("*", (req, res, next) => {
    console.log(`${req.method} ${req.url}`);

    if (env == 'development' && (req.method === "POST" || req.method === "PUT"))
        console.log(req.body);

    next();
});

function logNoArquivo() {
    const fs = require('fs');
    const path = require('path');

    const logFilePath = path.join(__dirname, 'log.txt');
    const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

    const originalLog = console.log;
    console.log = function(...args) {
        originalLog(args);
        const message = args.join(' ');
        logStream.write(message + '\n');
        originalLog.apply(console, args);
    };
}

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
