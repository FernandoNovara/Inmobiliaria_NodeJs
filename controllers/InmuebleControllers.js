const {dbConfig} = require("../database/db_con")

module.exports = {
    
    async show(req,res){

        try {

            const inmueblesList = await dbConfig.Inmueble.findAll(
                {
                    include:{
                        association: "propietarios"
                    }
                }
            )

            if(inmueblesList.length > 0)
            {
                res.render("Inmueble/Inmueble",{"allInmueble": inmueblesList , MyTitle:"Inicio de Inmueble"})
            }
            else
            {
                res.redirect("/Inmueble")
            }
        } catch (error) {
            console.log(error)
            res.redirect("/")//falta mandar mensaje de error y redireccionar
        }
    },

    async viewCreate(req,res)
    {
        const propietario = await dbConfig.Propietario.findAll(
            {
                attributes: ["id","Nombre","Apellido"]
            }
        )

        res.render("Inmueble/Create",{"propietarios": propietario, MyTitle:"Insertar Inmueble"})
    },

    async create(req,res)
    {
        try {

            const createInmueble = await dbConfig.Inmueble.create(
                {
                    
                    propietario_id: req.body.Propietario,
                    Direccion: req.body.Direccion,
                    Uso: req.body.Uso,
                    Tipo: req.body.Tipo,
                    Ambientes: req.body.Ambientes,
                    Precio: req.body.Precio,
                    Estado: req.body.Estado
                }    
            )
            if(createInmueble)
                {
                    res.redirect("/Inmueble/show")
                }

        } catch (error) {
            console.log(error)
        }
    },

    async showUpdate(req,res)
    {
        try {

            const propietario = await dbConfig.Propietario.findAll(
                {
                    attributes: ["id","Nombre","Apellido"]
                }
            )
            
            const inmueble = await dbConfig.Inmueble.findOne(
                {
                    include:{
                        association: "propietarios"
                    },
                    where:
                    {
                        id: req.params.id
                    }
                }
            )
            
            if(inmueble)
            {
                res.render("Inmueble/Update",{ "Inmueble": inmueble, "propietarios": propietario })
            }

        } catch (error) {
            console.log(error)
        }
    },

    async update(req,res)
    {
        try {
            
            console.log(req.body)
            const updateInmueble = await dbConfig.Inmueble.update(
                {
                    propietario_id: req.body.Propietario,
                    Direccion: req.body.Direccion,
                    Uso: req.body.Uso,
                    Tipo: req.body.Tipo,
                    Ambientes: req.body.Ambientes,
                    Precio: req.body.Precio,
                    Estado: req.body.Estado
                },
                {
                    where: {
                        id: req.body.id
                    }
                }
            )

            if(updateInmueble)
            {
                res.redirect("/Inmueble/show")
            }

        } catch (error) {
            console.log(error)
        }
    },

    async delete(req,res)
    {
        try {

            const deleteInmueble = await dbConfig.Inmueble.destroy(
                {
                    where:
                    {
                        id: req.query.id
                    }
                }
            )

            if(deleteInmueble)
            {
                res.redirect("/Inmueble/show")
            }

            
        } catch (error) {
            console.log(error)
        }
    }
    
}