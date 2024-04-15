const express = require('express');
const router = express();
const controller = require('../controllers/pdfController');
const {verifyToken} = require("../config/jwt");

// multer é a biblioteca que gerencia a manipulação de arquivos
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5000000
    }
});

router.get('/pdf/:usuarioId', (req, res) => controller.getPdfByUserId(req, res));
router.post('/pdf/upload', upload.single('pdf'), (req, res) => controller.uploadPdf(req, res));

module.exports = router;