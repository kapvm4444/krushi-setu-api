const express = require('express');
const adminPanelController = require('./../controllers/adminPanelController');

const router = express.Router();

router.get('/dashboard', adminPanelController.getDashboard);

module.exports = router;
