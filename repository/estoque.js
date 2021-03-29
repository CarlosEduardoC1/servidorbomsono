'use-strict';
var models = require('../models');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const Op = models.sequelize.Op;

var EstoqueRepository = {

    saveProduto: (body) => {
        console.log(body);
        return models.produtos.create(body).then(function (result) {
            return result;

        });
    },

    listar: async (body) => {
        var limit = body.limit;
        var offset = 0 + (body.page - 1) * limit;

        const { name, codigo, descricao, grupo } = body;
        const where = {};
        if (name) where.name = { [Op.like]: `%${name}%` };
        if (codigo) where.codigo = { [Op.like]: `%${codigo}%` };
        if (descricao) where.descricao = { [Op.like]: `%${descricao}%` };
        if (grupo) where.grupo = { [Op.like]: `%${grupo}%` };

        return models.produtos.findAndCountAll({
            limit: limit,
            offset: offset,
            where
        }).then(async (result) => {
            return result;
        })
    },

    atualizaProduto: (body) => {
        return models.produtos.update(body, { where: { id: body.id } }).then(function (result) {
            return result;
        });
    },

}

module.exports = EstoqueRepository;
