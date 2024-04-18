const express = require('express');
const router = express();
const {verifyToken} = require("../config/jwt");
const fs = require('fs');
const path = require("node:path");

router.use(verifyToken);

router.post('/contato', async (req, res) => {
    try {
        const caminho = path.normalize(path.join(__dirname, '../', 'contato'));
        await fs.readdir(caminho, (err, files) => {
            if (err) {
                console.log(err);
                throw new Error();
            }
            const numeroArquivos = files.length | 0;
            const nomeArquivo = `contato_${numeroArquivos}`;
            
            const mensagem = JSON.stringify(req.body);

            const writeStream = fs.createWriteStream(`${caminho}/${nomeArquivo}`);
            writeStream.write(mensagem);
            writeStream.end();
        });

        return res.status(200).send('Mensagem recebida!');
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});

module.exports = router;