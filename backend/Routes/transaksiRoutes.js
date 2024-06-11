const express = require('express');
const router = express.Router();
const verify = require('../middleware/verify');
const transaksiController = require('../Controller/transaksiController');

router.get('/owner', verify.verifyIsPemilik, transaksiController.getAllTransaksiByPemilikId);
router.get('/users/:id', verify.verifyToken, transaksiController.getTransaksiByIdUser);
router.post('/', verify.verifyToken, transaksiController.createTransaksi);
router.put('/:id', verify.verifyIsPemilik, transaksiController.updateTransaksi);

module.exports = router;
