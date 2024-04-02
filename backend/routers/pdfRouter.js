const express = require('express');
const router = express();
const PdfModel = require('../models/Pdf');

// multer é a biblioteca que gerencia a manipulação de arquivos
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/pdfs', async (req, res) => {
    try {
        const pdfs = await PdfModel.findAll();

        res.json(pdfs);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro na busca');
    }
});

router.get('/pdfs/:usuarioId', async (req, res) => {
    const usuarioId = req.params.usuarioId;
    console.log(usuarioId);

    try {
        const pdf = await PdfModel.findOne({where: {usuarioId: usuarioId}});
        
        if (!pdf) {
            return res.status(404).send('Item não encontrado');
        }

        res.json(pdf);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro na busca');
    }
});

router.post('/upload', upload.single('pdf'), async (req, res) => {
    if (req.file.mimetype !== 'application/pdf') {
        return res.status(400).json({message: `Arquivo não é um PDF`});
    }
    
    try {
        await PdfModel.create({
            filename: req.file.originalname,
            data: req.file.buffer,
            usuarioId: req.body.usuarioId
        });

        res.status(200).json({message: `Arquivo salvo com sucesso`});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erro ao salvar'});
    }
});

module.exports = router;