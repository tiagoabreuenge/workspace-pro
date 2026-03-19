const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Log de inicialização
console.log('🚀 Iniciando servidor...');
console.log('📁 Diretório atual:', __dirname);
console.log('🔧 Porta configurada:', PORT);

// Rota de health check SIMPLES
app.get('/api/health', (req, res) => {
  console.log('✅ Health check acessado em', new Date().toISOString());
  res.status(200).json({ 
    status: 'ok', 
    time: new Date().toISOString(),
    message: 'Servidor funcionando!'
  });
});

// Rota principal
app.get('/', (req, res) => {
  console.log('🏠 Página inicial acessada');
  res.send(`
    <html>
      <head><title>Workspace Pro</title></head>
      <body>
        <h1>🚀 Workspace Pro</h1>
        <p>Servidor funcionando perfeitamente!</p>
        <p><a href="/api/health">Testar Health Check</a></p>
      </body>
    </html>
  `);
});

// Iniciar servidor - OUVINDO EM 0.0.0.0 (obrigatório para Railway)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
  console.log(`🌐 Acesse: http://localhost:${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});

// Tratamento de erros
app.on('error', (err) => {
  console.error('❌ Erro no servidor:', err);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Erro não capturado:', err);
});