'use strict'

const express = require("express"),
    routes = express.Router(),
    PropietarioControllers = require("../controllers/PropietarioControllers")

        //obtiene la direccion
        routes.get("/",(req,res)=> {
            const locals = {
                title: "Inmobiliaria La Toma",
                body: "Bienvenido a inmobiliaria La toma",
            }
            res.render('index',{data:locals,MyTitle:"Inmobiliaria La Toma"})
        })

        .get("/Propietario",(req,res)=>{
            res.render("Propietario",{MyTitle:"Inicio de Propietario"})
        })

        .get("/Inmueble",(req,res)=>{
            res.render("Inmueble",{MyTitle:"Inicio de Inmueble"})
        })

        .get("/Inquilino",(req,res)=>{
            res.render("Inquilino",{MyTitle:"Inicio de Inquilino"})
        })

        .get("/Contrato",(req,res)=>{
            res.render("Contrato",{MyTitle:"Inicio de Contrato"})
        })

        .get("/Pago",(req,res)=>{
            res.render("Pago",{MyTitle:"Inicio de Pago"})
        })

        .get("/Usuario",(req,res)=>{
            res.render("Usuario",{MyTitle:"Inicio de Usuario"})
        })

        .get("/Create",(req,res)=>{
            res.render("Create",{MyTitle:"Insertar propietario"})
        })

        .get("/Propietario/show",PropietarioControllers.show)

        .get("/Propietario/create",PropietarioControllers.create)


module.exports = routes