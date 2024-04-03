const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
// const pdf = require('./Pdf');

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
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: true,
        }},
    { timestamps: false });

// Farmaceutico.hasOne(pdf, {
//     as: 'curriculo',
//     foreignKey: {
//         allowNull: true
//     }
// });   

Farmaceutico.sync();

module.exports = Farmaceutico;