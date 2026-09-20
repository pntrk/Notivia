import { useEffect, useState, useRef } from 'react';
import { alarmSound } from '../services/alarmSound';

export interface NoteItem {
  id: string;
  baslik: string;
  tarih_iso?: string | null;
  ikon?: string;
  isAlarmActive?: boolean;
  isAlarm?: boolean;
  sureDakika?: number;
  tamamlandi?: boolean;
  action_items?: Array<{ task: string; is_completed: boolean }>;
  createdAt?: any;
  [key: string]: any;
}

export function useAlarmWatcher(notes: NoteItem[], onDismissNote?: (id: string) => void) {
  const [activeAlarm, setActiveAlarm] = useState<NoteItem | null>(null);
  const triggeredIdsRef = useRef<Set<string>>(new Set());
  const knownIdsRef = useRef<Set<string>>(new Set());

  // Notlar değiştikçe:
  // 1) Yeni eklenen veya ilk yüklenen notlardan süresi ZATEN geçmiş olanları
  //    veya alarm olmayanları triggered setine ekle ki "Süre doldu!" yanlışlıkla patlamasın.
  // 2) Geleceğe ayarlı (targetTime > now) gerçek alarm notları varsa, triggered setinden çıkar
  //    böylece vakti geldiğinde sağlıklı şekilde çalsın.
  useEffect(() => {
    const now = Date.now();

    for (const note of notes) {
      if (!note.tarih_iso) continue;

      const targetTime = new Date(note.tarih_iso).getTime();
      if (isNaN(targetTime)) continue;

      const isAlarm = Boolean(
        note.isAlarm ||
        (typeof note.sureDakika === 'number' && note.sureDakika > 0) ||
        note.isAlarmActive === true
      );

      // İlk kez görülen bir not ise:
      if (!knownIdsRef.current.has(note.id)) {
        knownIdsRef.current.add(note.id);
        // Eğer bu not bir alarm değilse VEYA hedef süresi zaten şu an / geçmişte ise,
        // geriye dönük yanlış alarm çalmaması için doğrudan tetiklenmiş say.
        // Yeni bir alarmın çalabilmesi için ileri bir zamana kurulmuş olması gerekir.
        if (!isAlarm || targetTime <= now) {
          triggeredIdsRef.current.add(note.id);
        }
      } else {
        // Zaten bilinen bir not: Eğer hedef süresi geleceğe ötelenmişse veya alarm yeniden kurulmuşsa
        if (isAlarm && targetTime > now && note.isAlarmActive !== false) {
          triggeredIdsRef.current.delete(note.id);
        }
      }
    }
  }, [notes]);

  useEffect(() => {
    const timer = setInterval(() => {
      // Zaten bir alarm çalıyorsa yeni alarmı sıraya sokma
      if (alarmSound.getStatus() || activeAlarm) return;

      const now = Date.now();

      for (const note of notes) {
        if (!note.tarih_iso || note.isAlarmActive === false) continue;
        if (note.tamamlandi) continue;
        if (
          note.action_items &&
          note.action_items.length > 0 &&
          note.action_items.every((it: any) => it.is_completed)
        ) {
          continue;
        }

        // SADECE açıkça alarm veya sayaç olarak tanımlanmış notlar için alarm çal.
        // Sıradan yapılacaklar listesi, market alışverişi veya tarihi "şimdi" olan düz notlar ASLA çalmaz.
        const isAlarm = Boolean(
          note.isAlarm ||
          (typeof note.sureDakika === 'number' && note.sureDakika > 0) ||
          note.isAlarmActive === true
        );
        if (!isAlarm) continue;

        if (triggeredIdsRef.current.has(note.id)) continue;

        const targetTime = new Date(note.tarih_iso).getTime();
        if (isNaN(targetTime)) continue;

        // Hedef süre gelmiş ve en fazla 60 sn geçmişse tetikle
        if (targetTime <= now && now - targetTime < 60000) {
          triggeredIdsRef.current.add(note.id);
          setActiveAlarm(note);
          alarmSound.startAlarm();
          break;
        } else if (targetTime < now - 60000) {
          // Çok eski süresi geçmiş alarmları da sessizce triggered kümesine al
          triggeredIdsRef.current.add(note.id);
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

