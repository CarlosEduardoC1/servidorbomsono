'use-strict';
var app = require('express').app;
var repository = require('../repository/estoque');
var utils = require('../utils/utils');
var models = require('../models');
const fs = require('fs');
var Request = require("request");


exports.save = async (req, res, next) => {
    delete req.body.id;
    var retorno = await repository.saveProduto(req.body);
    if (retorno) {
        res.status(200).json({ msg: "Produto cadastrado com sucesso.", status: 200 });
    }
    else {
        res.status(400).json({ msg: "Erro ao cadastrar produto. Tente novamente!", status: 400 });
    }
}

exports.listaProduto = async (req, res, next) => {
    var results = await repository.listar(req.body);
    if (results) {
        res.status(200).json(results);
    } else {
        res.status(400).json({ msg: "Falha ao buscar usuário.", status: 400 });
    }
}

exports.atualizar = (req, res, next) => {
    //req = validate.validator(req);
    var erros = req.validationErrors();

    if (!erros) {
        if (req.body.id == null || req.body.id == undefined || req.body.id == '') {
            res.status(400).json({ msg: "Produto não encontrado.", status: 400 });
        } else {
            var retorno = repository.atualizaProduto(req.body);
            if (retorno) {
                res.status(200).json({ msg: "Produto atualizado com sucesso.", status: 200 });
            }
        }
    } else {
        res.status(400).json({ msg: "Produto não atualizado.", status: 400 });
    }
}

exports.deletar = async (req, res, next) => {
    const verificaUser = await models.produtos.findAndCountAll({ where: { id: req.params.id } });
    if (verificaUser.count > 0) {
        models.produtos.destroy({ where: { id: req.params.id } })
            .then(() => { res.status(200).json({ msg: "Produto deletado com sucesso.", status: 200 }); })
            .catch(() => { res.status(400).json({ msg: "Produto não deletado. Tente novamente", status: 400 }); });
    } else {
        res.status(400).json({ msg: "Erro: !produto não encontrado.", status: 400 });
    }
}