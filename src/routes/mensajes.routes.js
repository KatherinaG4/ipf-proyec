const express =require("express");
const router = express.Router();
const {
  getMens,
  postMens,
  putMens,
  deleteMens,
  getMensaje,
} = require("../controllers/mensajes.controllers");



router.get("/", getMens)
router.post("/", postMens)
router.put("/:id", putMens)
router.delete("/:id", deleteMens)
router.get("/:id", getMensaje)







module.exports = router;