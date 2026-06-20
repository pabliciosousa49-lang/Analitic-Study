// Rotas de geracao de PDF.

const express = require('express');
const pdfController = require('../controllers/pdfController');

const router = express.Router();

router.post('/pdf/:id', pdfController.generatePdf);

module.exports = router;
