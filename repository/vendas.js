'use-strict';
var models = require('../models');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const Op = models.sequelize.Op;

var EstoqueRepository = {

    saveVenda: async (body) => {
        const resp = await models.produtos.findOne({ where: { name: body.produto } });
        if (resp.dataValues.quantidade <= 0) {
            console.log(resp);
            return false;
        } else {
            return response = models.vendas.create(body)
                .then(async function () {

                    let quant = { quantidade: resp.dataValues.quantidade - body.qnt };
                    models.produtos.update(quant, { where: { name: body.produto } });
                    return models.logs.create(body);
                })
                .catch(e => { return e });
        }
    },

    listar: async (body) => {
        var limit = body.limit;
        var offset = 0 + (body.page - 1) * limit;

        const { nome_cliente, forma_pagamento, produto, operador } = body;
        const where = {};
        if (nome_cliente) where.nome_cliente = { [Op.like]: `%${nome_cliente}%` };
        if (forma_pagamento) where.forma_pagamento = { [Op.like]: `%${forma_pagamento}%` };
        if (produto) where.produto = { [Op.like]: `%${produto}%` };
        if (operador) where.operador = { [Op.like]: `%${operador}%` };

        return models.vendas.findAndCountAll({
            limit: limit,
            offset: offset,
            where
        }).then(async (result) => {
            return result;
        })
    },

}

module.exports = EstoqueRepository;
