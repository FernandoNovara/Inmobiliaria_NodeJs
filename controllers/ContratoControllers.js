const {dbConfig} = require("../database/db_con"),
        {transformDates} = require("../helppers/transformDate")


module.exports = {
    
    async show(req,res){

        try {
            
            const contratosList = await dbConfig.Contrato.findAll(
                {
                    include:[
                        {
                            association: "Inmuebles",
                            include: {
                                association: "propietarios"
                            }
                        },
                        {
                            association: "Inquilinos"
                        }
                    ]
                }
            )

            for (val in contratosList)
            {
                val.FechaInicio = transformDates(val.FechaInicio),
                val.FechaFinal = transformDates(val.FechaFinal)
            } 

            if(contratosList.length > 0)
            {
                res.render("Contrato/Contrato",{"allContratos": contratosList , MyTitle:"Inicio de Contrato"})
            }
            else
            {
                res.redirect("/Contrato")
            }
        } catch (error) {
            console.log(error)
            res.redirect("/")//falta mandar mensaje de error y redireccionar
        }
    },

    async viewCreate(req,res)
    {
        const inmuebles = await dbConfig.Inmueble.findAll(
            {
                attributes: ["id","Direccion"]
            }
        )
        const inquilinos = await dbConfig.Inquilino.findAll(
            {
                attributes: ["id","Nombre"]
            }
        )
        
        // console.log(inquilinos)
        res.render("Contrato/Create",{"inmuebles": inmuebles, "inquilinos": inquilinos, MyTitle:"Insertar Contrato"})
    },

    async create(req,res)
    {
        try {
                const createContrato = await dbConfig.Contrato.create(
                {
                    
                    inmueble_id: req.body.Inmueble,
                    inquilino_id: req.body.Inquilino,
                    FechaInicio: req.body.FechaInicio,
                    FechaFinal: req.body.FechaFinal,
                    Monto: req.body.Monto
                }    
            )
            if(createContrato)
                {
                    res.redirect("/Contrato/show")
                }

        } catch (error) {
            console.log(error)
        }
    },

    async showUpdate(req,res)
    {
        try {

            const inmuebles = await dbConfig.Inmueble.findAll(
                {
                    attributes: ["id","Direccion"]
                }
            )
            const inquilinos = await dbConfig.Inquilino.findAll(
                {
                    attributes: ["id","Nombre"]
                }
            )
            
            const contrato = await dbConfig.Contrato.findOne(
                {
                    include:[
                        {
                            association: "Inmuebles",
                            include: {
                                association: "propietarios"
                            }
                        },
                        {
                            association: "Inquilinos"
                        }
                    ],
                    where:
                    {
                        id: req.params.id
                    }
                }
            )
            
            if(contrato)
            {
                res.render("Contrato/Update",{ "Contrato": contrato, "inmuebles": inmuebles, "inquilinos": inquilinos })
            }

        } catch (error) {
            console.log(error)
        }
    },

    async update(req,res)
    {
        try {
    
            const updateContrato = await dbConfig.Contrato.update(
                {
                    inmueble_id: req.body.Inmueble,
                    inquilino_id: req.body.Inquilino,
                    FechaInicio: req.body.FechaInicio,
                    FechaFinal: req.body.FechaFinal,
                    Monto: req.body.Monto
                },
                {
                    where: {
                        id: req.body.id
                    }
                }
            )
            
            if(updateContrato)
            {
                res.redirect("/Contrato/show")
            }

        } catch (error) {
            console.log(error)
        }
    },

    async delete(req,res)
    {
        try {

            const deleteContrato = await dbConfig.Contrato.destroy(
                {
                    where:
                    {
                        id: req.query.id
                    }
                }
            )

            if(deleteContrato)
            {
                res.redirect("/Contrato/show")
            }

            
        } catch (error) {
            console.log(error)
        }
    }
    
}