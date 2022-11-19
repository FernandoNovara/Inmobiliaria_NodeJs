const {dbConfig} = require("../database/db_con")

module.exports = {
    
    async show(req,res){

        try {
            const propietariosList = await dbConfig.Propietario.findAll()

            if(propietariosList.length > 0)
            {
                res.render("Propietario",{allPropietario: propietariosList})
            }
            else
            {
                res.json({ msg: "No hay datos."})
            }
        } catch (error) {
            console.log(error)
            res.redirect("/")//falta mandar mensaje de error y redireccionar
        }
    },

    async create(req,res)
    {
        try {
            
            const createPropietario = await dbConfig.Propietario.create(
                {
                    
                }
            )

        } catch (error) {
            console.log(error)
        }
    }
}