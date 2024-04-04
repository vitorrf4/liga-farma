const { DataTypes } = require('sequelize');
const {sequelize} = require('../database/sequelize');

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
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    }},
    { 
    timestamps: false,
    // Configura o sequelize para não retornar o campo senha por padrão
    defaultScope: {
        attributes: { exclude: ['senha'] }
    },
    scopes: {
        comSenha: {attributes: {}}
    } 
});

async function createAssociation() {
    const { PdfModel } = require('./Pdf');

    Farmaceutico.belongsTo(PdfModel, {
        as: 'curriculo',
        foreignKey: {
            allowNull: true
        }
    });
}

module.exports = {Farmaceutico, createAssociation};