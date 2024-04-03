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
    }
},
{ timestamps: false });

async function createAssociation() {
    const {Farmaceutico} = require('./Farmaceutico');
    const {Vaga} = require('./Vaga');
    
    Candidatura.belongsTo(Vaga, {
        as: "vaga",
        foreignKey: {
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