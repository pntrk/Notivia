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
