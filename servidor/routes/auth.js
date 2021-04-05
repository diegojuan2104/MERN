//Rutas para crear usuarios 
const express = require('express');
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");

//Crea usuario 

//api/usuarios 
router.post("/", 
[
    check("email", "Agrega un email válido").isEmail(),
    check("password", "El password debe ser mínimo de 6 caracteres").not().isLength({min: 6}),
],
authController.autenticarUsuario);

module.exports = router;