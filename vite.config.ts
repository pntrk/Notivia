import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import dotenv from 'dotenv';
import { parseWithGemini, parseWithAIAndImage } from './src/server/geminiParser.ts';

dotenv.config();

function notiviaApiPlugin(): Plugin {
  return {
    name: 'notivia-api-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/health' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              status: 'ok',
              engine: 'Notivia Cognitive Parser',
              has_api_key: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
            })
          );
          return;
        }

        if (req.url === '/api/parse-simple' && req.method === 'POST') {
          let bodyStr = '';
          req.on('data', (chunk) => {
            bodyStr += chunk;
          });
          req.on('end', async () => {
            try {
              const body = JSON.parse(bodyStr || '{}');
              const input = String(body.input || body.text || '').trim();
              const currentDatetime = String(body.current_datetime || new Date().toISOString());
              const base64Image = body.base64Image || body.image || null;
              const pastNotes = body.past_notes || body.gecmis_notlar || body.history || [];

              if (!input && !base64Image) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: 'Kullanıcı girdisi veya görsel boş olamaz.' }));
                return;
              }

              const simple = await parseWithAIAndImage(input, base64Image, currentDatetime, pastNotes);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, data: simple }));
            } catch (err: any) {
              console.error('[Vite Plugin API /api/parse-simple error]:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: false,
                  error: err?.message || 'Ayrıştırma hatası.',
                })
              );
            }
          });
          return;
        }

        if (req.url === '/api/parse' && req.method === 'POST') {
          let bodyStr = '';
          req.on('data', (chunk) => {
            bodyStr += chunk;
          });
          req.on('end', async () => {
            const startTime = Date.now();
            try {
              const body = JSON.parse(bodyStr || '{}');
              const input = String(body.input || '').trim();
              const currentDatetime = String(body.current_datetime || new Date().toISOString());

              if (!input) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: 'Kullanıcı girdisi boş olamaz.' }));
                return;
              }

              const { data, source } = await parseWithGemini(input, currentDatetime);
              const processingTime = Date.now() - startTime;

              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: true,
                  data: {
                    id: `notivia-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
                    created_at: new Date().toISOString(),
                    raw_input: input,
                    reference_datetime: currentDatetime,
                    ...data,
                    engine_meta: {
                      model: source === 'gemini-3.8-flash' ? 'gemini-3.8-flash' : 'Cognitive Inference Engine',
                      processing_time_ms: processingTime,
                      source,
                    },
                  },
                })
              );
            } catch (err: any) {
              console.error('[Vite Plugin API /api/parse error]:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: false,
                  error: err?.message || 'Bilişsel ayrıştırma sırasında hata oluştu.',
                })
              );
            }
          });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), notiviaApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
