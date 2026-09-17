import { useEffect, useState, useRef } from 'react';
import { alarmSound } from '../services/alarmSound';

export interface NoteItem {
  id: string;
  baslik: string;
  tarih_iso?: string | null;
  ikon?: string;
  isAlarmActive?: boolean;
  [key: string]: any;
}

export function useAlarmWatcher(notes: NoteItem[], onDismissNote?: (id: string) => void) {
  const [activeAlarm, setActiveAlarm] = useState<NoteItem | null>(null);
  const triggeredIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const timer = setInterval(() => {
      // Zaten bir alarm çalıyorsa yeni alarmı sıraya sokma
      if (alarmSound.getStatus() || activeAlarm) return;

      const now = Date.now();

      for (const note of notes) {
        if (!note.tarih_iso || note.isAlarmActive === false) continue;
        if (triggeredIdsRef.current.has(note.id)) continue;

        const targetTime = new Date(note.tarih_iso).getTime();

        // Hedef süre gelmiş veya en fazla 60 sn geçmişse tetikle
        if (targetTime <= now && now - targetTime < 60000) {
          triggeredIdsRef.current.add(note.id);
          setActiveAlarm(note);
          alarmSound.startAlarm();
          break;
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [notes, activeAlarm]);

  const dismissAlarm = () => {
    alarmSound.stopAlarm();
    if (activeAlarm && onDismissNote) {
      onDismissNote(activeAlarm.id);
    }
    setActiveAlarm(null);
  };

  return { activeAlarm, dismissAlarm };
}
