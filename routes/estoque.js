var express = require('express');
var router = express.Router();
var controller = require('../controllers/estoque');
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
router.post('/', auth.authenticate(), controller.save);
router.post('/lista', auth.authenticate(), controller.listaProduto);
router.put('/atualiza', auth.authenticate(), controller.atualizar);
router.delete('/:id', auth.authenticate(), controller.deletar);

module.exports = router;
