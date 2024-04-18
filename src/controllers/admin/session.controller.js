const dotenv = require('dotenv');
const {
    respondSuccess,
    respondError,
    checkValidation,
} = require('../../utils/common.utils');
const logger = require('../../utils/logger.utils');
const SessionService = require("../../services/session.service");


class SessionController {

    createSession = async (req, res, next) => {
        checkValidation(req);
        try {
            const result = await SessionService.addSession(req.body);
            return respondSuccess(res, "Session created successfully",{result});
        } catch (e) {
            logger.info(e)
            return respondError(res, e.errors.message)
        }
    }
    getSessions = async(req,res,next)=>{
        try {
            const result = await SessionService.getSessions();
            return respondSuccess(res.json({result}), "Session data fetched successfully");
        } catch (e) {
            logger.info(e)
            return respondError(res, e.errors.message)
        }
    }
    getSession = async (req, res, next) => {
        checkValidation(req);
        const {uuid} = req.params;
        try {
            const result = await SessionService.getSession(uuid);
            return respondSuccess(res, "Session data fetched successfully", {result});
        } catch (e) {
            logger.info(e)
            return respondError(res, e.errors.message)
        }
    }

    updateSession = async (req, res, next) => {
        checkValidation(req)
        const {uuid} = req.params;
        try {
            const result = await SessionService.updateSession(uuid, req.body);
            return respondSuccess(res, "Session data updated successfully", {result});
        } catch (e) {
            logger.info(e)
            return respondError(res, e.errors.message)
        }
    }

    deleteSession = async (req, res, next) => {
        checkValidation(req);
        const {uuid} = req.params;
        try {
            const result = await SessionService.deleteSession(uuid);
            return respondSuccess(res, "Session data deleted successfully", {result});
        } catch (e) {
            logger.info(e)
            return respondError(res, e.errors.message)
        }
    }

}

module.exports = new SessionController