const ngrok = require("@ngrok/ngrok");
require("dotenv").config();

async function iniciaNgrok() {
    try {
        const ngrokConfig = {
            addr: 3000,
            authtoken: process.env.NGROK_TOKEN,
            domain: "stable-phoenix-worthy.ngrok-free.app"
        }

        return await ngrok.connect(ngrokConfig);
    } catch(e) {
        console.log('Erro ao conectar com ngrok:', e);
        process.exit();
    }
}

module.exports = iniciaNgrok();