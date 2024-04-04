const { Sequelize } = require('sequelize');
require("dotenv").config();

const database = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const dialect = process.env.DB_DIALECT;

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect,
    define: {
        freezeTableName: true
    }
});

async function createAssociations() {
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
    
        await sequelize.sync({ force: true });
        console.log('Modelos sincronizados.');
    } catch (error) {
        console.error('Erro ao sincronizar:', error);
    }
}

module.exports = {sequelize, createAssociations};