const {body} = require('express-validator');
const Provider = require('../../models/provider.model');
const ApplicationConfig = require('../../models/applicationConfig.model');


exports.addApplicationConfigRequest = [
    body('app_name')
        .exists()
        .withMessage('Application Name is required')
        .custom(async value => {
            const appData = await ApplicationConfig.findOne({where: {app_name: value}});
            if (appData) {
                throw new Error('Application name already exist');
            }
        }),
    body('app_logo_url')
        .exists()
        .withMessage('Application Logo is required'),
    body('app_desc')
        .exists()
        .withMessage('Application description type is required'),
    body('facebook_url')
        .exists()
        .withMessage('Facebook social type is required')
        .isURL()
        .withMessage('Valid URL is required'),
    body('twitter_url')
        .exists()
        .withMessage('Twitter social type is required')
        .isURL()
        .withMessage('Valid URL is required'),
    body('instagram_url')
        .exists()
        .withMessage('Instagram social type is required')
        .isURL()
        .withMessage('Valid URL is required'),
    body('other_url')
        .optional()
        .isURL()
        .withMessage('Valid URL is required'),
];

exports.updateApplicationConfigRequest = [
    body('applicationConfigUUID')
        .exists()
        .withMessage('Application Config ID is required')
        .custom(async value => {
            const appData = await ApplicationConfig.findOne({where: {uuid: value}});
            if (!appData) {
                throw new Error('Invalid Application Config UUID');
            }
        }),
    body('app_name')
        .optional(),
    body('app_logo_url')
        .optional(),
    body('app_desc')
        .optional(),
    body('facebook_url')
        .optional()
        .isURL()
        .withMessage('Valid URL is required'),
    body('twitter_url')
        .optional()
        .isURL()
        .withMessage('Valid URL is required'),
    body('instagram_url')
        .optional()
        .isURL()
        .withMessage('Valid URL is required'),
    body('other_url')
        .optional()
        .isURL()
        .withMessage('Valid URL is required'),
];