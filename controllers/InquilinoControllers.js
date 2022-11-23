const {dbConfig} = require("../database/db_con")
const { details } = require("./PropietarioControllers")

module.exports = {
    
    async show(req,res){

        try {

            const inquilinoList = await dbConfig.Inquilino.findAll()

            if(inquilinoList.length > 0)
            {
                res.render("Inquilino/Inquilino",{allInquilino: inquilinoList , MyTitle:"Inicio de Inquilino"})
            }
            else
            {
                res.redirect("/Inquilino")
            }
        } catch (error) {
            console.log(error)
            res.redirect("/")//falta mandar mensaje de error y redireccionar
        }
    },

    async create(req,res)
    {
        try {

            const createInquilino = await dbConfig.Inquilino.create(
                {
                    Nombre: req.body.Nombre,
                    Dni: req.body.Dni,
                    LugarTrabajo: req.body.LugarTrabajo,
                    Direccion: req.body.Direccion,
                    Telefono: req.body.Telefono,
                    Email: req.body.Email
                }    
            )

            if(createInquilino)
                {
                    res.redirect("/Inquilino/show")
                }

        } catch (error) {
            console.log(error)
        }
    },

    async showUpdate(req,res)
    {
        try {
            
            const inquilino = await dbConfig.Inquilino.findOne(
                {
                    where:
                    {
                        id: req.params.id
                    }
                }
            )

            if(inquilino)
            {
                res.render("Inquilino/Update",{ "Inquilino": inquilino })
            }

        } catch (error) {
            console.log(error)
        }
    },

    async update(req,res)
    {
        try {
            
            const updateInquilino = await dbConfig.Inquilino.update(
                {
                    Nombre: req.body.Nombre,
                    Dni: req.body.Dni,
                    LugarTrabajo: req.body.LugarTrabajo,
                    Direccion: req.body.Direccion,
                    Telefono: req.body.Telefono,
                    Email: req.body.Email
                },
                {
                    where: {
                        id: req.body.id
                    }
                }
            )

            if(updateInquilino)
            {
                res.redirect("/Inquilino/show")
            }

        } catch (error) {
            console.log(error)
        }
    },

    async details(req,res)
    {
        try {
            
            const inquilino = await dbConfig.Inquilino.findOne(
                {
                    where:
                    {
                        id: req.params.id
                    }
                }
            )

            if(inquilino)
            {
                res.render("Inquilino/Details",{ "Inquilino": inquilino })
            }

        } catch (error) {
            console.log(error)
        }
    },

    async delete(req,res)
    {
        try {

            const deleteInquilino = await dbConfig.Inquilino.destroy(
                {
                    where:
                    {
                        id: req.query.id
                    }
                }
            )

            if(deleteInquilino)
            {
                res.redirect("/Inquilino/show")
            }

            
        } catch (error) {
            console.log(error)
        }
    }
    
}