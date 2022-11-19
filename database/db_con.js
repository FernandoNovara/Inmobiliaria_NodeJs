const Sequelize = require('sequelize')

class Connection{ 
    database = require('../config/config')

    dbConfig(){
        const connection = { }
        
        connection.init = new Sequelize(
            this.database.database,
            this.database.username,
            this.database.password,
            {
                host: this.database.host,
                port: this.database.dbport,
                dialect: this.database.dialect,

                define: {
                    // don't add the timestamp attributes ( updatedAt, createdAt)
                    timestamps: false,

                    // don't delete database entries but set the newly added attribute deletedAt
                    // to the current date (when deletion was done). paranoid will only work if
                    // timestamps are enabled
                    paranoid: true,

                    // don't use comelcase for automatically added attributes but underscore style
                    // so updatedAt will be updated_at
                    underscored: true,

                    // disable the modification of tablenames; By default, sequelize will automatically
                    // transform all passed model names (first parameter of define) into plural.
                    // if you don't want that, set the following
                    freezeTableName: true
                }
            }
        )

        const { DataTypes } = require('sequelize')

        //vinculamos los modelos a la base de datos
        connection.Propietario = require("../models/Propietario")(connection.init,DataTypes)
        connection.Inmueble = require("../models/Inmueble")(connection.init,DataTypes)
        connection.Inquilino = require("../models/Inquilino")(connection.init,DataTypes)
        connection.Contrato = require("../models/Contrato")(connection.init,DataTypes)
        connection.Pago = require("../models/Pago")(connection.init,DataTypes)
        connection.Usuario = require("../models/Usuario")(connection.init,DataTypes)


        //asociar los modelos
        connection.Propietario.associate(connection)
        connection.Inmueble.associate(connection)
        connection.Contrato.associate(connection)
        connection.Inquilino.associate(connection)
        connection.Pago.associate(connection)
        
        
        return connection
    }
    
    async con(){
    
        try{
            await this.dbConfig().init.authenticate()
            // await this.dbConfig().init.sync({force:true})
            console.log('Conectado a la base de datos.')
        }
        catch(ex)
        {
            console.log('Error al conectar a la base de datos: ',ex)
        }
    }
    
}

const connection = new Connection(),
        dbConfig = new Connection().dbConfig()

module.exports = {connection,dbConfig}