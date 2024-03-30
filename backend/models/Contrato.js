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
    as: "farmacia",
    foreignKey: {
        allowNull: false
    }
});
Contrato.belongsTo(farmaceutico, {
    as: "farmaceutico",
    foreignKey: {
        allowNull: false
    }
});

Contrato.sync(); // Sincroniza o modelo com o banco de dados

module.exports = Contrato;