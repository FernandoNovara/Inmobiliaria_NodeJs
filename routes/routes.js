'use strict'

const express = require("express"),
    routes = express.Router(),
    PropietarioControllers = require("../controllers/PropietarioControllers"),
    InmuebleControllers = require("../controllers/InmuebleControllers"),
    UsuarioControllers = require("../controllers/UsuarioControllers"),
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

        .get("/Propietario/show",PropietarioControllers.show)

        .get("/Propietario/Create",(req,res)=>{ res.render("Propietario/Create",{MyTitle:"Insertar propietario"}) })

        .post("/Propietario/create",body('Email').isEmail(), body('Nombre').isLength({ min: 5, max:80 }),PropietarioControllers.create)

        .get("/Propietario/update/:id",PropietarioControllers.showUpdate)

        .post("/Propietario/update",PropietarioControllers.update)

        .get("/Propietario/delete",PropietarioControllers.delete)

        .get("/Inmueble/show",InmuebleControllers.show)
        
        .get("/Inmueble/Create",InmuebleControllers.viewCreate)

        .post("/Inmueble/Create",InmuebleControllers.create)

        .get("/Inmueble/Update/:id",InmuebleControllers.showUpdate)

        .post("/Inmueble/update",InmuebleControllers.update)

        .get("/Inmueble/delete",InmuebleControllers.delete)

        .get("/Usuario/show",UsuarioControllers.show)

        .get("/Usuario/Create",(req,res)=>{ res.render("Usuario/Create",{MyTitle:"Insertar Usuario"}) })

        .post("/Usuario/create" ,UsuarioControllers.upload.single("Avatar"),UsuarioControllers.create)

        .get("/Usuario/Update/:id",UsuarioControllers.showUpdate)

        .post("/Usuario/update",UsuarioControllers.upload.single("Avatar"),UsuarioControllers.update)
        
        .get("/Usuario/delete",UsuarioControllers.delete)


module.exports = routes