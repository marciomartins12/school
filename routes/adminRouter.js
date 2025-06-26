const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get("/", adminController.dashboard);
router.get("/student", adminController.student);
router.get("/teacher", adminController.teacher);
router.get("/events", adminController.event);
router.get("/class", adminController.class);
module.exports = router 