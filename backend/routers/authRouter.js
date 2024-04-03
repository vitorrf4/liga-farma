const express = require('express');
const router = express();
const controller = require('../controllers/authController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/auth/cadastro',
            (req, res) => controller.cadastrarUsuario(req, res));
router.post('/auth/login', (req, res) => controller.logarUsuario(req, res));

module.exports = router;