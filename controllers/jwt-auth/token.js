var jwt = require("jwt-simple");
var users = require("../../repository/usuarios");
var cfg = require("../../config/config-jwt");
const bcrypt = require('bcryptjs');
var Request = require("request");


exports.get = async (req, res, payload) => {
    res.json(await users.buscarUsuario(req.user.id));
};

exports.post = async (req, res, next) => {
    if (req.body.email && req.body.password) {
        var email = req.body.email;
        var password = req.body.password;
        var body = { email: email };
        var user = await users.pesquisarUsuarioSemImagem(body);
        if (user) {
            await bcrypt.compare(password, user.password, async (err, isValid) => {
                if (err) {
                    return res.status(400).json({ msg: "Falha if err.", status: 400 });
                }
                if (!isValid) {
                    return res.status(400).json({ msg: "Falha if !isValid.", status: 400 });
                }

                var payload = { id: user.id };
                var token = jwt.encode(payload, cfg.jwtSecret);
                user.password = undefined;
                delete user.password;
                res.status(200).json({ msg: "autenticado", status: 200, token: token, id: user.id, name: user.name, tipo: user.type });;
            })
        } else {
            return res.status(400).json({ msg: "Falha. else 1", status: 400 });
        }
    } else {
        return res.status(400).json({ msg: "Falha. else 2", status: 400 });
    }
}