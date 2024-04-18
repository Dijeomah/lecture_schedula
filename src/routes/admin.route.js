const express = require('express');
const router = express.Router();
const channelController = require('../controllers/channel.controller');
const providerController = require('../controllers/provider.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const {
    addChannelRequest,
    updateChannelRequest,
    addSettlementAccountRequest
} = require('../middleware/validators/channelValidator.middleware');
const applicationController = require('../controllers/admin/application.controller')
const {
    addApplicationConfigRequest,
    updateApplicationConfigRequest
} = require("../middleware/validators/applicationConfigValidator.middleware");

router.post('/application/settings', auth('ADMIN'), addApplicationConfigRequest, awaitHandlerFactory(applicationController.setApplicationData))
router.patch('/application/settings', auth('ADMIN'), updateApplicationConfigRequest, awaitHandlerFactory(applicationController.updateApplicationData))

router.get('/channels', auth('ADMIN'), awaitHandlerFactory(channelController.getAllChannels));
router.post('/channels/add', auth('ADMIN'), addChannelRequest, awaitHandlerFactory(channelController.addChannel));
router.post('/channels/update', auth('ADMIN'), updateChannelRequest, awaitHandlerFactory(channelController.updateChannel));
router.post('/channels/account/add', auth('ADMIN'), addSettlementAccountRequest, awaitHandlerFactory(channelController.addChannelAccount)); // localhost:3000/api/v1/users/whoami

module.exports = router;