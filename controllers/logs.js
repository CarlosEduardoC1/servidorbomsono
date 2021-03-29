'use-strict';
var app = require('express').app;
var repository = require('../repository/logs');
var utils = require('../utils/utils');
var models = require('../models');
const fs = require('fs');
var Request = require("request");



exports.listaVendas = async (req, res, next) => {
    var results = await repository.listaLogs(req.body);
    if (results) {
        res.status(200).json(results);
    } else {
        res.status(400).json({ msg: "Falha ao buscar histórico de retiradas.", status: 400 });
    }
}
