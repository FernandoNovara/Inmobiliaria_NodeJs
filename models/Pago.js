'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Pago extends Model {
    
    static associate(models) {
        Pago.belongsTo(models.Contrato, {as: "Contratos", foreignKey: "contrato_id"})
    }
  }
  Pago.init({
    FechaEmision: {
      type: DataTypes.DATE,
      allowNull: false 
    },
    Importe: {
      type: DataTypes.DOUBLE,
      allowNull: false 
    }
  },
  
  {
    sequelize,
    modelName: 'Pago',
  })

  return Pago;
}