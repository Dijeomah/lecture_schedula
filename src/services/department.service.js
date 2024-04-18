const dotenv = require('dotenv');
const logger = require("../utils/logger.utils");

const Department = require("../models/department.model");
dotenv.config();

class DepartmentService {
    addDepartment = async (appData) => {
        let data = await Department.create(appData);
        if (data) {
            console.log('in create function')
            return {error: false, message: "Department Data set Successfully"};
        } else {
            return {error: true, message: "Department Data failed"}
        }
    }
    getDepartments = async () => {
        const data = await Department.findAll();
        if (!data || data.length < 1) {
            return {error: true, message: "Department Data not found or empty"};
        } else {
            return {success: true, data}
        }
    }

    getDepartment = async (uuid) => {
        logger.info(uuid)
        const data = await Department.findOne({where: {uuid}});
        logger.info(data)
        if (!data) {
            return {error: true, message: "Department Data not found or empty"};
        } else {
            return {success: true, data}
        }
    }

    updateDepartment = async (uuid, appData) => {
        console.log(uuid)
        let data = await Department.findOne({where: {uuid}});
        if (!data) {
            return {error: true, message: "Department Data not found or empty"};
        }
        return await data.update({
            school_name: appData.school_name
        });
    }

    deleteDepartment = async (uuid) => {
        let data = await Department.destroy({where: {uuid}});
        if (!data) {
            return {error: true, message: "Department Data not found or empty"};
        }
        return {success: true, message: "Department Data deleted"};
    }
}

module.exports = new DepartmentService;