const router = express.Router();
const {
  getPersonas,
  getPersona,
  postPersona,
  putPersonas,
  deletePersonas,
} = require("../controllers/personas.controllers");

router.get("/", getPersonas);
router.post("/", postPersona);
router.put("/:id", putPersonas);
router.delete("/:id", deletePersonas);
router.get("/:id", getPersona);

module.exports = router;
