'use-strict';
var app = require('express').app;
var repository = require('../repository/vendas');
var utils = require('../utils/utils');
var models = require('../models');
const fs = require('fs');
var Request = require("request");


exports.save = async (req, res, next) => {
    delete req.body.id;
    var retorno = await repository.saveVenda(req.body);
    if (retorno) {
        res.status(200).json({ msg: "Venda cadastrada com sucesso.", status: 200 });
    }
    else {
        res.status(400).json({ msg: "Erro ao cadastrar venda. Tente novamente!", status: 400 });
    }
}

exports.listaVendas = async (req, res, next) => {
    var results = await repository.listar(req.body);
    if (results) {
        res.status(200).json(results);
    } else {
        res.status(400).json({ msg: "Falha ao buscar histórico de vendas.", status: 400 });
    }
}
