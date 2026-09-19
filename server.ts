// server.ts
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseSimpleWithGemini, parseWithAIAndImage } from './src/server/geminiParser.ts';
import { dispatchWithGemini } from './src/server/dispatcherAgent.ts';
import { splitCompoundUtterance, evaluateConfidence } from './src/services/engine/PersonalCognitiveOrchestrator.ts';
import { sanitizeSpokenText } from './src/utils/speechSanitizer.ts';
import { detectDomainFromJargon } from './src/utils/jargonRadar.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '15mb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    engine: 'Notivia Cognitive Parser v2.5',
    has_api_key: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
  });
});

// Çoklu Cümle Destekli Ayrıştırma Endpoint'i
app.post('/api/parse-simple', async (req, res) => {
  try {
    const { input, text, current_datetime, base64Image, image, past_notes, userDomain, preferredDomain, domain, language } = req.body;
    const rawInput = String(input || text || '').trim();
    const cleanInput = sanitizeSpokenText(rawInput) || rawInput;
    const now = String(current_datetime || new Date().toISOString());
    const media = base64Image || image || null;
    const past = Array.isArray(past_notes) ? past_notes : [];
    const requestedDomain = userDomain || preferredDomain || domain || 'GENEL';
    const lang = language === 'en' ? 'en' : 'tr';

    if (!cleanInput && !media) {
      return res.status(400).json({ success: false, error: 'Girdi veya görsel boş olamaz.' });
    }

    // 0 MS JARGON RADARI ÇALIŞTIRILIYOR
    const radar = detectDomainFromJargon(cleanInput, requestedDomain);
    const activeDomain = (radar.confidence >= 0.4 && radar.detectedDomain !== 'GENEL')
      ? radar.detectedDomain
      : requestedDomain;

    // Görsel varsa tekil analiz et
    if (media) {
      const singleResult = await parseWithAIAndImage(cleanInput, media, now, past, activeDomain, lang);
      if (!singleResult.tarih_iso && radar.implicitHour !== undefined) {
        const d = new Date(now);
        d.setHours(radar.implicitHour, radar.implicitMinute || 0, 0, 0);
        singleResult.tarih_iso = d.toISOString();
      }

      const enhancedData = {
        ...singleResult,
        ikon: singleResult.ikon || radar.suggestedIcon,
        renk: singleResult.renk || radar.suggestedColor,
      };

      return res.json({
        success: true,
        is_compound: false,
        data: enhancedData,
        items: [enhancedData],
        radarMeta: radar,
      });
    }

    // Bileşik cümle parçalayıcıyı çalıştır
    const segments = splitCompoundUtterance(cleanInput);

    if (segments.length <= 1) {
      const single = await parseWithAIAndImage(cleanInput, null, now, past, activeDomain, lang);

      // Eğer radarda örtük saat kancası varsa ve LLM saat bulamadıysa radardan besle
      if (!single.tarih_iso && radar.implicitHour !== undefined) {
        const d = new Date(now);
        d.setHours(radar.implicitHour, radar.implicitMinute || 0, 0, 0);
        single.tarih_iso = d.toISOString();
      }

      const enhancedData = {
        ...single,
        ikon: single.ikon || radar.suggestedIcon,
        renk: single.renk || radar.suggestedColor,
      };

      return res.json({
        success: true,
        is_compound: false,
        data: enhancedData,
        items: [enhancedData],
        radarMeta: radar,
      });
    }

    // Birden fazla eylem varsa paralel çöz
    const parsedItems = await Promise.all(
      segments.map(async (seg) => {
        const segRadar = detectDomainFromJargon(seg, activeDomain);
        const segDomain = (segRadar.confidence >= 0.4 && segRadar.detectedDomain !== 'GENEL')
          ? segRadar.detectedDomain
          : activeDomain;

        const item = await parseWithAIAndImage(seg, null, now, past, segDomain, lang);

        if (!item.tarih_iso && segRadar.implicitHour !== undefined) {
          const d = new Date(now);
          d.setHours(segRadar.implicitHour, segRadar.implicitMinute || 0, 0, 0);
          item.tarih_iso = d.toISOString();
        }

        const confidence = evaluateConfidence(item as any, seg);
        return {
          ...item,
          ikon: item.ikon || segRadar.suggestedIcon,
          renk: item.renk || segRadar.suggestedColor,
          confidence,
          radarMeta: segRadar,
        };
      })
    );

    return res.json({
      success: true,
      is_compound: true,
      count: parsedItems.length,
      data: parsedItems[0],
      items: parsedItems,
      radarMeta: radar,
    });
  } catch (error: any) {
    console.error('[Notivia Parse Error]:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Ayrıştırma hatası.' });
  }
});

// Otonom Ajan Yönlendirici (Çoklu Ajan Destekli)
app.post('/api/dispatch', async (req, res) => {
  try {
    const { input, current_datetime, userDomain, preferredDomain, domain, language } = req.body;
    const rawInput = String(input || '').trim();
    const cleanInput = sanitizeSpokenText(rawInput) || rawInput;
    const now = String(current_datetime || new Date().toISOString());
    const requestedDomain = userDomain || preferredDomain || domain || 'GENEL';
    const lang = language === 'en' ? 'en' : 'tr';

    if (!cleanInput) {
      return res.status(400).json({ success: false, error: 'Girdi boş olamaz.' });
    }

    // 0 MS JARGON RADARI ÇALIŞTIRILIYOR
    const radar = detectDomainFromJargon(cleanInput, requestedDomain);
    const activeDomain = (radar.confidence >= 0.4 && radar.detectedDomain !== 'GENEL')
      ? radar.detectedDomain
      : requestedDomain;

    const segments = splitCompoundUtterance(cleanInput);

    // Tekil ise doğrudan ajana gönder
    if (segments.length <= 1) {
      const singleResult = await dispatchWithGemini(cleanInput, now, activeDomain, lang);
      return res.json({
        success: true,
        is_compound: false,
        data: singleResult,
        items: [singleResult],
        radarMeta: radar,
      });
    }

    // Çoklu niyet varsa her segmente ayrı karar ver
    const dispatchedList = await Promise.all(
      segments.map(async (seg) => {
        const segRadar = detectDomainFromJargon(seg, activeDomain);
        const segDomain = (segRadar.confidence >= 0.4 && segRadar.detectedDomain !== 'GENEL')
          ? segRadar.detectedDomain
          : activeDomain;
        const resObj = await dispatchWithGemini(seg, now, segDomain, lang);
        return {
          ...resObj,
          radarMeta: segRadar,
        };
      })
    );

    return res.json({
      success: true,
      is_compound: true,
      count: dispatchedList.length,
      data: dispatchedList[0],
      items: dispatchedList,
      radarMeta: radar,
    });
  } catch (error: any) {
    console.error('[Notivia Dispatcher Error]:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Yönlendirme hatası.' });
  }
});

const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Notivia] Core Engine v2.5 running on http://0.0.0.0:${PORT}`);
});
