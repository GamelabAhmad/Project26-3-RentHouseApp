const kostController = require('../Controller/kostController');
const verify = require('../middleware/verify');
const express = require('express');
const upload = require('../middleware/multer');
const router = express.Router();

router.post('/', verify.verifyToken, verify.verifyIsPemilik, upload.array('image'), kostController.createKost);
router.get('/', kostController.getKosts);
router.get('/search/query', kostController.searchKosts);
router.get('/:id', kostController.getKostsById);
router.get('/kota/query', kostController.getKostsByKota);
router.put('/:id', verify.verifyToken, verify.verifyIsPemilik, upload.array('images'), kostController.updateKost);
router.delete('/:id', verify.verifyToken, verify.verifyIsPemilik, kostController.deleteKost);
router.delete('/image/:id/:public_id', kostController.deleteImage);

module.exports = router;
