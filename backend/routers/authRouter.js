const express = require('express');
const router = express();
const controller = require('../controllers/authController');

router.post('/cadastro', async (req, res) => controller.cadastrarUsuario(req, res));
router.post('/login', async (req, res) => controller.logarUsuario(req, res));

module.exports = router;