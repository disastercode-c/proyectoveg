var express = require('express');
var router = express.Router();
const sessionController = require('../controllers/session')

router.get('/login', sessionController.loginView)
router.post('/login', sessionController.userLogin)

module.exports = router;