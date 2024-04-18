const dotenv = require('dotenv');
const {
    respondSuccess,
    respondError,
    checkValidation,
} = require('../../utils/common.utils');
const logger = require('../../utils/logger.utils');
const Department = require('../../models/department.model')
const Session = require('../../models/session.model')
const {Op} = require("sequelize");
const Channel = require("../../models/channel.model");
const DepartmentService = require("../../services/department.service");

dotenv.config();


class DepartmentController {
    getAllDepartments = async (req, res, next) => {
        // return res.json({msg:`Hello Drame`});

        const page = parseInt(req.query.page ?? 1);
        const limit = parseInt(req.query.perpage ?? 15);
        const search = req.query.search ?? null;

        const offset = (page - 1) * limit;

        console.log(offset);
        let departments = await Department.findAll({
            offset,
            limit,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: Session, attributes: ['uuid', 'session']
                },
            ],
            where: search ? {
                [Op.or]: [
                    {department: {[Op.like]: `%${search}%`}},
                ],
            } : null,
        });

        const totalItems = await Department.count({
            include: [
                {
                    model: Session, attributes: ['uuid', 'session']
                },
            ],
            where: search ? {
                [Op.or]: [
                    {department: {[Op.like]: `%${search}%`}},
                ],
            } : null,
        });

        const count = departments.length;

        const totalPages = Math.ceil(totalItems / limit);
        return respondSuccess(res, "Department list retrieved", {
            departments,
            currentPage: page,
            perPage: count,
            total: totalItems,
            pages: totalPages
        });
    };

    addDepartment = async (req, res, next) => {
        checkValidation(req);
        try {
            const result = await DepartmentService.addDepartment(req.body);
            return respondSuccess(res.json({result}), "Department data created successfully",);
        } catch (e) {
            logger.info(e)
            return respondError(res, e.errors.message)
        }
    }

    getDepartments = async(req,res,next)=>{
        try {
            const result = await DepartmentService.getDepartments();
            return respondSuccess(res.json({result}), "Department data fetched successfully");
        } catch (e) {
            logger.info(e)
            return respondError(res, e.errors.message)
        }
    }
    getDepartment = async (req, res, next) => {
        checkValidation(req);
        const {uuid} = req.params;
        try {
            const result = await DepartmentService.getDepartment(uuid);
            return respondSuccess(res.json({result}), "Department data fetched successfully");
        } catch (e) {
            logger.info(e)
            return respondError(res, e.errors.message)
        }
    }

    updateDepartment = async (req, res, next) => {
        checkValidation(req)
        const {uuid} = req.params;
        try {
            const result = await DepartmentService.updateDepartment(uuid, req.body);
            return respondSuccess(res.json({result}), "Department data updated successfully");
        } catch (e) {
            logger.info(e)
            return respondError(res, e.errors.message)
        }
    }

    deleteDepartment = async (req, res, next) => {
        checkValidation(req);
        const {uuid} = req.params;
        try {
            const result = await DepartmentService.deleteDepartment(uuid);
            return respondSuccess(res.json({result}), "Department data deleted successfully");
        } catch (e) {
            logger.info(e)
            return respondError(res, e.errors.message)
        }
    }
}

module.exports = new DepartmentController;

