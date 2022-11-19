'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Contrato extends Model {

    static associate(models) {
        Contrato.belongsTo(models.Inmueble)
        Contrato.belongsTo(models.Inquilino)
        Contrato.hasMany(models.Pago, {as: "pago_contrato",foreignKey: "contrato_id"})
    }
  }
  Contrato.init({
    FechaIncio: {
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