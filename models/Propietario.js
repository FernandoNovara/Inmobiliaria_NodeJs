'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Propietario extends Model 
  {
    static associate(models) 
    {
        Propietario.hasMany(models.Inmueble, { as: "inmuebles",foreignKey: "propietario_id"})
    }
  }

  Propietario.init({
    Nombre: {
      type: DataTypes.STRING(80),
      allowNull: false 
    },
    Apellido: {
      type: DataTypes.STRING(80),
      allowNull: false 
    },
    Dni: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    Telefono: {
      type: DataTypes.STRING(40),
      allowNull: false 
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    }
  },

  {
    sequelize,
    modelName: 'Propietario',
  })

  return Propietario
}