const {dbConfig} = require("../database/db_con"),
    fs = require("fs"),
    { minetypes } = require("../helppers/multerConfig")

module.exports = {
    
    async show(req,res){

        try {

            const usuariosList = await dbConfig.Usuario.findAll()

            if(usuariosList.length > 0)
            {
                res.render("Usuario/Usuario",{usuario: req.Usuario, allUsuario: usuariosList , MyTitle:"Inicio de Usuario"})
            }
            else
            {
                res.redirect("/Usuario")
            }
        } catch (error) {
            console.log(error)
            res.redirect("/")//falta mandar mensaje de error y redireccionar
        }
    },

    async create(req,res)
    {
        try {

            const createUsuario = await dbConfig.Usuario.create(
                {
                    Nombre: req.body.Nombre,
                    Apellido: req.body.Apellido,
                    Email: req.body.Email,
                    Clave: req.body.Clave,
                    Rol: req.body.Rol,
                    Avatar: req.file.filename
                }    
            )

            if(createUsuario)
                {
                    res.redirect("/Usuario/show")
                }

        } catch (error) {
            console.log(error)
        }
    },

    async showUpdate(req,res)
    {
        try {
            
            const usuario = await dbConfig.Usuario.findOne(
                {
                    where:
                    {
                        id: req.params.id
                    }
                }
            )

            if(usuario)
            {
                res.render("Usuario/Update",{usuario: req.Usuario, "Usuario": usuario })
            }

        } catch (error) {
            console.log(error)
        }
    },

    async details(req,res)
    {
        try {
            
            const usuario = await dbConfig.Usuario.findOne(
                {
                    where:
                    {
                        id: req.params.id
                    }
                }
            )

            if(usuario)
            {
                res.render("Usuario/Details",{usuario: req.Usuario, "Usuario": usuario })
            }

        } catch (error) {
            console.log(error)
        }
    },

    async update(req,res)
    {
        try {
            const avatarUsuario = await dbConfig.Usuario.findOne({
                attibutes: ["Avatar"],
                where:
                {
                    id: req.body.id
                }
            })

            fs.unlinkSync(path.join(__dirname, `../storage/${avatarUsuario.Avatar}`))
            
            const updateUsuario = await dbConfig.Usuario.update(
                {
                    Nombre: req.body.Nombre,
                    Apellido: req.body.Apellido,
                    Email: req.body.Email,
                    Clave: req.body.Clave,
                    Avatar: req.file.filename,
                    Rol: req.body.Rol
                },
                {
                    where: {
                        id: req.body.id
                    }
                }
            )

            if(updateUsuario)
            {
                res.redirect("/Usuario/show")
            }

        } catch (error) {
            console.log(error)
        }
    },

    async delete(req,res)
    {
        try {
            const avatarUsuario = await dbConfig.Usuario.findOne({
                attibutes: ["Avatar"],
                where:
                {
                    id: req.query.id
                }
            })

            fs.unlinkSync(path.join(__dirname, `../storage/${avatarUsuario.Avatar}`))

            const deleteUsuario = await dbConfig.Usuario.destroy(
                {
                    where:
                    {
                        id: req.query.id
                    }
                }
            )

            if(deleteUsuario)
            {
                res.redirect("/Usuario/show")
            }

            
        } catch (error) {
            console.log(error)
        }
    }
    
}