const { DataTypes } = require('sequelize');
const {sequelize} = require('../database/sequelize');

const Candidatura = sequelize.define('Candidatura', {
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
}

module.exports = {Candidatura, createAssociation};