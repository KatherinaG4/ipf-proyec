const express =require("express");
const router = express.Router();
const {
  getAsist,
  postAsist,
  putAsist,
  deleteAsist,
  getAsistencia,
} = require("../controllers/asistencia.controllers");

router.get("/", getAsist);
router.post("/", postAsist);
router.put("/:id", putAsist);
router.delete("/:id", deleteAsist);
router.get("/:id", getAsistencia);





module.exports = router