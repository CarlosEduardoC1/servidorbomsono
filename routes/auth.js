var express = require('express');
var router = express.Router();
var controller = require('../controllers/jwt-auth/token');
var auth = require("../middlewares/auth-jwt")();

/* JWT AUTH */
router.get('/', auth.authenticate(), controller.get);
router.post('/', controller.post);


module.exports = router;
