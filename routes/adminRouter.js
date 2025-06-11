const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get("/", adminController.dashboard);
router.get("/student", adminController.student);

module.exports = router 