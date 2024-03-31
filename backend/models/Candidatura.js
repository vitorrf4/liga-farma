const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const farmaceutico = require('./Farmaceutico');
const vaga = require('./Vaga');

const Candidatura = sequelize.define('Candidatura', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        mensagem: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    { timestamps: false });

Candidatura.belongsTo(vaga, {
    as: "vaga",
    foreignKey: {
        allowNull: false
    }
});
Candidatura.belongsTo(farmaceutico, {
    as: "farmaceutico",
    foreignKey: {
        allowNull: false
    }
});
Candidatura.sync(); // Sincroniza o modelo com o banco de dados

module.exports = Candidatura;