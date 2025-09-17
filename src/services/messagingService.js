const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const logModel = require('../models/Log');
const appConfig = require('../config/appConfig');

const transporter = nodemailer.createTransport({
    host: appConfig.email.host,
    port: appConfig.email.port,
    secure: appConfig.email.secure,
    auth: {
        user: appConfig.email.auth.user,
        pass: appConfig.email.auth.pass,
    },
});

const sendMessage = async (to, subject, text) => {
    try {
        await transporter.sendMail({ from: appConfig.email.from, to, subject, text });
        await logModel.create({
            type: 'INFO',
            module: 'MessagingService',
            message: `Message sent to ${to} with subject: ${subject}`,
            timestamp: new Date(),
        });
    } catch (error) {
        console.error(`Error sending message to ${to}:`, error);
        await logModel.create({
            type: 'ERROR',
            module: 'MessagingService',
            message: `Failed to send message to ${to} with subject: ${subject}. Error: ${error.message}`,
            timestamp: new Date(),
        });
    }
};

const sendEmailVerification = async (email, token) => {
    const verificationUrl = `${appConfig.frontendUrl}/verify-email?token=${token}`;
    const subject = 'Verify Your Email Address';
    const text = `Please verify your email address by clicking on the following link: ${verificationUrl}`;
    await sendMessage(email, subject, text);
};

module.exports = {
    sendMessage,
    sendEmailVerification,
};
