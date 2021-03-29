'use-strict';
var app = require('express').app;

exports.ping = async (req, res, next) => {
    let date = new Date();
    date.setMonth(date.getMonth() + 1);
    console.log(date.getTime());
    res.json(date);
}