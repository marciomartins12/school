const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const userMiddleware = require("../middleware/userMiddleware");


router.get('/', (req, res)=> {
    res.send("init")
})

module.exports = router;