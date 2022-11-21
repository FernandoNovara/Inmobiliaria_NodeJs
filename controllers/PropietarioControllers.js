const {dbConfig} = require("../database/db_con"),
{ body, validationResult } = require('express-validator')

module.exports = {
    
    async show(req,res){

        try {

            const propietariosList = await dbConfig.Propietario.findAll()

            if(propietariosList.length > 0)
            {
                res.render("Propietario/Propietario",{allPropietario: propietariosList , MyTitle:"Inicio de Propietario"})
            }
            else
            {
                res.redirect("/Propietario")
            }
        } catch (error) {
            console.log(error)
            res.redirect("/")//falta mandar mensaje de error y redireccionar
        }
    },

    async create(req,res)
    {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                if(errors.array()[0].param == "Nombre")
                {
                    return res.render("Propietario/Create", { "errorNombre": true})
                }
            }

            const createPropietario = await dbConfig.Propietario.create(
                {
                    Nombre: req.body.Nombre,
                    Apellido: req.body.Apellido,
                    Dni: req.body.Dni,
                    Telefono: req.body.Telefono,
                    Email: req.body.Email
                }    
            )

            if(createPropietario)
                {
                    res.redirect("/Propietario/show")
                }

        } catch (error) {
            console.log(error)
        }
    },

    async showUpdate(req,res)
    {
        try {
            
            const propietario = await dbConfig.Propietario.findOne(
                {
                    where:
                    {
                        id: req.params.id
                    }
                }
            )

            if(propietario)
            {
                res.render("Propietario/Update",{ "Propietario": propietario })
            }

        } catch (error) {
            console.log(error)
        }
    },

    async update(req,res)
    {
        try {
            
            const updatePropietario = await dbConfig.Propietario.update(
                {
                    Nombre: req.body.Nombre,
                    Apellido: req.body.Apellido,
                    Dni: req.body.Dni,
                    Telefono: req.body.Telefono,
                    Email: req.body.Email
                },
                {
                    where: {
                        id: req.body.id
                    }
                }
            )

            if(updatePropietario)
            {
                res.redirect("/Propietario/show")
            }

        } catch (error) {
            console.log(error)
        }
    },

    async delete(req,res)
    {
        try {

            const deletePropietario = await dbConfig.Propietario.destroy(
                {
                    where:
                    {
                        id: req.query.id
                    }
                }
            )

            if(deletePropietario)
            {
                res.redirect("/Propietario/show")
            }

            
        } catch (error) {
            console.log(error)
        }
    }
    
}