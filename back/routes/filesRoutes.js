const express = require('express');
const fileController = require('../controllers/file.controller');

const router = express.Router();

router.post('/upload', fileController.upload);
router.get('/filesList', fileController.getListFiles);
router.get('/fileDownload/:id', fileController.download);

module.exports = router;
