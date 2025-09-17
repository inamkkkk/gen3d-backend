const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

router.post('/files/upload', fileController.uploadFile);
router.get('/files/:id', fileController.getFile);

module.exports = router;
