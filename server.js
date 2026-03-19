const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rota de health check SIMPLES (funciona SEMPRE)
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    time: new Date().toISOString(),
    message: 'Servidor funcionando perfeitamente!'
  });
});

// Rota de teste do banco (opcional - só usa SSL se configurado)
app.get('/api/health/db', async (req, res) => {
  try {
    // Se não tiver DATABASE_URL, retorna aviso (não erro)
    if (!process.env.DATABASE_URL) {
      return res.json({ 
        status: 'warning', 
        message: 'Banco de dados não configurado (isso é normal no ambiente local)'
      });
    }
    
    // Configuração do pool que FUNCIONA tanto local quanto na nuvem
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });
    
    const result = await pool.query('SELECT NOW()');
    await pool.end();
    
    res.json({ 
      status: 'ok', 
      time: result.rows[0].now,
      message: 'Banco de dados conectado com sucesso!'
    });
  } catch (err) {
    console.error('Erro no banco:', err.message);
    res.status(500).json({ 
      status: 'error', 
      message: err.message 
    });
  }
});

// Rota principal - serve o index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📁 Pasta pública: ${__dirname}\\public`);
  console.log(`🔗 Teste: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Acesse: http://localhost:${PORT}`);
});