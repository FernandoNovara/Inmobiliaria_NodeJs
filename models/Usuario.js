'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    
    static associate(models) {
      
    }
  }
  Usuario.init({
    Nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Apellido: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    Clave: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Avatar: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    Rol: {
      type: DataTypes.ENUM("Administrador","Empleado"),
      defaultValue: "Empleado"
    }
  },
  
  {
    sequelize,
    modelName: 'Usuario',
  })

  return Usuario;
}