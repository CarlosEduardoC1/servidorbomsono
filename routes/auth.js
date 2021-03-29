var express = require('express');
var router = express.Router();
var controller = require('../controllers/jwt-auth/token');
var auth = require("../middlewares/auth-jwt")();

/* JWT AUTH */
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.get('/', auth.authenticate(), controller.get);
router.post('/', controller.post);


module.exports = router;
