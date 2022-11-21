const {dbConfig} = require("../database/db_con"),
    multer = require("multer"),
    path = require("path"),
    storage = multer.diskStorage({
        destination: path.join(__dirname, '../storage'),
        filename: (req, file, cb)=>{
            cb(null, 'IMG_'+Math.round(Math.random() * (Date.now()-100000 + 1) + 100000) + '_' + Date.now() + '.' + file.mimetype.split('/')[1])
        }
    }),
    minetypes = ['image/png','image/jpeg','image/jpg','image/webp','image/gif'],
    upload = multer(
        { 
            storage: storage,
        }
    ),
    fs = require("fs")

module.exports = {
    upload: upload,
    
    async show(req,res){

        try {

            const usuariosList = await dbConfig.Usuario.findAll()

            if(usuariosList.length > 0)
            {
                res.render("Usuario/Usuario",{allUsuario: usuariosList , MyTitle:"Inicio de Usuario"})
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
                res.render("Usuario/Update",{ "Usuario": usuario })
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