const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

router.post('/views/generate', viewController.generateViews);

module.exports = router;
