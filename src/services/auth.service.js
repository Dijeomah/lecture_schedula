const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('../models/user.model');
const AdminData = require('../models/adminData.model');
const LecturerData = require('../models/lecturerData.model');
const StudentData = require('../models/studentData.model');

dotenv.config();

class AuthService {
    register = async (userData) => {
        // Register a new user
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const loginCred = await User.create({
            email: userData.email,
            phoneNumber: userData.phone_number,
            username: userData.username,
            password: hashedPassword,
            role: userData.role
        });

        switch (loginCred.role) {
            case 'admin':
                await AdminData.create({
                    userId: loginCred.id,
                    firstName: userData.first_name,
                    lastName: userData.last_name,
                });
                break
            case 'lecturer':
                await LecturerData.create({
                    userId: loginCred.id,
                    salutation: userData.salutation,
                    firstName: userData.first_name,
                    lastName: userData.last_name,
                });
                break
            case 'student':
                await StudentData.create({
                    userId: loginCred.id,
                    firstName: userData.first_name,
                    lastName: userData.last_name,
                });
                break
            default:
                return {error: true, message: "Unable to create account"}
        }
        return {success: true, message: "Account created"}
    }

    login = async (userData, role) => {
        const JWT_SECRET = process.env.SECRET_JWT || "";
        // Login existing user and generate JWT token
        const user = await User.findOne({where: {username: userData.username}});
        if (!user) {
            throw new Error('User not found');
        }
        if (user.role !== role) {
            throw new Error('Invalid User');
        }
        const isPasswordValid = await bcrypt.compare(userData.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        return [user, jwt.sign({id: user.id, username: user.username}, JWT_SECRET, {expiresIn: '1h'})];
    }
}

module.exports = new AuthService;