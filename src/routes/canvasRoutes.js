const express = require('express');
const router = express.Router();
const canvasController = require('../controllers/canvasController');

router.post('/canvas/convert', canvasController.convertSketch);

module.exports = router;
