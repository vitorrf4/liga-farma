const { DataTypes } = require('sequelize');
const {sequelize} = require('../database/sequelize');

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
        type: DataTypes.TEXT,
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
    },
    dataPublicada: {
        type: DataTypes.DATE
    }
},
{ timestamps: false });

async function createAssociation() {
    const Farmacia = require('./Farmacia');
    const {Candidatura} = require('./Candidatura');
    
    Vaga.belongsTo(Farmacia, {
        as: "farmacia",
        foreignKey: {
            allowNull: false
        }
    });
    
    Vaga.hasMany(Candidatura, {
        foreignKey: 'vagaId'
    });
}

module.exports = {Vaga, createAssociation};