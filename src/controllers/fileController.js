const fileService = require('../services/fileService');

const uploadFile = async (req, res) => {
    try {
        const { userId } = req.user; 
        const { filename, type, path } = req.body;
        const newFile = await fileService.uploadFile(userId, filename, type, path);
        res.status(201).json(newFile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getFile = async (req, res) => {
    try {
        const { id } = req.params;
        const file = await fileService.getFile(id);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        res.status(200).json(file);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    uploadFile,
    getFile
};