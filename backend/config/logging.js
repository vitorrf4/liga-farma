function logNoArquivo() {
    const fs = require('fs');
    const path = require('path');

    const logFilePath = path.join(process.cwd(), '../logs/log.txt');
    const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

    const originalLog = console.log;
    console.log = function(...args) {
        const message = args.join(' ');
        const dataAtual = new Date(Date.now());
        
        const formatacao = new Intl.DateTimeFormat('pt-br', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            timeZone: 'America/Sao_Paulo'
        });
        const dataFormatada = formatacao.format(dataAtual);
        const mensagem = `[${dataFormatada}] ${message}\n`;

        logStream.write(mensagem);

        originalLog.apply(console, [mensagem]);
    };
}

module.exports = logNoArquivo;
