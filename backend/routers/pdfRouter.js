const express = require('express');
const router = express();
const controller = require('../controllers/pdfController');
const {verifyToken} = require("../jwt");

// multer é a biblioteca que gerencia a manipulação de arquivos
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/pdf/:usuarioId', verifyToken, (req, res) => controller.getPdfByUserId(req, res));
router.post('/pdf/upload', upload.single('pdf'), (req, res) => controller.uploadPdf(req, res));

module.exports = router;