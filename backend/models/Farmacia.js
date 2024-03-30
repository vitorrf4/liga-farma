const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Farmacia = sequelize.define('Farmacia', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cnpj: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        endereco: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: true,
        }},
    { timestamps: false });

Farmacia.sync(); // Sincroniza o modelo com o banco de dados

module.exports = Farmacia;