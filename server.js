const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rota de health check - MAIS SIMPLES POSSÍVEL (não usa banco)
app.get('/api/health', (req, res) => {
  console.log('✅ Health check recebido');
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    message: 'Servidor funcionando!'
  });
});

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Iniciar servidor - IMPORTANTE: ouvir em 0.0.0.0 para funcionar no Railway
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📁 Pasta pública: ${__dirname}/public`);
  console.log(`🔗 Health check: /api/health`);
});