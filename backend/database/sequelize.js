const { Sequelize } = require('sequelize');
require("dotenv").config();

const database = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const dialect = process.env.DB_DIALECT;
const env = process.env.NODE_ENV

const uriConexao = `${dialect}://${username}:${password}@${host}/${database}`;
const sequelize = new Sequelize(uriConexao, {
    logging: env == 'development',
    define: {
        freezeTableName: true
    }
});

async function criaAssociacoes() {
    try {
        const {createAssociation: a} = require('../models/Farmaceutico');
        const {createAssociation: b} = require('../models/Pdf');
        const {createAssociation: c} = require('../models/Vaga');
        const {createAssociation: d} = require('../models/Candidatura');
        const {createAssociation: e} = require('../models/Contrato');
        
        await a();
        await b();
        await c();
        await d();
        await e();
    
        await sequelize.sync();
        console.log('Modelos sincronizados.');
    } catch (error) {
        console.error('ERRO NA DATABASE:', error);
        process.exit(1);
    }
}

module.exports = {sequelize, criaAssociacoes};