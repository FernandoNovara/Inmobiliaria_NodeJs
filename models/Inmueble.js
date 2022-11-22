'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Inmueble extends Model {

    static associate(models) {
      Inmueble.belongsTo(models.Propietario, {as: "propietarios", foreignKey: "propietario_id"})
      Inmueble.hasMany(models.Contrato, { as: "contrato_inmueble" , foreignKey: "inmueble_id"})
    }
  }

  Inmueble.init({
    Direccion: {
      type: DataTypes.STRING(80),
      allowNull: false 
    },
    Uso: {
      type: DataTypes.ENUM("Comercial","Residencial"),
      defaultValue: "Comercial"
    },
    Tipo: {
      type: DataTypes.ENUM("Casa","Departamento","Deposito","Local"),
      defaultValue: "Local"
    },
    Ambientes: {
      type: DataTypes.STRING(80),
      allowNull: false 
    },
    Precio: {
      type: DataTypes.DOUBLE,
      allowNull: false 
    },
    Estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false 
    }
  }, 
  
  {
    sequelize,
    modelName: 'Inmueble',
  })

  return Inmueble
}