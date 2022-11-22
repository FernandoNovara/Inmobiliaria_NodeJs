'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Contrato extends Model {

    static associate(models) {
        Contrato.belongsTo(models.Inmueble, {as: "Inmuebles", foreignKey: "inmueble_id"})
        Contrato.belongsTo(models.Inquilino, {as: "Inquilinos", foreignKey: "inquilino_id"})
        Contrato.hasMany(models.Pago, {as: "pago_contrato",foreignKey: "contrato_id"})
    }
  }
  Contrato.init({
    FechaInicio: {
        type: DataTypes.DATE,
        allowNull: false 
    },
    FechaFinal: {
      type: DataTypes.DATE,
      allowNull: false 
    },
    Monto: {
      type: DataTypes.DOUBLE,
      allowNull: false 
    }
  },
  
  {
    sequelize,
    modelName: 'Contrato',
  })

  return Contrato
}