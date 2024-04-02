const sequelize = require("../database/sequelize");
const {DataTypes} = require("sequelize");
const farmaceutico = require('./Farmaceutico');

const PdfModel = sequelize.define('pdf', {
    filename: DataTypes.STRING,
    data: DataTypes.BLOB,
});

PdfModel.belongsTo(farmaceutico, {
    as: 'usuario'
});

module.exports = PdfModel;