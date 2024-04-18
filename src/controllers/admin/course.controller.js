const dotenv = require('dotenv');
const {
    respondSuccess,
    respondError,
    checkValidation,
} = require('../../utils/common.utils');
const logger = require('../../utils/logger.utils');
const Course = require('../../models/course.model')
const Department = require('../../models/department.model')
const {Op} = require("sequelize");
const School = require("../../models/school.model");
const CourseService = require("../../services/course.service");

dotenv.config();


class CourseController {
    getAllCourses = async (req, res, next) => {
        // return res.json({msg:`Hello Drame`});

        const page = parseInt(req.query.page ?? 1);
        const limit = parseInt(req.query.perpage ?? 15);
        const search = req.query.search ?? null;

        const offset = (page - 1) * limit;

        console.log(offset);
        let courses = await Course.findAll({
            offset,
            limit,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: Department
                }
            ],
            where: search ? {
                [Op.or]: [
                    {course: {[Op.like]: `%${search}%`}},
                ],
            } : null,
        });

        const totalItems = await Course.count({
            include: [
                {
                    model: Department, attributes: ['uuid', 'session']
                }
            ],
            where: search ? {
                [Op.or]: [
                    {course: {[Op.like]: `%${search}%`}},
                ],
            } : null,
        });

        const count = courses.length;

        const totalPages = Math.ceil(totalItems / limit);
        return respondSuccess(res, "Course list retrieved", {
            courses,
            currentPage: page,
            perPage: count,
            total: totalItems,
            pages: totalPages
        });
    };

    addCourse = async (req, res, next) => {
        checkValidation(req);
        try {
            const result = await CourseService.addCourse(req.body);
            return respondSuccess(res.json({result}), "Course data created successfully",);
        } catch (e) {
            logger.info(e)
            return respondError(res, e.errors.message)
        }
    }

    getCourses = async(req,res,next)=>{
        try {
            const result = await CourseService.getCourses();
            return respondSuccess(res.json({result}), "Course data fetched successfully");
        } catch (e) {
            logger.info(e)
            return respondError(res, e.errors.message)
        }
    }
    getCourse = async (req, res, next) => {
        checkValidation(req);
        const {uuid} = req.params;
        try {
            const result = await CourseService.getCourse(uuid);
            return respondSuccess(res.json({result}), "Course data fetched successfully");
        } catch (e) {
            logger.info(e)
            return respondError(res, e.errors.message)
        }
    }

    updateCourse = async (req, res, next) => {
        checkValidation(req)
        const {uuid} = req.params;
        try {
            const result = await CourseService.updateCourse(uuid, req.body);
            return respondSuccess(res.json({result}), "Course data updated successfully");
        } catch (e) {
            logger.info(e)
            return respondError(res, e.errors.message)
        }
    }

    deleteCourse = async (req, res, next) => {
        checkValidation(req);
        const {uuid} = req.params;
        try {
            const result = await CourseService.deleteCourse(uuid);
            return respondSuccess(res.json({result}), "Course data deleted successfully");
        } catch (e) {
            logger.info(e)
            return respondError(res, e.errors.message)
        }
    }
}

module.exports = new CourseController;

