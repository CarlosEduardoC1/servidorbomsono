'use-strict';
var models = require('../models');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const Op = models.sequelize.Op;

var EstoqueRepository = {

    listaLogs: async (body) => {
        var limit = body.limit;
        var offset = 0 + (body.page - 1) * limit;

        const { forma_pagamento, produto, operador } = body;
        const where = {};
        if (forma_pagamento) where.forma_pagamento = { [Op.like]: `%${forma_pagamento}%` };
        if (produto) where.produto = { [Op.like]: `%${produto}%` };
        if (operador) where.operador = { [Op.like]: `%${operador}%` };

        return models.logs.findAndCountAll({
            limit: limit,
            offset: offset,
            where
        }).then(async (result) => {
            return result;
        })
    },

}

module.exports = EstoqueRepository;
