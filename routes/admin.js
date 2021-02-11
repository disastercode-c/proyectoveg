var express = require('express');
var router = express.Router();
var adminController = require('../controllers/admin')

router.get('/', adminController.adminView)

module.exports = router