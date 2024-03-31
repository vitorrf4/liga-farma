const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const farmacia = require('./Farmacia');

const Vaga = sequelize.define('Vaga', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        salario: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cidade: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantidadeVagas: {
            type: DataTypes.INTEGER,
            default: 1,
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        turno: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    { timestamps: false });

Vaga.belongsTo(farmacia, {
    as: "farmacia",
    foreignKey: {
        allowNull: false
    }
});

Vaga.sync(); // Sincroniza o modelo com o banco de dados

module.exports = Vaga;