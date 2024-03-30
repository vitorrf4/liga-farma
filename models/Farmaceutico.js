const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Farmaceutico = sequelize.define('Farmaceutico', {
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
        crf: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        especializacao: {
            type: DataTypes.STRING,
            allowNull: true,
        }},
    { timestamps: false });

Farmaceutico.sync(); // Sincroniza o modelo com o banco de dados

module.exports = Farmaceutico;