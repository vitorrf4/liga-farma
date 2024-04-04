const express = require('express');
const router = express();
const service = require('../controllers/pdfController');

// multer é a biblioteca que gerencia a manipulação de arquivos
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/pdfs/:usuarioId', async (req, res) => service.getPdfByUserId(req, res));
router.post('/upload', upload.single('pdf'), (req, res) => service.uploadPdf(req, res));

module.exports = router;