const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const virtualAccountController = require('../controllers/virtualAccount.controller');

const authController = require('../controllers/auth.controller');
const applicationController = require('../controllers/admin/application.controller');
const schoolController = require('../controllers/admin/school.controller');
const sessionController = require('../controllers/admin/session.controller');
const departmentController = require('../controllers/admin/department.controller')
const courseController = require('../controllers/admin/course.controller')
// const timeSlotController = require('../controllers/admin/timeSlot.controller')

const lecturerController = require('../controllers/lecturer/lecturer.controller')

const scheduleController = require('../controllers/admin/schedule.controller')

const {addVARequest, registerVARequest} = require('../middleware/validators/virtualAccountValidator.middleware');
const {providusNotificationRequest} = require('../middleware/validators/notificationValidator.middleware');
const notificationController = require('../controllers/notification.controller');


router.get('/pos/account/:tid', auth('POS'), awaitHandlerFactory(virtualAccountController.getPosAccount));
router.get('/pos/transactions/:tid', auth('POS'), awaitHandlerFactory(virtualAccountController.getPosAccountTransactions));

router.get('/account/:account', auth(), awaitHandlerFactory(virtualAccountController.getAccount));
router.get('/transactions/:account', auth(), awaitHandlerFactory(virtualAccountController.getAccountTransactions));

router.post('/account/add', auth(), addVARequest, awaitHandlerFactory(virtualAccountController.addVirtualAccount));

router.post('/notification/providus', providusNotificationRequest, awaitHandlerFactory(notificationController.fromProvidus));
router.post('/account/register/:provider', auth(), registerVARequest, awaitHandlerFactory(virtualAccountController.registerVirtualAccount));

router.post('/app/register', awaitHandlerFactory(authController.register));
router.post('/app/:role/login', awaitHandlerFactory(authController.login));

router.post('/app/create/info', auth(), awaitHandlerFactory(applicationController.setApplicationData))
router.get('/app/info', auth(), awaitHandlerFactory(applicationController.getApplicationData))
router.patch('/app/update/info/:uuid', auth(), awaitHandlerFactory(applicationController.updateApplicationData))

router.post('/app/schools/', auth(), awaitHandlerFactory(schoolController.addSchool)).get('/app/schools/',auth(), awaitHandlerFactory(schoolController.getSchools))
router.get('/app/school/:uuid', auth(), awaitHandlerFactory(schoolController.getSchool)).patch('/app/school/:uuid', auth(), awaitHandlerFactory(schoolController.updateSchool)).delete('/app/school/:uuid', auth(), awaitHandlerFactory(schoolController.deleteSchool))

router.post('/app/sessions/', auth(), awaitHandlerFactory(sessionController.createSession)).get('/app/sessions/',auth(), awaitHandlerFactory(sessionController.getSessions))
router.get('/app/session/:uuid', auth(), awaitHandlerFactory(sessionController.getSession)).patch('/app/session/:uuid', auth(), awaitHandlerFactory(sessionController.updateSession)).delete('/app/session/:uuid', auth(), awaitHandlerFactory(sessionController.deleteSession))

router.post('/app/courses/', auth(), awaitHandlerFactory(courseController.addCourse)).get('/app/courses/',auth(), awaitHandlerFactory(courseController.getAllCourses))
router.get('/app/course/:uuid', auth(), awaitHandlerFactory(courseController.getCourse)).patch('/app/course/:uuid', auth(), awaitHandlerFactory(courseController.updateCourse)).delete('/app/course/:uuid', auth(), awaitHandlerFactory(courseController.deleteCourse))

router
    .get('/app/schedules', auth(), awaitHandlerFactory(scheduleController.getSchedules))
    .post('/app/schedules', auth(), awaitHandlerFactory(scheduleController.addSchedule))

//Time Slot
router
    .post('/app/time-slot/', auth(), awaitHandlerFactory(scheduleController.addTimeSlot))
    .get('/app/time-slot/',auth(), awaitHandlerFactory(scheduleController.getTimeSlots))
    .get('/app/time-slot/:uuid',auth(), awaitHandlerFactory(scheduleController.getTimeSlot))
    .patch('/app/time-slot/:uuid',auth(), awaitHandlerFactory(scheduleController.updateTimeSlot))
    .delete('/app/time-slot/:uuid',auth(), awaitHandlerFactory(scheduleController.deleteTimeSlot))






router.get('/app/lecturer/profile', auth(), awaitHandlerFactory(lecturerController.profile))
router.patch('/app/lecturer/profile/update', auth(), awaitHandlerFactory(lecturerController.updateProfile))
router.get('/app/lecturer/lectures', auth(), awaitHandlerFactory(lecturerController.getLectures))
router.post('/app/lecturer/lectures/create', auth(), awaitHandlerFactory(lecturerController.createLecture))
router.get('/app/lecturer/lecture', auth(), awaitHandlerFactory(lecturerController.getLecture))
router.patch('/app/lecturer/lectures/update', auth(), awaitHandlerFactory(lecturerController.updateLecture))
router.delete('/app/lecturer/lectures/delete', auth(), awaitHandlerFactory(lecturerController.deleteLecture))

router.post('/app/semester', auth(), awaitHandlerFactory(scheduleController.addSemester))


router.post('/app/departments/', auth(), awaitHandlerFactory(departmentController.addDepartment)).get('/app/departments/',auth(), awaitHandlerFactory(departmentController.getDepartments))
router.get('/app/department/:uuid', auth(), awaitHandlerFactory(departmentController.getDepartment)).patch('/app/department/:uuid', auth(), awaitHandlerFactory(departmentController.updateDepartment)).delete('/app/department/:uuid', auth(), awaitHandlerFactory(departmentController.deleteDepartment))


module.exports = router;