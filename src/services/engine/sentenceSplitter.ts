// src/services/engine/sentenceSplitter.ts

export function splitCompoundUtterance(rawText: string): string[] {
  // Zaman geçişleri, noktalama ve sıralı eylem bağlaçları
  const splitPattern = /(?:[\.\n;]+|\s+(?:sonra da|ardından|ve de|ayrıca|dönerken de|çıkışta da)\s+|(?<=\b(?:yapayım|gideyim|edeyim|alırım|bakarım|ödeyim))\s*,\s*)/i;

  const segments = rawText
    .split(splitPattern)
    .map(s => s.trim())
    .filter(s => s.length > 4);

  return segments.length > 0 ? segments : [rawText];
}
