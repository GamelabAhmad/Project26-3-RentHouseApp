const verify = require('../middleware/verify');
const express = require('express');
const router = express.Router();
const ratingController = require('../Controller/ratingController');

router.post('/', verify.verifyToken, ratingController.createRating);
router.get('/users/:id', verify.verifyToken, ratingController.getRatingByUserId);
router.put('/:id', verify.verifyToken, ratingController.updateRating);

module.exports = router;
