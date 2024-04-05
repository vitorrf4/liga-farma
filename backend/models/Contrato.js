const { DataTypes } = require('sequelize');
const {sequelize} = require('../database/sequelize');

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
    },
    status: {
        type: DataTypes.ENUM,
        values: ['ENVIADO', 'ACEITO', 'FINALIZADO'],
        defaultValue: 'ENVIADO'
    }
},
{ timestamps: false });

async function createAssociation() {
    const Farmacia = require('./Farmacia');
    const {Vaga} = require('./Vaga');
    const {Candidatura} = require('./Candidatura');
    
    Contrato.belongsTo(Candidatura, {
        as: "candidatura",
        foreignKey: {
            allowNull: false
        }
    });
    Contrato.belongsTo(Farmacia, {
        as: "farmacia",
        foreignKey: {
            allowNull: false
        }
    });
    Contrato.belongsTo(Vaga, {
        as: "vaga",
        foreignKey: {
            allowNull: false
        }
    });
    
}

module.exports = {Contrato, createAssociation};