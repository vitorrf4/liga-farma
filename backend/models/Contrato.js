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
    }
},
{ timestamps: false });

async function createAssociation() {
    const farmacia = require('./Farmacia');
    const {Farmaceutico} = require('./Farmaceutico');
    const {Vaga} = require('./Vaga');
    
    Contrato.belongsTo(farmacia, {
        as: "farmacia",
        foreignKey: {
            allowNull: false
        }
    });
    Contrato.belongsTo(Farmaceutico, {
        as: "farmaceutico",
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