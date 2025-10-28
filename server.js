// server.js  :contentReference[oaicite:0]{index=0}
const express   = require('express');
const cors      = require('cors');
const youtubedl = require('youtube-dl-exec');
const path      = require('path');

const app = express();
app.use(cors());

// 1) Serve todo o front-end de public/
app.use(express.static(path.join(__dirname, 'public')));

// 2) Rota de download (só UMA vez)
app.get('/download', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Parâmetro url é obrigatório');

  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');

  try {
    // Formato otimizado para TikTok, Instagram e YouTube
    const proc = youtubedl.raw(url, {
      format: 'best[ext=mp4]/best',
      output: '-',
      noWarnings: true,
      extractFlat: false
    });
    proc.stdout.pipe(res);
  } catch (err) {
    console.error('YTDL error:', err);
    res.status(500).send('Erro no servidor ao baixar vídeo');
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando em:`);
  console.log(`   Local: http://localhost:${PORT}`);
  console.log(`   Rede:  http://172.16.42.65:${PORT}`);
  console.log(`\n💡 Para acessar no celular:`);
  console.log(`   1. Conecte o celular na mesma rede WiFi`);
  console.log(`   2. Descubra seu IP com: ipconfig (Windows) ou ifconfig (Mac/Linux)`);
  console.log(`   3. Acesse http://172.16.42.65:${PORT} no navegador do celular`);
});
