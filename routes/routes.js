'use strict'

const express = require("express"),
    routes = express.Router(),
    { upload } = require("../helppers/multerConfig"),
    PropietarioControllers = require("../controllers/PropietarioControllers"),
    InmuebleControllers = require("../controllers/InmuebleControllers"),
    InquilinoControllers = require("../controllers/InquilinoControllers"),
    ContratoControllers = require("../controllers/ContratoControllers"),
    UsuarioControllers = require("../controllers/UsuarioControllers"),
    PagoControllers = require("../controllers/PagoControllers"),
    AuthController = require("../controllers/AuthController"),
    routes_protect = require("../middlewares/routes_protect"),
    { err404 } = require("../helppers/transformDate"),
    isLoged = require("../middlewares/isLoged"),

    {body, validationResult } = require('express-validator')

        //obtiene la direccion
        routes.get("/",isLoged,(req,res)=> {
            const locals = {
                title: "Inmobiliaria La Toma",
                body: "Bienvenido a inmobiliaria La toma",
            }
            res.render('Home/index',{loged: req.loged, data:locals,MyTitle:"Inmobiliaria La Toma"})
        })

        // Rutas de Propietario
        
        .get("/Propietario/show",routes_protect,PropietarioControllers.show)

        .get("/Propietario/Create",routes_protect,(req,res)=>{ res.render("Propietario/Create",{usuario: req.Usuario, MyTitle:"Insertar propietario"}) })

        .post("/Propietario/create",routes_protect,body('Email').isEmail(), body('Nombre').isLength({ min: 5, max:80 }),PropietarioControllers.create)

        .get("/Propietario/update/:id",routes_protect,PropietarioControllers.showUpdate)

        .post("/Propietario/update",routes_protect,PropietarioControllers.update)

        .get("/Propietario/Details/:id",routes_protect,PropietarioControllers.details)

        .get("/Propietario/delete",routes_protect,PropietarioControllers.delete)

        // Rutas de Inmueble
        
        .get("/Inmueble/show",routes_protect,InmuebleControllers.show)
        
        .get("/Inmueble/Create",routes_protect,InmuebleControllers.viewCreate)

        .post("/Inmueble/Create",routes_protect,InmuebleControllers.create)

        .get("/Inmueble/Update/:id",routes_protect,InmuebleControllers.showUpdate)

        .post("/Inmueble/update",routes_protect,InmuebleControllers.update)

        .get("/Inmueble/Details/:id",routes_protect,InmuebleControllers.details)

        .get("/Inmueble/delete",routes_protect,InmuebleControllers.delete)
        
        // Rutas de Inquilino

        .get("/Inquilino/show",routes_protect,InquilinoControllers.show)

        .get("/Inquilino/Create",routes_protect,(req,res)=>{ res.render("Inquilino/Create",{usuario: req.Usuario, MyTitle:"Insertar Inquilino"}) })

        .post("/Inquilino/create",routes_protect,InquilinoControllers.create)

        .get("/Inquilino/update/:id",routes_protect,InquilinoControllers.showUpdate)

        .post("/Inquilino/update",routes_protect,InquilinoControllers.update)

        .get("/Inquilino/Details/:id",routes_protect,InquilinoControllers.details)

        .get("/Inquilino/delete",routes_protect,InquilinoControllers.delete)
        
        // Rutas de Contrato
        
        .get("/Contrato/show",routes_protect,ContratoControllers.show)

        .get("/Contrato/Create",routes_protect,ContratoControllers.viewCreate)

        .post("/Contrato/create",routes_protect,ContratoControllers.create)

        .get("/Contrato/update/:id",routes_protect,ContratoControllers.showUpdate)

        .post("/Contrato/update",routes_protect,ContratoControllers.update)

        .get("/Contrato/Details/:id",routes_protect,ContratoControllers.details)

        .get("/Contrato/delete",routes_protect,ContratoControllers.delete)

        // Rutas de Pago

        .get("/Pago/show",routes_protect,PagoControllers.show)

        .get("/Pago/Create",routes_protect,PagoControllers.viewCreate)

        .post("/Pago/create",routes_protect,PagoControllers.create)

        .get("/Pago/update/:id",routes_protect,PagoControllers.showUpdate)

        .post("/Pago/update",routes_protect,PagoControllers.update)

        .get("/Pago/Details/:id",routes_protect,PagoControllers.details)

        .get("/Pago/delete",routes_protect,PagoControllers.delete)

        // Rutas de Usuario

        .get("/Usuario/show",routes_protect,UsuarioControllers.show)

        .get("/Usuario/Create",routes_protect,(req,res)=>{ res.render("Usuario/Create",{usuario: req.Usuario,MyTitle:"Insertar Usuario"}) })

        .post("/Usuario/create" ,routes_protect,upload.single("Avatar"),UsuarioControllers.create)

        .get("/Usuario/Update/:id",routes_protect,UsuarioControllers.showUpdate)

        .post("/Usuario/update",routes_protect,upload.single("Avatar"),UsuarioControllers.update)

        .get("/Usuario/Details/:id",routes_protect,UsuarioControllers.details)
        
        .get("/Usuario/delete",routes_protect,UsuarioControllers.delete)

        //Rutas de Login
        
        .get("/Login/Registrarse",(req,res)=>{ res.render("Login/Registrarse",{MyTitle:"Registrarse"}) })

        .get("/Login",(req,res)=>{ res.render("Login/Login",{MyTitle:"Iniciar Sesion"}) })

        .post("/Login",AuthController.login)

        .post("/Login/Registrarse",upload.single("Avatar"),AuthController.Registrarse)

        .get('/Salir', (req,res)=>{
            res.clearCookie('x-access-token')
            res.redirect('/')
        })

        // errores

        routes.use(err404)


module.exports = routes