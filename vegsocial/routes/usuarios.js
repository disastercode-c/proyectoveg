const express = require("express")
var router = express.Router();
const usuarioController = require("../controllers/usuarios")

router.get("/", usuarioController.list)
router.get("/create", usuarioController.create_get)
router.post("/create", usuarioController.create)
router.post("/delete", usuarioController.delete)
router.get("/update/:id", usuarioController.update_get)
router.post("/update/:id", usuarioController.update)

module.exports = router;