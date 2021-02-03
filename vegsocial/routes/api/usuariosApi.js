const express = require("express")
var router = express.Router();
const usuarioController = require("../../controllers/api/usuariosApi")


router.get('/', usuarioController.usuarios_list);
router.post('/create', usuarioController.create_usuario)
router.delete('/delete', usuarioController.delete_usuario)
module.exports = router