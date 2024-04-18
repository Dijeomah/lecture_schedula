const common = require("../utils/common.utils");
const crypto = require('crypto');
const logger = require('../utils/logger.utils');

class ProvidusService {
    createVirtualAccount = async (provider, identifier, accountName, phoneNumber, bvn, settlementAccount) => {

        const data = {
            account_name: accountName,
            bvn: bvn
        }

        const url = provider.credentials.baseUrl + 'appdevapi/api/PiPCreateReservedAccountNumber';

        // const authSignature = crypto.createHmac('sha512', `${provider.credentials.cliendID + ':' + provider.credentials.clientSecret}`).digest('hex');
        const authSignature = common.toSha512(provider.credentials.clientID + ':' + provider.credentials.clientSecret);
        // const signatureToUpper = authSignature.toUpperCase();
        const signatureToUpper = 'BE09BEE831CF262226B426E39BD1092AF84DC63076D4174FAC78A2261F9A3D6E59744983B8326B69CDF2963FE314DFC89635CFA37A40596508DD6EAAB09402C7';


        const headers = {
            "Content-Type": "application/json",
            "Client-Id": provider.credentials.cliendID,
            "X-Auth-Signature": signatureToUpper
        };

        const response = await common.sendPost(url, data, {headers});
        if (response?.hasOwnProperty('responseCode') && response.responseCode === '00') {
            return { error: false, account: response.account_number }
        }
        return { error: true, message: response?.message ?? "Unable to create virtual account" }
    }
}

module.exports = new ProvidusService;