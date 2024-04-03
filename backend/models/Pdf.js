const {sequelize} = require("../database/sequelize");
const {DataTypes} = require("sequelize");
const {Farmaceutico} = require('./Farmaceutico');

const PdfModel = sequelize.define('pdf', {
    filename: DataTypes.STRING,
    data: DataTypes.BLOB,
});

async function createAssociation() {
    PdfModel.belongsTo(Farmaceutico, {
        as: 'usuario'
    });
}

module.exports = {PdfModel, createAssociation};