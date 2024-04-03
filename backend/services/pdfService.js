const {PdfModel} = require('../models/Pdf');
const {Farmaceutico} = require('../models/Farmaceutico');

class PdfService {
    async getPdfByUserId(usuarioId) {
        try {
            const pdf = await PdfModel.findOne({ where: { usuarioId: usuarioId } });

            if (!pdf) {
                return null;
            }

            return pdf;
        } catch (error) {
            console.error(error);
            throw new Error('Erro na busca');
        }
    }

    async uploadPdf(req, res) {
        const file = req.file;
        console.log(file);
        if (file.mimetype !== 'application/pdf') {
            return res.status(400).json({message: 'Arquivo não é um pdf'});
        }

        try {
            const pdf = await PdfModel.create({
                filename: file.originalname,
                data: file.buffer,
                usuarioId: req.body.usuarioId
            });
            
            await Farmaceutico.update({
                curriculoId: pdf.id
            }, {
                where: {id: req.body.usuarioId}
            });

            return res.status(200).json({message: 'Curriculo salvo'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Erro no servidor'});
        }
    }
}

module.exports = new PdfService();
