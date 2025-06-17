const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get("/", adminController.dashboard);
router.get("/student", adminController.student);
router.get("/teacher", adminController.teacher);
module.exports = router 