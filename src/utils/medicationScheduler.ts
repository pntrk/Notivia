import { LocalNotifications } from '@capacitor/local-notifications';

export async function scheduleMedicationAlarms(actionItems: Array<{ task: string; time?: string; condition?: string; is_completed?: boolean }>) {
  try {
    const validItems = actionItems.filter(item => item.time && item.time.includes(':'));
    if (validItems.length === 0) return;

    // İzin isteği (mobil/PWA desteği)
    try {
      const perm = await LocalNotifications.checkPermissions();
      if (perm.display !== 'granted') {
        const req = await LocalNotifications.requestPermissions();
        if (req.display !== 'granted') {
          console.warn('Bildirim izni verilmedi');
        }
      }
    } catch (permErr) {
      console.warn('LocalNotifications permission check bypassed:', permErr);
    }

    const notifications = validItems.map((item, index) => {
      const [hours, minutes] = (item.time || '08:00').split(':').map(Number);
      const triggerDate = new Date();
      triggerDate.setHours(hours, minutes, 0, 0);

      // Eğer saat geçmişse sonraki güne kur
      if (triggerDate.getTime() <= Date.now()) {
        triggerDate.setDate(triggerDate.getDate() + 1);
      }

      return {
        id: 1000 + index + Math.floor(Math.random() * 9000),
        title: '💊 İlaç Zamanı',
        body: item.task,
        schedule: { at: triggerDate, allowWhileIdle: true },
        sound: 'beep.wav'
      };
    });

    await LocalNotifications.schedule({ notifications });
    console.log(`[MedicationAlarms] ${notifications.length} adet ilaç alarmı başarıyla kuruldu.`);
  } catch (error) {
    console.error('İlaç alarmları kurulurken hata:', error);
  }
}
