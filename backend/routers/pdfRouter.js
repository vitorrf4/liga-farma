const express = require('express');
const router = express();
const service = require('../services/pdfService');

// multer é a biblioteca que gerencia a manipulação de arquivos
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// router.get('/pdfs', async (req, res) => service.uploadPdf());

router.get('/pdfs/:usuarioId', async (req, res) => {
    const usuarioId = req.params.usuarioId;
    console.log(usuarioId);

    try {
        const pdf = await service.getPdfByUserId(usuarioId);

        if (!pdf) {
            return res.status(404).send('Item não encontrado');
        }

        res.json(pdf);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro na busca');
    }
});

router.post('/upload', upload.single('pdf'), (req, res) =>  service.uploadPdf(req, res));

module.exports = router;