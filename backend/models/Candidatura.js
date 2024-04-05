const { DataTypes } = require('sequelize');
const {sequelize} = require('../database/sequelize');

const Candidatura = sequelize.define('candidatura', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    mensagem: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dataEnviada: {
        type: DataTypes.DATE,
    }
},
{ timestamps: false });

async function createAssociation() {
    const {Farmaceutico} = require('./Farmaceutico');
    const {Vaga} = require('./Vaga');
    const {Contrato} = require('./Contrato');
    
    Candidatura.belongsTo(Vaga, {
        as: "vaga",
        foreignKey: {
            name: 'vagaId',
            allowNull: false
        }
    });
    Candidatura.belongsTo(Farmaceutico, {
        as: "farmaceutico",
        foreignKey: {
            allowNull: false
        }
    });
    Candidatura.hasOne(Contrato, {
        as: 'contrato',
        foreignKey: {
            allowNull: true
        }
    });
}

module.exports = {Candidatura, createAssociation};