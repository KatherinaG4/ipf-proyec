const express = require("express");
const router = express.Router();

const {
  getMaterias,
  postMateria,
  putMateria,
  deleteMateria,
  getMateria,
} = require("../controllers/materias.controllers");

router.get("/", getMaterias);
router.post("/", postMateria);
router.put("/:id", putMateria);
router.delete("/:id", deleteMateria);
router.get("/:id", getMateria)




module.exports = router;