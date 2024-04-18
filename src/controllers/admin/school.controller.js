const dotenv = require("dotenv");
const logger = require('../../utils/logger.utils');
const {
    respondSuccess,
    respondError,
    checkValidation,
} = require('../../utils/common.utils');
const SchoolService = require('../../services/school.service')

dotenv.config();

class SchoolController {

    addSchool = async (req, res, next) => {
        checkValidation(req);
        try {
            const result = await SchoolService.addSchool(req.body);
            return respondSuccess(res.json({result}), "School data created successfully",);
        } catch (e) {
            logger.info(e)
            return respondError(res, e)
        }
    }

    getSchools = async(req,res,next)=>{
        try {
            const result = await SchoolService.getSchools();
            return respondSuccess(res.json({result}), "School data fetched successfully");
        } catch (e) {
            logger.info(e)
            return respondError(res, e)
        }
    }
    getSchool = async (req, res, next) => {
        checkValidation(req);
        const {uuid} = req.params;
        try {
            const result = await SchoolService.getSchool(uuid);
            return respondSuccess(res.json({result}), "School data fetched successfully");
        } catch (e) {
            logger.info(e)
            return respondError(res, e)
        }
    }

    updateSchool = async (req, res, next) => {
        checkValidation(req)
        const {uuid} = req.params;
        try {
            const result = await SchoolService.updateSchool(uuid, req.body);
            return respondSuccess(res.json({result}), "School data updated successfully");
        } catch (e) {
            logger.info(e)
            return respondError(res, e.errors.message)
        }
    }

    deleteSchool = async (req, res, next) => {
        checkValidation(req);
        const {uuid} = req.params;
        try {
            const result = await SchoolService.deleteSchool(uuid);
            return respondSuccess(res.json({result}), "School data deleted successfully");
        } catch (e) {
            logger.info(e)
            return respondError(res, e.errors.message)
        }
    }
}

module.exports = new SchoolController;

