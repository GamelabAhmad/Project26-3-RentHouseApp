const express = require('express');
const router = express.Router();
const transaksiController = require('../Controller/transaksiController');

router.get('/owner/:id', transaksiController.getAllTransaksiByPemilikId);
router.get('/users/:id', transaksiController.getTransaksiByIdUser);
router.post('/', transaksiController.createTransaksi);
router.put('/:id', transaksiController.updateTransaksi);

module.exports = router;
