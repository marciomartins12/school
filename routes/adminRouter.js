const express = require('express');
const router = express.Router();
const adminController = require('../contollers/adminController')

router.get("/", adminController.dashboard);


module.exports = router 