const {sequelize} = require("../database/sequelize");
const {DataTypes} = require("sequelize");

const PdfModel = sequelize.define('pdf', {
    filename: DataTypes.STRING,
    data: DataTypes.BLOB,
},
{timestamps: false});

async function createAssociation() {
    const {Farmaceutico} = require('./Farmaceutico');
    
    PdfModel.belongsTo(Farmaceutico, {
        as: 'usuario'
    });
}

module.exports = {PdfModel, createAssociation};