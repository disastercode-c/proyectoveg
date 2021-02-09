var express = require('express')
var router = express.Router();
const emprendedoresController = require('../controllers/emprendedores')

router.get('/', emprendedoresController.emprendedoresList)
router.get('/:nombre', emprendedoresController.emprendedorView)

module.exports = router