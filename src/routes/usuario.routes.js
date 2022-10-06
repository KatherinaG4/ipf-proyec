const express = require("express");
const { getUsuario, postUsuarios, getUsuarios, putUsuarios, deleteUsuarios, loginUsuario } = require("../controllers/usuarios.controllers");

const router = express.Router();


router.get("/", getUsuarios)
router.post("/", postUsuarios)
router.put("/:id", putUsuarios)
router.delete("/:id", deleteUsuarios)
router.get("/:id", getUsuario);


module.exports = router;
