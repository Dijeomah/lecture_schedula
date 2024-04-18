const dotenv = require('dotenv');
const {
    respondSuccess,
    respondError,
    checkValidation,
} = require('../../utils/common.utils');
const logger = require('../../utils/logger.utils');
const LecturerData = require("../../models/lecturerData.model");
const LectureData = require("../../models/lectureData.model");
const Department = require("../../models/department.model");
const Course = require("../../models/course.model");
const Session = require("../../models/session.model");
const Semester = require("../../models/semester.model");
const {Op} = require("sequelize");
const TimeSlot = require("../../models/timeSlot.model");
const Schedule = require("../../models/schedule.model");
const LectureHall = require("../../models/lectureHall.model");
// const SettlementAccount = require("../../models/settlementAccount.model");
// const SettlementAccount = require("../../models/settlementAccount.model");

dotenv.config();

class ScheduleController {

    addSemester = async (req, res, next) => {
        await Semester.create(req.body)
        return respondSuccess(res, 'Added Semester Year')
    }

    getTimeSlots = async (req, res, next) => {
        const timeSlot = await TimeSlot.findAll();
        if (!timeSlot) {
            return respondError(res, 'No Time Slot found');
        }
        return respondSuccess(res, 'Time Slots fetched', timeSlot)
    }

    addTimeSlot = async (req, res, next) => {
        await TimeSlot.create(req.body);
        return respondSuccess(res, 'Time Slot created')
    }

    getTimeSlot = async (req, res, next) => {
        const {uuid} = req.params;
        const timeSlot = await TimeSlot.findOne({where: {uuid}});
        if (!timeSlot) {
            return respondError(res, 'No Time Slot found')
        }
        return respondSuccess(res, 'Time Slot fetched', timeSlot)
    }

    updateTimeSlot = async (req, res, next) => {
        const {uuid} = req.params;
        const timeSlot = await TimeSlot.findOne({where: {uuid}});
        if (!timeSlot) {
            return {error: true, message: "Time Slot data not found"};
        }
        await timeSlot.update({
            day: req.body.day,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
        });
        return respondSuccess(res, 'Time Slot updated')
    }

    deleteTimeSlot = async (req, res, next) => {
        const {uuid} = req.params;
        const timeSlot = await TimeSlot.findOne({where: {uuid}});
        if (!timeSlot) {
            return respondError(res, "Time Slot data not found");
        }
        return respondSuccess(res, 'Time Slot deleted')
    }

    getSchedules = async (req, res, next) => {
        try {
            // Fetch schedules along with associated models
            const schedules = await Schedule.findAll({
                include: [
                    {
                        model: LectureData,
                        attributes: ['lecturerDataId', 'departmentId', 'courseId', 'sessionId', 'semesterId'],
                        include:
                            [
                                {model: LecturerData},
                                {model: Department},
                                {model: Course},
                                {model: Session},
                                {model: Semester},
                            ]
                    },
                    {
                        model: LectureHall,
                        attributes: ['departmentId', 'hallName']
                    },
                    {
                        model: TimeSlot,
                        attributes: ['day', 'startTime', 'endTime']
                    },
                ]
            });

            // Check if schedules exist
            if (schedules.length === 0) {
                return respondError(res, 'No schedules found');
            }

            // Respond with success and the fetched schedules
            return respondSuccess(res, 'Schedules fetched', schedules);
        } catch
            (error) {
            // Handle any errors
            // return next(error);
            return logger.info(next(error));
        }
    }


    getSchedulesByLectureUUID = async (req, res, next) => {
        const lectureUUID = req.body.uuid;
        const lectureData = LecturerData.findOne({where: {uuid: lectureUUID}});
        const schedule = await Schedule.findOne({
            where: {lectureDataId: lectureData.id},
            include: [
                {model: LectureData},
                {model: LectureHall},
                {model: TimeSlot},
            ]
        });
        if (!schedule) {
            return respondError(res, 'No Schedule found');
        }
        return respondSuccess(res, 'Schedule fetched', schedule)
    }


    getSchedulesUUID = async (req, res, next) => {
        const uuid = req.body.uuid;
        const schedule = await Schedule.findOne({
            where: {uuid},
            include: [
                {model: LectureData},
                {model: LectureHall},
                {model: TimeSlot},
            ]
        });
        if (!schedule) {
            return respondError(res, 'No Schedule found');
        }
        return respondSuccess(res, 'Schedule fetched', schedule)
    }

    /*
    * get the lecture data from the lecturers.
    * for the selected lecturer, create a schedule.
    *
    * */
    addSchedule = async (req, res, next) => {
        await Schedule.create(req.body);
        return respondSuccess(res, "Schedule created")
    }

}

module
    .exports = new ScheduleController