var express = require('express');
var router = express.Router();
var controller = require('../controllers/pdf');
const multer = require('multer');
var auth = require("../middlewares/auth-jwt")();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage });

/* CADASTRO DE PRODUTOS. */
router.post('/', auth.authenticate(), controller.salvaPDF);
// router.get('/', auth.authenticate(), controller.listaVendas);

module.exports = router;
