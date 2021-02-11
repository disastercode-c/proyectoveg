var express = require('express');
var router = express.Router();
var loginController = require('../controllers/login')

router.get('/', loginController.loginView)
router.post('/', loginController.loginPost)
router.get('/forgotpassword', loginController.forgotPasswordGet)
router.post('/forgotpassword', loginController.forgotPasswordPost)
router.get('/resetpassword/:token', loginController.resetPasswordGet)
router.post('/resetpassword', loginController.resetPasswordPost)

module.exports = router