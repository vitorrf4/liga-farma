const express = require('express');
const router = express();
const controller = require('../controllers/authController');

router.post('/auth/cadastro', async (req, res) => controller.cadastrarUsuario(req, res));
router.post('/auth/login', async (req, res) => controller.logarUsuario(req, res));

module.exports = router;