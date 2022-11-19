'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Inquilino extends Model {

    static associate(models) {
      Inquilino.hasMany(models.Contrato, { as:"contrato_inquilino",foreignKey: "inquilino_id"})
    }
  }
  Inquilino.init({
    Nombre: {
      type: DataTypes.STRING(80),
      allowNull: false 
    },
    Dni: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true
    },
    LugarTrabajo: {
      type: DataTypes.STRING(80),
      allowNull: false 
    },
    Direccion: {
      type: DataTypes.STRING(80),
      allowNull: false 
    },
    Telefono: {
      type: DataTypes.STRING(80),
      allowNull: false 
    },
    Email: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true
    }
  },
  
  {
    sequelize,
    modelName: 'Inquilino',
  })

  return Inquilino
}