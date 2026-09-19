/**
 * Notivia Sayısal Parametre ve Varlık Çıkarıcı (Entity & Metric Extractor)
 * Kullanıcının metin içerisindeki kritik basınç, tutar, sıcaklık, vital bulgular,
 * dosya numaraları ve süreleri ayrıştırıp görsel rozetlere ve risk seviyelerine dönüştürür.
 */

import { ExtractedMetric } from '../types/notivia.ts';

export function extractEntityMetrics(text: string): ExtractedMetric[] {
  if (!text || typeof text !== 'string') return [];

  const metrics: ExtractedMetric[] = [];
  const lower = text.toLowerCase();

  // 1. Basınç Metrikleri (Bar, PSI)
  const pressureMatch = text.match(/(\d+(?:[.,]\d+)?)\s*(bar|psi)\b/i);
  if (pressureMatch) {
    const val = parseFloat(pressureMatch[1].replace(',', '.'));
    const unit = pressureMatch[2].toUpperCase();
    let alertLevel: 'normal' | 'warning' | 'danger' = 'normal';
    let alertMsg: string | undefined;

    if (unit === 'BAR') {
      if (lower.includes('kombi') || lower.includes('petek')) {
        if (val < 1.0) {
          alertLevel = 'danger';
          alertMsg = 'Kritik Düşük Basınç: Su takviyesi (1.5 Bar) gereklidir!';
        } else if (val > 2.5) {
          alertLevel = 'warning';
          alertMsg = 'Yüksek Basınç: Emniyet ventili tahliyesi gerekebilir.';
        }
      } else if (lower.includes('scba') || lower.includes('tüp') || lower.includes('itfaiye')) {
        if (val < 200) {
          alertLevel = 'danger';
          alertMsg = 'SCBA Solunum Tüpü: 300 Bar altında, acil dolum gerekli!';
        }
      }
    }

    metrics.push({
      id: `metric-pressure-${Date.now()}`,
      type: 'pressure',
      label: 'Sistem Basıncı',
      value: `${val} ${unit}`,
      unit,
      raw: pressureMatch[0],
      alertLevel,
      alertMsg
    });
  }

  // 2. Parasal / Finansal Tutarlar (TL, USD, EUR, Bin TL)
  const moneyMatch = text.match(/(\d+(?:[.,]\d+)?(?:\.\d{3})*)\s*(tl|türk lirası|lira|usd|\$|eur|euro|bin tl|milyon tl)\b/i);
  if (moneyMatch) {
    const rawVal = moneyMatch[1];
    const unit = moneyMatch[2].toUpperCase();
    metrics.push({
      id: `metric-money-${Date.now()}`,
      type: 'money',
      label: 'Finansal Tutar',
      value: `${rawVal} ${unit}`,
      unit,
      raw: moneyMatch[0],
      alertLevel: 'normal'
    });
  }

  // 3. Sıcaklık / Soğuk Zincir / HACCP Değerleri (°C / Derece)
  const tempMatch = text.match(/([+-]?\d+(?:[.,]\d+)?)\s*(?:°c|derece|celsius)\b/i) ||
                    text.match(/(\d+\s*-\s*\d+)\s*(?:°c|derece)\b/i);
  if (tempMatch) {
    const rawVal = tempMatch[1];
    let alertLevel: 'normal' | 'warning' | 'danger' = 'normal';
    let alertMsg: string | undefined;

    if (lower.includes('soğuk zincir') || lower.includes('aşı') || lower.includes('ilaç')) {
      alertLevel = 'warning';
      alertMsg = 'Soğuk Zincir İzlemi: 2°C ile 8°C arası stabilite kontrol edilmelidir.';
    } else if (lower.includes('soğuk oda') || lower.includes('haccp') || lower.includes('et')) {
      alertLevel = 'normal';
      alertMsg = 'HACCP Gıda Güvenliği: +4°C / -18°C derece log kontrolü.';
    }

    metrics.push({
      id: `metric-temp-${Date.now()}`,
      type: 'temp',
      label: 'Sıcaklık Değeri',
      value: `${rawVal} °C`,
      unit: '°C',
      raw: tempMatch[0],
      alertLevel,
      alertMsg
    });
  }

  // 4. Medikal ve Vital Bulgular (Tansiyon, Kan Şekeri, Doz)
  const bpMatch = text.match(/(\d{2,3})\s*[\/:]\s*(\d{2,3})\s*(?:tansiyon)?\b/i);
  if (bpMatch) {
    const sys = parseInt(bpMatch[1], 10);
    const dia = parseInt(bpMatch[2], 10);
    let alertLevel: 'normal' | 'warning' | 'danger' = 'normal';
    let alertMsg: string | undefined;

    if (sys >= 140 || dia >= 90) {
      alertLevel = 'warning';
      alertMsg = 'Yüksek Tansiyon (Hipertansiyon) Bulgusu.';
    } else if (sys < 90 || dia < 60) {
      alertLevel = 'warning';
      alertMsg = 'Düşük Tansiyon (Hipotansiyon) Bulgusu.';
    }

    metrics.push({
      id: `metric-vital-bp-${Date.now()}`,
      type: 'vital',
      label: 'Tansiyon',
      value: `${sys}/${dia} mmHg`,
      unit: 'mmHg',
      raw: bpMatch[0],
      alertLevel,
      alertMsg
    });
  }

  // 5. Resmi Dosya & Esas Numaraları / Kanun Maddeleri
  const officialMatch = text.match(/(\d{4}\s*\/\s*\d+)\s*(?:esas|karar|dosya|d\.iş)\b/i) ||
                        text.match(/(?:4734|3071|657|hmk|cmk|vuk)\s*(?:sayılı)?\s*(?:kanun|madde)?\b/i);
  if (officialMatch) {
    metrics.push({
      id: `metric-official-${Date.now()}`,
      type: 'official',
      label: 'Resmi Kod / Dosya No',
      value: officialMatch[0].trim(),
      raw: officialMatch[0],
      alertLevel: 'normal'
    });
  }

  // 6. Ada / Parsel ve Alan Metrikleri (Emlak / Gayrimenkul)
  const landMatch = text.match(/(\d+)\s*ada\s*(\d+)\s*parsel/i) ||
                    text.match(/(\d+(?:[.,]\d+)?)\s*(?:m2|m²|metrekare)\b/i);
  if (landMatch) {
    metrics.push({
      id: `metric-land-${Date.now()}`,
      type: 'official',
      label: 'Kadastro / Alan Bilgisi',
      value: landMatch[0].trim(),
      raw: landMatch[0],
      alertLevel: 'normal'
    });
  }

  // 7. Denizcilik Draft / Tonaj Metrikleri
  const marineMatch = text.match(/(\d+(?:[.,]\d+)?)\s*(?:metre|m)\s*draft/i) ||
                      text.match(/(\d+(?:[.,]\d+)?)\s*(?:ton|mt)\s*(?:balast|yakıt|bunker|kumanya)/i);
  if (marineMatch) {
    metrics.push({
      id: `metric-marine-${Date.now()}`,
      type: 'official',
      label: 'Denizcilik Parametresi',
      value: marineMatch[0].trim(),
      raw: marineMatch[0],
      alertLevel: 'normal'
    });
  }

  // 8. Mikroçip & GTİP Kodları
  const codeMatch = text.match(/(?:çip|cip|mikroçip)\s*(?:no|numarası)?\s*:?\s*(\d{10,15})/i) ||
                    text.match(/gtip\s*(?:kodu)?\s*:?\s*(\d{8,12})/i);
  if (codeMatch) {
    metrics.push({
      id: `metric-code-${Date.now()}`,
      type: 'official',
      label: 'Resmi Çip / GTİP Kodu',
      value: codeMatch[0].trim(),
      raw: codeMatch[0],
      alertLevel: 'normal'
    });
  }

  // 9. Bilişim & Siber Güvenlik Parametreleri (EPS, IP/VLAN, CVE, Port)
  const itMatch = text.match(/(\d+)\s*(?:eps|events?\s*per\s*second)\b/i) ||
                  text.match(/(?:vlan|port)\s*(\d+)\b/i) ||
                  text.match(/(?:cve-\d{4}-\d{4,7})/i) ||
                  text.match(/\b(?:192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|172\.(?:1[6-9]|2\d|3[01])\.\d+\.\d+)(?:\/\d+)?\b/);
  if (itMatch) {
    metrics.push({
      id: `metric-it-${Date.now()}`,
      type: 'official',
      label: 'Bilişim & Ağ Parametresi',
      value: itMatch[0].trim(),
      raw: itMatch[0],
      alertLevel: 'normal'
    });
  }

  return metrics;
}
