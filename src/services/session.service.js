const dotenv = require('dotenv');

const Session = require("../models/session.model");
const logger = require("../utils/logger.utils");
dotenv.config();

class SessionService {
    addSession = async (appData) => {
        let data = await Session.create(appData);
        if (data) {
            return {error: false, message: "Session set Successfully"};
        } else {
            return {error: true, message: "Session failed"}
        }
    }

    getSessions = async () => {
        const data = await Session.findAll();
        if (!data || data.length < 1) {
            return {error: true, message: "Session not found or empty"};
        } else {
            return {success: true, data}
        }
    }

    getSession = async (uuid) => {
        logger.info(uuid)
        const data = await Session.findOne({where: {uuid}});
        logger.info(data)
        if (!data) {
            return {error: true, message: "Session Data not found or empty"};
        } else {
            return {success: true, data}
        }
    }

    updateSession = async (uuid, appData) => {
        console.log(uuid)
        let data = await Session.findOne({where: {uuid}});
        if (!data) {
            return {error: true, message: "Session Data not found or empty"};
        }
        return await data.update({
            school_name: appData.school_name
        });
    }

    deleteSession = async (uuid) => {
        let data = await Session.destroy({where: {uuid}});
        if (!data) {
            return {error: true, message: "Session Data not found or empty"};
        }
        return {success: true, message: "Session Data deleted"};
    }
}

module.exports = new SessionService;