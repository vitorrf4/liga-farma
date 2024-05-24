const {PdfModel} = require('../models/Pdf');
const {Farmaceutico} = require('../models/Farmaceutico');

class PdfController {
    async getPdfByUserId(req, res) {
        try {
            const usuarioId = req.params.usuarioId;

            const pdf = await PdfModel.findOne({ where: { usuarioId: usuarioId } });

            if (!pdf) {
                return res.status(404).send('Item não encontrado');
            }

            return res.status(200).json(pdf);
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro na busca');
        }
    }

    async uploadPdf(req, res) {
        try {
            const { usuarioId } = req.body;
            const file = req.file;
            const extensao = file.originalname.split('.').pop().toLowerCase();
            
            if (file.mimetype !== 'application/pdf' ||
                extensao !== 'pdf') 
            {
                return res.status(400).json({message: 'Arquivo inválido'});
            }
            
            let pdf = await PdfModel.findOne({where: { usuarioId:  usuarioId}}); 
            
            if (!pdf) {
                pdf = await PdfModel.create({
                    filename: file.originalname,
                    data: file.buffer,
                    usuarioId: req.body.usuarioId
                });

                return res.status(200).send({curriculoId: pdf.id});
            }
            
            pdf.data = file.buffer;
            pdf.filename = file.originalname;
            await pdf.save();
            
            return res.status(200).send({curriculoId: pdf.id});
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Erro no servidor'});
        }
    }

    async updatePdf(req, res) {
        try {
            const file = req.file;

            if (file.mimetype !== 'application/pdf' ||
                !file.originalname.endsWith('.pdf'))
            {
                return res.status(400).json({message: 'Arquivo inválido'});
            }

            const atualizacoes = await Farmaceutico.update({
                filename: file.originalname,
                data: file.buffer,
            }, {
                where: {id: usuarioId}
            });

            if (atualizacoes[0] <= 0) {
                return res.status(404).json({error: 'Curriculo não encontrado'});
            }
            
            return res.status(200).send();
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Erro no servidor'});
        }
    }
}

module.exports = new PdfController();
