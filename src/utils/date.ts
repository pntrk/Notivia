export function formatTurkishDateTime(isoString: string | null | undefined): string {
  if (!isoString) return 'Belirtilmedi';
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;

    return new Intl.DateTimeFormat('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return isoString;
  }
}

export function formatRelativeTimeRemaining(isoString: string | null | undefined, refIsoString?: string): string {
  if (!isoString) return '';
  try {
    const target = new Date(isoString).getTime();
    const ref = refIsoString ? new Date(refIsoString).getTime() : Date.now();
    const diffMs = target - ref;
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
      return `${diffDays} gün sonra`;
    } else if (diffDays === 1) {
      return 'Yarın';
    } else if (diffDays === 0) {
      if (diffHours > 0) return `${diffHours} saat sonra`;
      if (diffHours === 0) return 'Çok yakında';
      return 'Geçti';
    } else {
      return `${Math.abs(diffDays)} gün önce`;
    }
  } catch {
    return '';
  }
}

export function getCurrentIsoLocal(): string {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  // Local ISO with offset
  const offset = -now.getTimezoneOffset();
  const offsetSign = offset >= 0 ? '+' : '-';
  const offsetHours = pad(Math.floor(Math.abs(offset) / 60));
  const offsetMinutes = pad(Math.abs(offset) % 60);

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMinutes}`;
}
