const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherControlles");

router.get("/", teacherController.dashboard )

module.exports = router;