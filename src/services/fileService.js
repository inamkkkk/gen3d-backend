const mongoose = require('mongoose');
const File = require('../models/File');
const logModel = require('../models/Log');

const fileService = {
    uploadFile: async (ownerId, filename, type, path) => {
        try {
            const newFile = new File({
                ownerId,
                filename,
                type,
                path,
                createdAt: new Date()
            });
            await newFile.save();
            await logModel.create({
                type: 'INFO',
                module: 'FileService',
                message: `File uploaded: ${filename} by user ${ownerId}`,
                timestamp: new Date()
            });
            return newFile;
        } catch (error) {
            await logModel.create({
                type: 'ERROR',
                module: 'FileService',
                message: `Error uploading file: ${error.message}`,
                timestamp: new Date()
            });
            throw error;
        }
    },
    getFile: async (fileId) => {
        try {
            const file = await File.findById(fileId);
            if (!file) {
                await logModel.create({
                    type: 'WARN',
                    module: 'FileService',
                    message: `File not found: ${fileId}`,
                    timestamp: new Date()
                });
                throw new Error('File not found');
            }
            await logModel.create({
                type: 'INFO',
                module: 'FileService',
                message: `File retrieved: ${file.filename} (${fileId})`,
                timestamp: new Date()
            });
            return file;
        } catch (error) {
            await logModel.create({
                type: 'ERROR',
                module: 'FileService',
                message: `Error retrieving file: ${error.message}`,
                timestamp: new Date()
            });
            throw error;
        }
    }
};

module.exports = fileService;
