const { render } = require("pug")
const {dbConfig} = require("../database/db_con")

module.exports = {
    
    async show(req,res){

        const propietariosList = await dbConfig.Propietario.findAll()

        if(propietariosList.length > 0)
        {
            render(propietariosList)
        }
        else
        {
            res.json({ msg: "No hay datos."})
        }
    }
}