const rumahController = require('../Controller/rumahController');
const verify = require('../middleware/verify');
const express = require('express');
const upload = require('../middleware/multer');
const router = express.Router();

router.post('/', verify.verifyIsPemilik, upload.array('image'), rumahController.createRumah);
router.get('/', rumahController.getRumah);
router.get('/search/query', rumahController.searchRumah);
router.get('/:id', rumahController.getRumahById);
router.get('/kota/query', rumahController.getRumahByKota);
router.put('/:id', verify.verifyIsPemilik, upload.array('images'), rumahController.updateRumah);
router.delete('/:id', verify.verifyIsPemilik, rumahController.deleteRumah);
router.delete('/image/:id/:public_id', verify.verifyIsPemilik, rumahController.deleteImage);

module.exports = router;
