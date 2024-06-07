const verify = require('../middleware/verify');
const express = require('express');
const router = express.Router();
const ratingController = require('../Controller/ratingController');

router.post('/', verify.verifyToken, ratingController.createRating);
// router.get('/kosts/:id', ratingController.getRatingByKostId);
router.get('/users', verify.verifyToken, ratingController.getRatingByUserId);
router.put('/:id', verify.verifyToken, ratingController.updateRating);
// router.get('/kosts/:id/average', ratingController.getAverageRating);

module.exports = router;
