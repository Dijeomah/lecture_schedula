const axios = require('axios');
const { validationResult } = require('express-validator');
const crypto = require('crypto');
const { parseISO, parse, format } = require('date-fns')

const HttpException = require('./HttpException.utils');
const providusService = require('../services/providus.service');



exports.sendPost = async (url, data, options) => {
    console.log('URL:', url, data);
    return axios.post(url, data, options)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            console.error(error.response);
            return error.response;
        });
}

exports.sendGet = async (url, options) => {
    return axios.get(url, options)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.error(error.data);
            return error;
        });
}

exports.respondSuccess = (res, message, data) => {
    let response = {
        status: "success",
        message,
        data
    }
    return res.status(200).send(response);
}

exports.respondError = (res, message) => {
    let response = {
        status: "error",
        message,
    }
    return res.status(400).send(response);
}

exports.randGen = (numDigits) => {
    let min = Math.pow(10, numDigits - 1);
    let max = Math.pow(10, numDigits) - 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.checkValidation = (req) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new HttpException(400, errors.errors[0].msg);
    }
}

exports.toSha256 = (value) => {
    const hash = crypto.createHash('sha256');
    return hash.update(value).digest('hex');
}

exports.toSha512 = (value, secret) => {
    if (secret) {
        const hash = crypto.createHmac('sha512', secret);
        return hash.update(value).digest('hex');
    } else {
        const hash = crypto.createHmac('sha512', value);
        return hash.digest('hex');
    }
}

exports.formatDate = (value) => {
    let parsedDate = new Date();
    try {
        parsedDate = parseISO(value);
    } catch (e) {
        parsedDate = parse(value, 'MM/dd/yyyy HH:mm:ss', new Date());
    }

    return format(parsedDate, 'yyyy-MM-dd HH:mm:ss');
}

exports.nowDate = (formatVal = "yyyy-MM-dd") => {
    const currentDate = new Date();
    return format(currentDate, formatVal);
}

exports.switchProviderCall = async (provider, channel, identifier, accountName, bvn, phoneNumber, settlementAccount) => {
    switch (provider.code) {
        case "providus":
            return await providusService.createVirtualAccount(provider, identifier, accountName, phoneNumber, bvn, settlementAccount);
    }
}

exports.toUpper = async (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
}