var express = require('express');
var router = express.Router();
var loginController = require('../controllers/login')

router.get('/', loginController.loginView)
router.post('/', loginController.loginPost)


module.exports = router