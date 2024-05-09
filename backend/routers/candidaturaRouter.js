const express = require('express');
const router = express();
const controller = require('../controllers/candidaturaController');
const {verifyToken} = require("../config/jwt");

router.use(verifyToken);

router.get('/', (req, res) => controller.getCandidaturas(req, res));
router.get('/:id', (req, res) => controller.getCandidaturaPorId(req, res));
router.get('/pessoa/:id', (req, res) => controller.getCandidaturaPorPessoaId(req, res));
router.post('/', (req, res) => controller.cadastrarCandidatura(req, res));
router.put('/', (req, res) => controller.atualizarCandidatura(req, res));
router.delete('/:id', (req, res) => controller.deletarCandidatura(req, res));

module.exports = router;