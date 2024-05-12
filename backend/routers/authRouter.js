const express = require('express');
const router = express();
const controller = require('../controllers/authController');

router.post('/cadastro', (req, res) => controller.cadastrarUsuario(req, res));
router.post('/login', (req, res) => controller.logarUsuario(req, res));
router.post('/reset-link', (req, res) => controller.criarLinkResetSenha(req, res));
router.post('/reset', (req, res) => controller.resetarSenha(req, res));

module.exports = router;