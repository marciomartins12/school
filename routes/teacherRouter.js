const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherControlles");

router.get("/", teacherController.dashboard);
router.get("/classes", teacherController.classes);
router.get("/grades", teacherController.grades);
module.exports = router;