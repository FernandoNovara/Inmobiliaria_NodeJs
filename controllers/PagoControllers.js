const {dbConfig} = require("../database/db_con")

module.exports = {
    
    async show(req,res){

        try {

            const pagosList = await dbConfig.Pago.findAll(
                {
                    
                    include: {
                        association: "Contratos",
                        include:
                        [
                            {
                                association: "Inmuebles",
                                include: 
                                {
                                    association: "propietarios"
                                }
                            },
                            {
                                association: "Inquilinos"
                            }]
                    }
                }
            )

            if(pagosList.length > 0)
            {
                res.render("Pago/Pago",{"allPago": pagosList , MyTitle:"Inicio de Pago"})
            }
            else
            {
                res.redirect("/Pago")
            }
        } catch (error) {
            console.log(error)
            res.redirect("/")//falta mandar mensaje de error y redireccionar
        }
    },

    async viewCreate(req,res)
    {
        const contrato = await dbConfig.Contrato.findAll(
            {
                include: [
                    {
                        association: "Inmuebles",
                        include: 
                        {
                            association: "propietarios"
                        }
                    },
                    {
                        association: "Inquilinos"
                    }
                ]
            }
        )
        res.render("Pago/Create",{"contratos": contrato, MyTitle:"Insertar Pago"})
    },

    async create(req,res)
    {
        try {

            const createPago = await dbConfig.Pago.create(
                {
                    contrato_id: req.body.Contrato,
                    FechaEmision: req.body.FechaEmision,
                    Importe: req.body.Importe
                }    
            )
            if(createPago)
                {
                    res.redirect("/Pago/show")
                }

        } catch (error) {
            console.log(error)
        }
    },

    async showUpdate(req,res)
    {
        try {

            const contrato = await dbConfig.Contrato.findAll(
                {
                    include: [
                        {
                            association: "Inmuebles",
                            include: 
                            {
                                association: "propietarios"
                            }
                        },
                        {
                            association: "Inquilinos"
                        }
                    ]
                }
            )
            
            const Pago = await dbConfig.Pago.findOne(
                {
                    
                    include: {
                        association: "Contratos",
                        include:
                        [
                            {
                                association: "Inmuebles",
                                include: 
                                {
                                    association: "propietarios"
                                }
                            },
                            {
                                association: "Inquilinos"
                            }]
                    },
                    where:
                    {
                        id: req.params.id
                    }
                }
            )
            
            if(Pago)
            {
                res.render("Pago/Update",{ "Pago": Pago, "contratos": contrato })
            }

        } catch (error) {
            console.log(error)
        }
    },

    async update(req,res)
    {
        try {
            
            console.log(req.body)
            const updatePago = await dbConfig.Pago.update(
                {
                    contrato_id: req.body.Contrato,
                    FechaEmision: req.body.FechaEmision,
                    Importe: req.body.Importe
                },
                {
                    where: {
                        id: req.body.id
                    }
                }
            )

            if(updatePago)
            {
                res.redirect("/Pago/show")
            }

        } catch (error) {
            console.log(error)
        }
    },

    async delete(req,res)
    {
        try {

            const deletePago = await dbConfig.Pago.destroy(
                {
                    where:
                    {
                        id: req.query.id
                    }
                }
            )

            if(deletePago)
            {
                res.redirect("/Pago/show")
            }

            
        } catch (error) {
            console.log(error)
        }
    }
    
}