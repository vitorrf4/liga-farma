const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const farmacia = require('./Farmacia');
const farmaceutico = require('./Farmaceutico');

const Contrato = sequelize.define('Contrato', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dataInicio: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dataFim: {
            type: DataTypes.STRING,
            allowNull: true,
        }},
    { timestamps: false });

Contrato.belongsTo(farmacia, {
    as: "farmaciaId",
    foreignKey: {
        allowNull: false
    }
});
Contrato.belongsTo(farmaceutico, {
    as: "farmaceuticoId",
    foreignKey: {
        allowNull: false
    }
});

Contrato.sync(); // Sincroniza o modelo com o banco de dados

module.exports = Contrato;