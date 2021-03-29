'use-strict';
var models = require('../models');
const fs = require('fs');
const { response, listeners, listenerCount } = require('../app');
const fetch = require("node-fetch");

var UtilsRepository = {
    viacep: async (body) => {
        let url = `https://viacep.com.br/ws/${body.cep}/json/`;
        let dados = {
            rows: []
        }
           dados = await fetch(url, { method: 'get' })    
             .then(response => response.json())
             .then(data => {
              return data
            });
    
        return dados
    },
}

module.exports = UtilsRepository;
