const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {PdfModel} = require('../models/Pdf');

class PdfService {
    async getPdfByUserId(usuarioId) {
        try {
            const pdf = await PdfModel.findOne({ where: { usuarioId: usuarioId } });

            if (!pdf) {
                throw new Error('Item não encontrado');
            }

            return pdf;
        } catch (error) {
            console.error(error);
            throw new Error('Erro na busca');
        }
    }

    async uploadPdf(file, usuarioId) {
        if (file.mimetype !== 'application/pdf') {
            throw new Error('Arquivo não é um PDF');
        }

        try {
            await PdfModel.create({
                filename: file.originalname,
                data: file.buffer,
                usuarioId: usuarioId
            });

            return 'Arquivo salvo com sucesso';
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao salvar');
        }
    }

    getUploadMiddleware() {
        return upload.single('pdf');
    }
}

module.exports = new PdfService();
