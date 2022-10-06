const express = require("express");
const router = express.Router();

const {
  getPersonas,
  getPersona,
  postPersonas,
  putPersonas,
  deletePersonas,
  
} = require("../controllers/personas.controllers");

router.get("/", getPersonas);
router.post("/", postPersonas);
router.put("/:id", putPersonas);
router.delete("/:id", deletePersonas);
router.get("/:id", getPersona);

module.exports = router;
