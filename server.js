const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Única rota: health check
app.get('/api/health', (req, res) => {
  console.log('✅ Health check acessado');
  res.status(200).send('OK');
});

// Rota principal
app.get('/', (req, res) => {
  res.send('<h1>Workspace Pro</h1><p>Servidor funcionando!</p>');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});