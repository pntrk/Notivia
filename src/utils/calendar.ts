import type { NotiviaParsedNote } from '../types/notivia.ts';

export function createGoogleCalendarUrl(note: NotiviaParsedNote): string | null {
  if (!note.calendar_event.has_event || !note.calendar_event.start_datetime) {
    return null;
  }

  try {
    const startDate = new Date(note.calendar_event.start_datetime);
    const endDate = note.calendar_event.end_datetime
      ? new Date(note.calendar_event.end_datetime)
      : new Date(startDate.getTime() + 60 * 60 * 1000);

    const formatGoogleDate = (d: Date) =>
      d.toISOString().replace(/-|:|\.\d+/g, '');

    const dates = `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`;
    const title = encodeURIComponent(note.calendar_event.title || note.summary);
    
    // Combine note and action items
    const actionItemsText = note.action_items.length > 0
      ? `\n\nAlt Görevler:\n` + note.action_items.map(a => `• ${a.task}`).join('\n')
      : '';
    const details = encodeURIComponent(`${note.detailed_note}${actionItemsText}\n\n[Notivia Bilişsel Yaşam Asistanı]`);
    const location = note.calendar_event.location ? `&location=${encodeURIComponent(note.calendar_event.location)}` : '';

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}${location}`;
  } catch (err) {
    console.error('Failed to create Google Calendar URL:', err);
    return null;
  }
}

export function downloadIcsFile(note: NotiviaParsedNote) {
  if (!note.calendar_event.has_event || !note.calendar_event.start_datetime) {
    return;
  }

  try {
    const startDate = new Date(note.calendar_event.start_datetime);
    const endDate = note.calendar_event.end_datetime
      ? new Date(note.calendar_event.end_datetime)
      : new Date(startDate.getTime() + 60 * 60 * 1000);

    const formatIcsDate = (d: Date) =>
      d.toISOString().replace(/-|:|\.\d+/g, '');

    const now = formatIcsDate(new Date());
    const dtstart = formatIcsDate(startDate);
    const dtend = formatIcsDate(endDate);
    const uid = `notivia-${note.id || Date.now()}@notivia.ai`;

    const description = `${note.detailed_note}\\n\\nAlt Görevler:\\n` +
      note.action_items.map(a => `- ${a.task}`).join('\\n');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Notivia//Bilişsel Yaşam Asistanı//TR',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${now}`,
      `DTSTART:${dtstart}`,
      `DTEND:${dtend}`,
      `SUMMARY:${note.calendar_event.title || note.summary}`,
      `DESCRIPTION:${description}`,
      note.calendar_event.location ? `LOCATION:${note.calendar_event.location}` : '',
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT15M',
      'ACTION:DISPLAY',
      `DESCRIPTION:Yaklaşıyor: ${note.calendar_event.title || note.summary}`,
      'END:VALARM',
      'BEGIN:VALARM',
      'TRIGGER:-PT1H',
      'ACTION:DISPLAY',
      `DESCRIPTION:1 Saat Kaldı: ${note.calendar_event.title || note.summary}`,
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].filter(Boolean).join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${(note.summary || 'etkinlik').replace(/[^a-zA-Z0-9çÇğĞıİöÖşŞüÜ]/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Failed to download ICS file:', err);
  }
}

export interface ConflictCheckResult {
  hasConflict: boolean;
  conflictingEventTitle?: string;
  conflictingEventTime?: string;
  suggestedAlternativeIso?: string;
  suggestedAlternativeTimeStr?: string;
  warningNote?: string;
}

/**
 * Mevcut kartlar ve takvim etkinlikleri ile yeni etkinlik arasında saat çakışması tespit eder
 */
export function detectCalendarConflict(
  newEventIso: string | null | undefined,
  existingEvents: Array<{ id?: string; baslik?: string; summary?: string; tarih_iso?: string | null; start_datetime?: string | null; zaman?: string | null }>,
  durationMinutes: number = 45
): ConflictCheckResult {
  if (!newEventIso) {
    return { hasConflict: false };
  }

  const targetTime = new Date(newEventIso).getTime();
  if (isNaN(targetTime)) {
    return { hasConflict: false };
  }

  const durationMs = durationMinutes * 60 * 1000;
  const newEventEnd = targetTime + durationMs;

  for (const item of existingEvents) {
    const itemIso = item.tarih_iso || item.start_datetime;
    if (!itemIso) continue;

    const itemStart = new Date(itemIso).getTime();
    if (isNaN(itemStart)) continue;

    const itemEnd = itemStart + durationMs;

    // Zaman aralığı çakışma formülü: (StartA < EndB) && (EndA > StartB)
    // 15 dakikadan az aralık olan durumları çakışma veya aşırı sıkışıklık say
    const isOverlapping = targetTime < itemEnd && newEventEnd > itemStart;

    if (isOverlapping) {
      const itemDate = new Date(itemStart);
      const hours = String(itemDate.getHours()).padStart(2, '0');
      const minutes = String(itemDate.getMinutes()).padStart(2, '0');
      const timeStr = `${hours}:${minutes}`;
      const title = item.baslik || item.summary || 'Mevcut Etkinlik';

      // Alternatif zaman önerisi: Çakışan etkinliğin bitişinden 30 dakika sonrası
      const altDate = new Date(itemEnd + 30 * 60 * 1000);
      const altHours = String(altDate.getHours()).padStart(2, '0');
      const altMinutes = String(altDate.getMinutes()).padStart(2, '0');
      const altTimeStr = `${altHours}:${altMinutes}`;

      return {
        hasConflict: true,
        conflictingEventTitle: title,
        conflictingEventTime: timeStr,
        suggestedAlternativeIso: altDate.toISOString(),
        suggestedAlternativeTimeStr: altTimeStr,
        warningNote: `⚠️ Çakışma Uyarısı: ${timeStr} saatinde "${title}" bulunuyor. İkilem oluşmaması için ${altTimeStr} saatine kaydırmanız önerilir.`,
      };
    }
  }

  return { hasConflict: false };
}
