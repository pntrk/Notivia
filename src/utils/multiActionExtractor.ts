/**
 * Çoklu Eylem Ayrıştırıcı (Multi-Action Meeting & Voice Memo Extractor)
 * Uzun ses kayıtlarından, toplantı notlarından veya ayaküstü söylenen birden fazla görevi
 * bağımsız eylem parçalarına bölerek her biri için temiz kartlar türetir.
 */

export interface ActionSegment {
  rawText: string;
  inferredTitle: string;
  hasTimeClue: boolean;
  timeClueText?: string;
}

/**
 * Türkçe bağlaçları ve cümle geçişlerini analiz ederek çoklu eylem parçacıklarına böler.
 */
export function splitMultiActionMemo(input: string): string[] {
  const text = input.trim();
  if (!text) return [];

  // Eğer girdi basit bir alışveriş listesiyse bölme (Market listesi action_items olarak ele alınır)
  const lower = text.toLowerCase();
  if (
    lower.startsWith('alınacaklar') ||
    lower.startsWith('market') ||
    lower.startsWith('pazar') ||
    (text.split(',').length > 3 && !text.includes('saat') && !text.includes('gün') && !text.includes('toplantı'))
  ) {
    return [text];
  }

  // Cümle ve bağlaç ayrıştırıcı regex (Nokta, noktalı virgül, "bir de", "ayrıca", "sonra", "ertesi gün")
  const splitDelimiters = /(?:\r?\n|;|\.\s+(?=[A-ZÇĞİÖŞÜa-zçğıöşü])|\b(?:bir de|ayrıca|ardından|daha sonra|sonra da|öte yandan)\b)/gi;

  const rawChunks = text.split(splitDelimiters);
  const cleanChunks: string[] = [];

  for (const chunk of rawChunks) {
    const trimmed = chunk.trim().replace(/^[,\s\-•*]+/, '').replace(/[,\s]+$/, '');
    // Anlamlı uzunluktaki parçaları al (en az 3 kelime veya net eylem)
    if (trimmed.length > 5 && trimmed.split(/\s+/).length >= 2) {
      cleanChunks.push(trimmed);
    }
  }

  // Eğer parçalama sonucunda birden fazla anlamlı eylem çıktıysa onları dön, aksi halde orijinal metni dön
  return cleanChunks.length > 1 ? cleanChunks : [text];
}

/**
 * Girdinin çoklu toplantı/sesli not niteliğinde olup olmadığını denetler.
 */
export function isMultiActionMemo(input: string): boolean {
  const segments = splitMultiActionMemo(input);
  return segments.length >= 2;
}
