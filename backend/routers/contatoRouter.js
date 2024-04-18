const express = require('express');
const router = express();
const {verifyToken} = require("../config/jwt");
const fs = require('fs');

router.use(verifyToken);

router.post('/contato', (req, res) => {
    try {
        let numeroArquivos;
        fs.readdir('contrato', (err, files) => numeroArquivos = files);
        const nomeArquivo = `contato_${numeroArquivos}`; 
        
        const writeStream = fs.createWriteStream(`contrato/${nomeArquivo}`);
        writeStream.write(req.body);
        writeStream.end();
            
        return res.status(200).send('Mensagem recebida!');
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
});

module.exports = router;