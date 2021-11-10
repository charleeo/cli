const express = require('express');
const RestuarantOperatorController = require('../../http/controllers/RestaurantOperatorController');
const router = express.Router()

router.post('/save', RestuarantOperatorController.createRestuarant)


module.exports = router;