const dotenv = require('dotenv');
const {
    respondSuccess,
    respondError,
    checkValidation,
} = require('../../utils/common.utils');
const logger = require('../../utils/logger.utils');
const SessionService = require("../../services/session.service");
const User = require("../../models/user.model");
const LecturerData = require("../../models/lecturerData.model");
const LectureData = require("../../models/lectureData.model");
const Department = require("../../models/department.model");
const Session = require("../../models/session.model");
const Course = require("../../models/course.model");
const Semester = require("../../models/semester.model");
const {Op} = require("sequelize");

dotenv.config();

class LecturerController {
    profile = async (req, res, next) => {
        try {
            // let lecturerData = await LecturerData.findOne({
            //     where: {userId: req.channel.id}, // Replace lecturerDataId with the actual id
            //     include: User // Include User model
            // })
            let lecturerData = await User.findByPk(req.channel.id, {
                include: {
                    model: LecturerData,
                    as: 'lecturerData'
                }
            })
            return respondSuccess(res, "Lecturer profile retrieved", lecturerData);
        } catch (e) {
            logger.info(e);
            return respondError(res, e.message);
        }
    };

    updateProfile = async (req, res, next) => {
        return respondSuccess(res, "Profile Updated")
    }

    getLectures = async (req, res, next) => {
        let lecturerData = await LecturerData.findOne({
            where: {userId: req.channel.id}, // Replace lecturerDataId with the actual id
        })
        if (!lecturerData) {
            return respondError(res, "Lectures data error")
        }
        const lectures = await LectureData.findAll(
            {
                where: {lecturerDataId: lecturerData.id},
                include: [
                    {model: Department},
                    {model: Course},
                    {model: Session},
                    {model: Semester}
                ]
            }
        );
        return respondSuccess(res, "Lectures", lectures)
    }

    createLecture = async (req, res, next) => {
        checkValidation(req)
        const data = await LectureData.create(req.body);
        if (data) {
            return respondSuccess(res, "Lecture Created")
        }
        return respondError(res, "Lecture Creation Failed")
    }

    getLecture = async (req, res, next) => {
        return respondSuccess(res, "Get lecture")
    }

    updateLecture = async (req, res, next) => {
        return respondSuccess(res, "Lecture Updated")
    }

    deleteLecture = async (req, res, next) => {
        return respondSuccess(res, "Lecture Deleted")
    }


}

module.exports = new LecturerController;