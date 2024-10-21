const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/get',weatherController.weatherDetails);
router.get('/history/:city',weatherController.getPrevDetails);
module.exports = router;