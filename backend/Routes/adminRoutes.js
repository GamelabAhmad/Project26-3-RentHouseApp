const express = require('express');
const router = express.Router();
const adminController = require('../Controller/adminController');
const verify = require('../middleware/verify');

router.get('/user', verify.verifyAdmin, adminController.getAllUser);
router.get('/rumah', verify.verifyAdmin, adminController.getAllRumah);
router.get('/transaksi', verify.verifyAdmin, adminController.getAllTransaksi);

module.exports = router;
