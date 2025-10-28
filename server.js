// server.js  :contentReference[oaicite:0]{index=0}
const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const app = express();
app.use(cors());

// 1) Serve todo o front-end de public/
app.use(express.static(path.join(__dirname, 'public')));

// Rota para testar URL (proxy para Python)
app.get('/test', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'URL obrigatória' });

  try {
    const response = await axios.get(`http://localhost:5000/test?url=${encodeURIComponent(url)}`);
    res.json(response.data);
  } catch (err) {
    console.error('Test error:', err.message);
    const errorData = err.response?.data || { error: 'Erro na conexão com serviço Python' };
    res.status(err.response?.status || 500).json(errorData);
  }
});

// Rota de download (proxy para Python)
app.get('/download', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('URL obrigatória');

  console.log('Redirecionando download para Python:', url);

  try {
    const response = await axios({
      method: 'GET',
      url: `http://localhost:5000/download?url=${encodeURIComponent(url)}`,
      responseType: 'stream'
    });

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');
    res.setHeader('Access-Control-Allow-Origin', '*');

    response.data.pipe(res);
    
  } catch (err) {
    console.error('Download proxy error:', err.message);
    res.status(500).send('Erro no serviço de download: ' + err.message);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando em:`);
  console.log(`   Local: http://localhost:${PORT}`);
  console.log(`   Rede:  http://[SEU_IP]:${PORT}`);
  console.log(`\n💡 Para acessar no celular:`);
  console.log(`   1. Conecte o celular na mesma rede WiFi`);
  console.log(`   2. Descubra seu IP com: ipconfig`);
  console.log(`   3. Acesse http://[SEU_IP]:${PORT} no celular`);
  console.log(`\n🔧 Rotas disponíveis:`);
  console.log(`   GET /test?url=... - Testa URL (via Python)`);
  console.log(`   GET /download?url=... - Baixa vídeo (via Python)`);
  console.log(`\n🐍 Certifique-se que o serviço Python está rodando na porta 5000`);
});
