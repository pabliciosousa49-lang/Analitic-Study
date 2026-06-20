// Ponto de entrada do backend CodeStudy AI.
// Configura Express, middlewares, rotas e inicializacao do servidor.

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const analysisRoutes = require('./routes/analysisRoutes');
const pdfRoutes = require('./routes/pdfRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'CodeStudy AI backend online.'
  });
});

app.use('/api', analysisRoutes);
app.use('/api', pdfRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`CodeStudy AI backend running on port ${port}`);
});
