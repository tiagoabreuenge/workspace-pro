const express = require('express');
const path = require('path');
const app = express();

// A PORTA que o Railway fornece (sempre usar process.env.PORT)
const PORT = process.env.PORT || 3000;

// Logs detalhados
console.log('🚀 Iniciando servidor...');
console.log('📁 Diretório atual:', __dirname);
console.log('🔧 PORT environment:', process.env.PORT);
console.log('🔧 Porta usada:', PORT);

// Servir arquivos estáticos - CAMINHO ABSOLUTO
const publicPath = path.join(__dirname, 'public');
console.log('📁 Pasta public:', publicPath);

app.use(express.static(publicPath));

// Health check - ROTA CRÍTICA para o Railway
app.get('/api/health', (req, res) => {
  console.log('✅ Health check acessado em', new Date().toISOString());
  res.status(200).send('OK');
});

// Rota principal
app.get('/', (req, res) => {
  console.log('🏠 Página inicial acessada');
  const indexPath = path.join(publicPath, 'index.html');
  console.log('📄 Servindo:', indexPath);
  res.sendFile(indexPath);
});

// Iniciar servidor - OUVINDO EM TODAS INTERFACES
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
  console.log(`🌐 Local: http://localhost:${PORT}`);
  console.log(`🌐 Railway: https://workspace-pro.up.railway.app`);
});