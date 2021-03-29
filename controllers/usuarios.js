'use-strict';
var app = require('express').app;
var repository = require('../repository/usuarios');
var utils = require('../utils/utils');
var models = require('../models');
const fs = require('fs');
var Request = require("request");

exports.get = async (req, res, next) => {
    var results = await repository.usuarios();
    res.json(results);
}

exports.verificaEmail = async (req, res, next) => {
    models.users.findAll({ where: { email: req.body.email } })
        .then(function (result) {
            if (result && result.length > 0) {
                res.status(200).json({ possui: true });
            } else {
                res.status(200).json({ possui: false });
            }
        }).catch((err) => {
            res.status(400).json({ msg: "E-mail não encontrado.", status: 400 });
        });
}

exports.find = async (req, res, next) => {
    var results = await repository.buscarUsuario(req.body.email);
    if (results) {
        res.status(200).json(results);
    } else {
        res.status(400).json({ msg: "Falha ao buscar usuário.", status: 400 });
    }
}

exports.save = async (req, res, next) => {
    delete req.body.id;
    var retorno = await repository.saveUser(req.body);
    res.status(200).json({ msg: "Usuário cadastrado com sucesso.", status: 200 });
}

exports.atualizar = (req, res, next) => {
    //req = validate.validator(req);
    var erros = req.validationErrors();

    if (!erros) {

        if (req.body.id == null || req.body.id == undefined || req.body.id == '') {
            res.status(400).json({ msg: "Usuário não atualizado.", status: 400 });
        } else {
            var retorno = repository.atualizaUsuario(req.body);
            if (retorno) {
                res.status(200).json({ msg: "Usuário atualizado com sucesso.", status: 200 });
            }
        }
    } else {
        res.status(400).json({ msg: "Usuário não atualizado.", status: 400 });
    }
}

exports.deletar = async (req, res, next) => {
    const verificaUser = await models.users.findAndCountAll({ where: { id: req.params.id } });
    if (verificaUser.count > 0) {
        models.users.destroy({ where: { id: req.params.id } })
            .then(() => { res.status(200).json({ msg: "deletado com sucesso.", status: 200 }); })
            .catch(() => { res.status(400).json({ msg: "não deletado.", status: 400 }); });
    } else {
        res.status(400).json({ msg: "Erro: !usuário não encontrado.", status: 400 });
    }
}

exports.listarUsuario = async (req, res, next) => {
    var results = await repository.listar(req.body);
    if (results) {
        res.status(200).json(results);
    } else {
        res.status(400).json({ msg: "Falha ao buscar usuário.", status: 400 });
    }
}