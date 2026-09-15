import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseWithGemini, parseSimpleWithGemini, parseWithAIAndImage } from './src/server/geminiParser.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '15mb' }));

// Health endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    engine: 'Notivia Cognitive Parser',
    has_api_key: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
  });
});

// Simple 5-field parsing endpoint matching exact user prompt (with image support)
app.post('/api/parse-simple', async (req, res) => {
  try {
    const { input, text, current_datetime, base64Image, image, past_notes, gecmis_notlar, history } = req.body;
    const cleanInput = String(input || text || '').trim();
    const now = String(current_datetime || new Date().toISOString());
    const media = base64Image || image || null;
    const past = Array.isArray(past_notes) ? past_notes : Array.isArray(gecmis_notlar) ? gecmis_notlar : Array.isArray(history) ? history : [];

    if (!cleanInput && !media) {
      return res.status(400).json({
        success: false,
        error: 'Kullanıcı girdisi veya görsel boş olamaz.',
      });
    }

    const simple = await parseWithAIAndImage(cleanInput, media, now, past);
    return res.json({
      success: true,
      data: simple,
    });
  } catch (error: any) {
    console.error('[Notivia Simple Parse Error]:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Ayrıştırma hatası.',
    });
  }
});

// Cognitive Parsing Endpoint
app.post('/api/parse', async (req, res) => {
  const startTime = Date.now();
  try {
    const { input, current_datetime, past_notes, gecmis_notlar, history } = req.body;
    const cleanInput = String(input || '').trim();
    const currentDt = String(current_datetime || new Date().toISOString());
    const past = Array.isArray(past_notes) ? past_notes : Array.isArray(gecmis_notlar) ? gecmis_notlar : Array.isArray(history) ? history : [];

    if (!cleanInput) {
      return res.status(400).json({
        success: false,
        error: 'Kullanıcı girdisi boş olamaz.',
      });
    }

    const simple = await parseSimpleWithGemini(cleanInput, currentDt, past);
    const { data, source } = await parseWithGemini(cleanInput, currentDt, past);
    const processingTime = Date.now() - startTime;

    return res.json({
      success: true,
      simple,
      data: {
        id: `notivia-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        created_at: new Date().toISOString(),
        raw_input: cleanInput,
        reference_datetime: currentDt,
        ...data,
        summary: simple.baslik || data.summary,
        detailed_note: simple.zaman || data.detailed_note,
        teshis_notu: simple.teshis_notu || data.teshis_notu || null,
        anomali_notu: simple.anomali_notu || data.anomali_notu || null,
        calendar_event: {
          ...data.calendar_event,
          start_datetime: simple.tarih_iso || data.calendar_event.start_datetime,
        },
        ui_meta: {
          ...data.ui_meta,
          icon: simple.ikon || data.ui_meta.icon,
          color_hex: simple.renk || data.ui_meta.color_hex,
        },
        engine_meta: {
          model: source.startsWith('gemini') ? source : 'Cognitive Inference Engine',
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
