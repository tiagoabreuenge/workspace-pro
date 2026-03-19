const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Railway vai passar a porta automaticamente

// Log de inicialização
console.log('🚀 Iniciando servidor...');
console.log('📁 Diretório atual:', __dirname);
console.log('🔧 Porta configurada pelo Railway:', PORT);

// Servir arquivos estáticos da pasta public
app.use(express.static('public'));

// Rota de health check
app.get('/api/health', (req, res) => {
  console.log('✅ Health check acessado em', new Date().toISOString());
  res.status(200).json({ 
    status: 'ok', 
    time: new Date().toISOString(),
    message: 'Servidor funcionando!',
    port: PORT
  });
});

// Rota principal - serve o index.html da pasta public
app.get('/', (req, res) => {
  console.log('🏠 Página inicial acessada');
  res.sendFile(__dirname + '/public/index.html');
});

// Para qualquer outra rota, tentar servir arquivo estático ou index.html
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
  console.log(`🌐 Acesse via Railway: https://workspace-pro.up.railway.app`);
});