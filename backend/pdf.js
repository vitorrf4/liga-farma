const sequelize = require('./database/sequelize');
const { DataTypes} = require('sequelize');
const multer = require('multer');

const PdfModel = sequelize.define('pdf', {
    filename: DataTypes.STRING,
    data: DataTypes.BLOB, // Using BLOB for storing binary data
    userId: DataTypes.INTEGER
});
// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const express = require('express');
const router = express();
// Upload endpoint
router.post('/upload', upload.single('pdf'), async (req, res) => {
    try {
        const newPdf = await PdfModel.create({
            filename: req.file.originalname,
            data: req.file.buffer,
            userId: req.body.userId
        });

        res.status(200).send(`File uploaded successfully for the user ${req.body.userId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/pdfs', async (req, res) => {
    const userId = req.params.userId;

    try {
        const pdfs = await PdfModel.findAll();

        res.json(pdfs);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/pdfs/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const pdfs = await PdfModel.findOne({
            where: { userId: userId }
        });
        
        if (!pdfs) {
            return res.status(404).send('No pdf');
        }

        res.json(pdfs);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;