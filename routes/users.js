var express = require('express');
var router = express.Router();
var controller = require('../controllers/usuarios');
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

/* CADASTRO DE USUARIOS. */
router.post('/get', auth.authenticate(), controller.find);
router.post('/verificaemail', controller.verificaEmail);
router.put('/atualiza', auth.authenticate(), controller.atualizar);
router.delete('/:id', auth.authenticate(), controller.deletar);
router.post('/lista', auth.authenticate(), controller.listarUsuario);
router.post('/', auth.authenticate(), controller.save);

module.exports = router;
