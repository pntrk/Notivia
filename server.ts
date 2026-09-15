import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseWithGemini } from './src/server/geminiParser.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Health endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    engine: 'Notivia Cognitive Parser',
    has_api_key: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
  });
});

// Cognitive Parsing Endpoint
app.post('/api/parse', async (req, res) => {
  const startTime = Date.now();
  try {
    const { input, current_datetime } = req.body;
    const cleanInput = String(input || '').trim();
    const currentDt = String(current_datetime || new Date().toISOString());

    if (!cleanInput) {
      return res.status(400).json({
        success: false,
        error: 'Kullanıcı girdisi boş olamaz.',
      });
    }

    const { data, source } = await parseWithGemini(cleanInput, currentDt);
    const processingTime = Date.now() - startTime;

    return res.json({
      success: true,
      data: {
        id: `notivia-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        created_at: new Date().toISOString(),
        raw_input: cleanInput,
        reference_datetime: currentDt,
        ...data,
        engine_meta: {
          model: source === 'gemini-3.8-flash' ? 'gemini-3.8-flash' : 'Cognitive Inference Engine',
          processing_time_ms: processingTime,
          source,
        },
      },
    });
  } catch (error: any) {
    console.error('[Notivia Server Error]:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Ayrıştırma işlemi sırasında sunucu hatası oluştu.',
    });
  }
});

// Serve Vite production build if dist exists
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Notivia] Core Engine server running on http://0.0.0.0:${PORT}`);
});
