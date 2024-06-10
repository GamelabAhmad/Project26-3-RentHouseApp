const verify = require('../middleware/verify');
const express = require('express');
const router = express.Router();
const ratingController = require('../Controller/ratingController');

router.post('/', verify.verifyToken, ratingController.createRating);
// router.get('/rumahs/:id', ratingController.getRatingByrumahId);
router.get('/users', verify.verifyToken, ratingController.getRatingByUserId);
router.put('/:id', verify.verifyToken, ratingController.updateRating);
// router.get('/rumahs/:id/average', ratingController.getAverageRating);

module.exports = router;
