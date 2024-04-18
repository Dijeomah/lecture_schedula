const dotenv = require('dotenv');
const logger = require("../utils/logger.utils");

const Course = require("../models/course.model");
dotenv.config();

class CourseService {
    addCourse = async (appData) => {
        let data = await Course.create(appData);
        if (data) {
            console.log('in create function')
            return {error: false, message: "Course data set Successfully"};
        } else {
            return {error: true, message: "Course data failed"}
        }
    }
    getCourses = async () => {
        const data = await Course.findAll();
        if (!data || data.length < 1) {
            return {error: true, message: "Course data not found or empty"};
        } else {
            return {success: true, data}
        }
    }

    getCourse = async (uuid) => {
        logger.info(uuid)
        const data = await Course.findOne({where: {uuid}});
        logger.info(data)
        if (!data) {
            return {error: true, message: "Course data not found or empty"};
        } else {
            return {success: true, data}
        }
    }

    updateCourse = async (uuid, appData) => {
        console.log(uuid)
        let data = await Course.findOne({where: {uuid}});
        if (!data) {
            return {error: true, message: "Course data not found or empty"};
        }
        return await data.update({
            school_name: appData.school_name
        });
    }

    deleteCourse = async (uuid) => {
        let data = await Course.destroy({where: {uuid}});
        if (!data) {
            return {error: true, message: "Course data not found or empty"};
        }
        return {success: true, message: "Course data deleted"};
    }
}

module.exports = new CourseService;