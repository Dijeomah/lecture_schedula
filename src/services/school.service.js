const dotenv = require('dotenv');
const logger = require("../utils/logger.utils");

const School = require("../models/school.model");
dotenv.config();

class SchoolService {
    addSchool = async (appData) => {
        let data = await School.create(appData);
        if (data) {
            console.log('in create function')
            return {error: false, message: "School Data set Successfully"};
        } else {
            return {error: true, message: "School Data failed"}
        }
    }
    getSchools = async () => {
        const data = await School.findAll();
        if (!data || data.length < 1) {
            return {error: true, message: "School Data not found or empty"};
        } else {
            return {success: true, data}
        }
    }

    getSchool = async (uuid) => {
        logger.info(uuid)
        const data = await School.findOne({where: {uuid}});
        logger.info(data)
        if (!data) {
            return {error: true, message: "School Data not found or empty"};
        } else {
            return {success: true, data}
        }
    }

    updateSchool = async (uuid, appData) => {
        console.log(uuid)
        let data = await School.findOne({where: {uuid}});
        if (!data) {
            return {error: true, message: "School Data not found or empty"};
        }
        return await data.update({
            school_name: appData.school_name
        });
    }

    deleteSchool = async (uuid) => {
        let data = await School.destroy({where: {uuid}});
        if (!data) {
            return {error: true, message: "School Data not found or empty"};
        }
        return {success: true, message: "School Data deleted"};
    }
}

module.exports = new SchoolService;