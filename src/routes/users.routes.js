const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  getUsuarios,
  postUsuarios,
  putUsuarios,
  deleteUsuarios,
  login
} = require("../controllers/users.controllers");

const validarCampos = require("../helpers/validarCampos");

const mensajeValidacion = "Todos los campos son obligatorios";
const mensajeVal = "Revise los campos y vuelva a intentarlo";

router.post("/login", login);

router.get("/", getUsuarios);

router.post(
  "/",
  [
    check("username")
      .not()
      .isEmpty()
      .withMessage(mensajeValidacion)
      .isString()
      .withMessage(mensajeVal),
    check("password")
      .not()
      .isEmpty()
      .withMessage(mensajeValidacion)
      .isString()
      .withMessage(mensajeVal),
    check("email")
      .not()
      .isEmpty()
      .withMessage(mensajeValidacion)
      .isString()
      .withMessage(mensajeVal),
    check("confirmPassword")
      .not()
      .isEmpty()
      .withMessage(mensajeValidacion)
      .isString()
      .withMessage(mensajeVal),
    validarCampos,
  ],
  postUsuarios
);

router.put("/", putUsuarios);

router.delete("/", deleteUsuarios);

module.exports = router;
