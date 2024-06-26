const { DataTypes } = require('sequelize');
const {sequelize} = require('../database/sequelize');

const Farmacia = sequelize.define('Farmacia', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
    descricao: {
        type: DataTypes.STRING,
        allowNull: true
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, { 
    timestamps: false,
    // Configura o sequelize para não retornar o campo senha por padrão
    defaultScope: {
        attributes: { exclude: ['senha'] }
    },
    scopes: {
        comSenha: {attributes: {}}
    }
});

module.exports = Farmacia;