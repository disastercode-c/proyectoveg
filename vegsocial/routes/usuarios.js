const express = require("express")
var router = express.Router();
const usuarioController = require("../controllers/usuarios")

router.get("/", usuarioController.usuarioslist)
router.get("/create", usuarioController.createUsuarioGet)
router.post("/create", usuarioController.createUsuarioPost)
router.post("/delete/:id", usuarioController.removeUserById)
router.get("/update/:id", usuarioController.usuariosUpdateGet)
router.post("/update/:id", usuarioController.usuariosUpdatePost)



module.exports = router;