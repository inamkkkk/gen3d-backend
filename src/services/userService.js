const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const logService = require('./logService');

const userService = {
    registerUser: async (username, email, password, role = 'designer') => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, email, password: hashedPassword, role });
            await newUser.save();
            await logService.log('User registered successfully.', 'userService', 'info');
            return newUser;
        } catch (error) {
            await logService.log(`Error registering user: ${error.message}`, 'userService', 'error');
            throw error;
        }
    },

    loginUser: async (email, password) => {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                await logService.log('Login failed: User not found.', 'userService', 'warn');
                throw new Error('User not found');
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                await logService.log('Login failed: Invalid credentials.', 'userService', 'warn');
                throw new Error('Invalid credentials');
            }
            await logService.log(`User logged in successfully: ${user.email}`, 'userService', 'info');
            return user;
        } catch (error) {
            await logService.log(`Error during login: ${error.message}`, 'userService', 'error');
            throw error;
        }
    },

    getUserProfile: async (userId) => {
        try {
            const user = await User.findById(userId).select('-password');
            if (!user) {
                await logService.log(`Get user profile failed: User not found ${userId}`, 'userService', 'warn');
                throw new Error('User not found');
            }
            await logService.log(`User profile retrieved for ${userId}`, 'userService', 'info');
            return user;
        } catch (error) {
            await logService.log(`Error fetching user profile: ${error.message}`, 'userService', 'error');
            throw error;
        }
    }
};

module.exports = userService;
