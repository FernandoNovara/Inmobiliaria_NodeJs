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

    {body, validationResult } = require('express-validator')

        //obtiene la direccion
        routes.get("/",(req,res)=> {
            const locals = {
                title: "Inmobiliaria La Toma",
                body: "Bienvenido a inmobiliaria La toma",
            }
            res.render('Home/index',{data:locals,MyTitle:"Inmobiliaria La Toma"})
        })

        .get("/Propietario",(req,res)=>{ res.render("Propietario/Propietario",{MyTitle:"Inicio de Propietario"}) })

        .get("/Inmueble",(req,res)=>{ res.render("Inmueble/Inmueble",{MyTitle:"Inicio de Inmueble"}) })

        .get("/Inquilino",(req,res)=>{ res.render("Inquilino/Inquilino",{MyTitle:"Inicio de Inquilino"}) })

        .get("/Contrato",(req,res)=>{ res.render("Contrato/Contrato",{MyTitle:"Inicio de Contrato"}) })

        .get("/Pago",(req,res)=>{ res.render("Pago/Pago",{MyTitle:"Inicio de Pago"}) })

        .get("/Usuario",(req,res)=>{ res.render("Usuario/Usuario",{MyTitle:"Inicio de Usuario"}) })

        // Rutas de Propietario
        
        .get("/Propietario/show",PropietarioControllers.show)

        .get("/Propietario/Create",(req,res)=>{ res.render("Propietario/Create",{MyTitle:"Insertar propietario"}) })

        .post("/Propietario/create",body('Email').isEmail(), body('Nombre').isLength({ min: 5, max:80 }),PropietarioControllers.create)

        .get("/Propietario/update/:id",PropietarioControllers.showUpdate)

        .post("/Propietario/update",PropietarioControllers.update)

        .get("/Propietario/Details/:id",PropietarioControllers.details)

        .get("/Propietario/delete",PropietarioControllers.delete)

        // Rutas de Inmueble
        
        .get("/Inmueble/show",InmuebleControllers.show)
        
        .get("/Inmueble/Create",InmuebleControllers.viewCreate)

        .post("/Inmueble/Create",InmuebleControllers.create)

        .get("/Inmueble/Update/:id",InmuebleControllers.showUpdate)

        .post("/Inmueble/update",InmuebleControllers.update)

        .get("/Inmueble/Details/:id",InmuebleControllers.details)

        .get("/Inmueble/delete",InmuebleControllers.delete)
        
        // Rutas de Inquilino

        .get("/Inquilino/show",InquilinoControllers.show)

        .get("/Inquilino/Create",(req,res)=>{ res.render("Inquilino/Create",{MyTitle:"Insertar Inquilino"}) })

        .post("/Inquilino/create",InquilinoControllers.create)

        .get("/Inquilino/update/:id",InquilinoControllers.showUpdate)

        .post("/Inquilino/update",InquilinoControllers.update)

        .get("/Inquilino/Details/:id",InquilinoControllers.details)

        .get("/Inquilino/delete",InquilinoControllers.delete)
        
        // Rutas de Contrato
        
        .get("/Contrato/show",ContratoControllers.show)

        .get("/Contrato/Create",ContratoControllers.viewCreate)

        .post("/Contrato/create",ContratoControllers.create)

        .get("/Contrato/update/:id",ContratoControllers.showUpdate)

        .post("/Contrato/update",ContratoControllers.update)

        .get("/Contrato/Details/:id",ContratoControllers.details)

        .get("/Contrato/delete",ContratoControllers.delete)

        // Rutas de Pago

        .get("/Pago/show",PagoControllers.show)

        .get("/Pago/Create",PagoControllers.viewCreate)

        .post("/Pago/create",PagoControllers.create)

        .get("/Pago/update/:id",PagoControllers.showUpdate)

        .post("/Pago/update",PagoControllers.update)

        .get("/Pago/Details/:id",PagoControllers.details)

        .get("/Pago/delete",PagoControllers.delete)

        // Rutas de Usuario

        .get("/Usuario/show",UsuarioControllers.show)

        .get("/Usuario/Create",(req,res)=>{ res.render("Usuario/Create",{MyTitle:"Insertar Usuario"}) })

        .post("/Usuario/create" ,upload.single("Avatar"),UsuarioControllers.create)

        .get("/Usuario/Update/:id",UsuarioControllers.showUpdate)

        .post("/Usuario/update",upload.single("Avatar"),UsuarioControllers.update)

        .get("/Usuario/Details/:id",UsuarioControllers.details)
        
        .get("/Usuario/delete",UsuarioControllers.delete)


module.exports = routes