const authService = require('../services/auth.service');
const {respondSuccess, checkValidation} = require("../utils/common.utils");

class AuthController {
    register = async (req, res) => {
        // Handle user registration
        try {
            const user = await authService.register(req.body);
            return respondSuccess(res.json({user}), "registration successful");
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    login = async (req, res) => {
        const role = req.params.role;

        // Handle user login
        try {
            const response = await authService.login(req.body, role);
            return respondSuccess(res.json({user:response[0],access_token: response[1]}), "Login success");
        } catch (error) {
            res.status(401).json({message: 'Invalid credentials'});
        }
    }
}

module.exports = new AuthController;