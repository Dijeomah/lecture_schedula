const dotenv = require('dotenv');

const ApplicationConfig = require("../models/applicationConfig.model");
dotenv.config();

class ApplicationService {
    setApplicationData = async (appData) => {
        console.log(`raw_data: ${appData}`)

        let data = await ApplicationConfig.findAll();
        console.log(`data: ${data}`)
        if (!data || data.length < 1) {
            console.log('in create function')
            await ApplicationConfig.create(appData);
            return {error: false, message: "Application Data set Successfully"};
        } else {
            return {error: true, message: "Application Data already Set"}
        }
    }
    getApplicationData = async () => {
        const data = await ApplicationConfig.findAll();
        if (!data || data.length < 1) {
            return {error: true, message: "Application Data not found or empty"};
        } else {
            return {error: false, data}
        }
    }

    updateApplicationData = async (uuid, appData) => {
        console.log(uuid);
        let data = await ApplicationConfig.findOne({where: {uuid}});
        return await data.update({
            app_name: appData.app_name,
            app_logo_url: appData.app_logo_url,
            app_desc: appData.app_desc,
            facebook_url: appData.facebook_url,
            twitter_url: appData.twitter_url,
            instagram_url: appData.instagram_url,
            other_url: appData.other_url,
        });
    }
}

module.exports = new ApplicationService;