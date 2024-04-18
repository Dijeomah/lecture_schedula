const dotenv = require("dotenv");
const logger = require('../../utils/logger.utils');
const {
    respondSuccess,
    respondError,
    checkValidation,
} = require('../../utils/common.utils');
const ApplicationService = require('../../services/application.service')

dotenv.config();

class ApplicationController {

    setApplicationData = async (req, res, next) => {
        checkValidation(req);
        try {
            const result = await ApplicationService.setApplicationData(req.body);
            return respondSuccess(res.json({result}), "Application data created successfully",);
        } catch (e) {
            logger.info(e)
            return respondError(res, e)
        }
    }

    getApplicationData = async(req,res,next)=>{
        try {
            const result = await ApplicationService.getApplicationData();
            return respondSuccess(res.json({result}), "Application data fetched successfully");
        } catch (e) {
            logger.info(e)
            return respondError(res, e)
        }
    }

    updateApplicationData = async (req, res, next) => {
        checkValidation(req);
        const {uuid} = req.params;
        try {
           const result = await ApplicationService.updateApplicationData(uuid, req.body);
            return respondSuccess(res.json({result}), "Application data updated successfully");
        } catch (e) {
            logger.info(e)
            return respondError(res, e)
        }
    }
}

module.exports = new ApplicationController;

