const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Usuario = sequelize.define('Usuario', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipo: {
            type: DataTypes.ENUM,
            values: ['EMPRESA', 'PESSOA'],
            allowNull: false,
        },},
    { timestamps: false });

Usuario.sync();

module.exports = Usuario;