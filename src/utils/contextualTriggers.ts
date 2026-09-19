/**
 * Notivia Meteoroloji & Çevresel Koşul Tetikleyicisi (Context-Aware Environmental Triggers)
 * Don, yağmur, aşırı sıcaklık ve botanik güneş kurallarına göre tetikleme koşullarını denetler.
 */

export interface EnvironmentalCondition {
  weather: 'gunesli' | 'yagmurlu' | 'don' | 'ruzgarli' | 'bulutlu';
  temperatureC: number;
  timeHour: number; // 0-23
}

export function evaluateEnvironmentalTrigger(
  triggerCondition?: string,
  condition: EnvironmentalCondition = { weather: 'gunesli', temperatureC: 22, timeHour: new Date().getHours() }
): { isTriggered: boolean; message: string; alertLevel: 'info' | 'warning' | 'critical' } {
  if (!triggerCondition) {
    return { isTriggered: false, message: '', alertLevel: 'info' };
  }

  const cond = triggerCondition.toLowerCase();

  // 1. Don / Sıfır Altı Sıcaklık
  if (cond.includes('don') || cond.includes('buz')) {
    if (condition.weather === 'don' || condition.temperatureC <= 0) {
      return {
        isTriggered: true,
        message: '❄️ Don Uyarısı Aktif: Şantiye/bahçe su vanalarını boşaltın, araç antifriz seviyesini kontrol edin!',
        alertLevel: 'critical'
      };
    }
  }

  // 2. Yağmur / Yağış
  if (cond.includes('yagmur') || cond.includes('yağmur') || cond.includes('yagis')) {
    if (condition.weather === 'yagmurlu') {
      return {
        isTriggered: true,
        message: '🌧️ Yağmur Şartı Gerçekleşti: Açık alan beton kürleme sulamasını durdurun, araç takip mesafesini artırın.',
        alertLevel: 'warning'
      };
    }
  }

  // 3. Botanik Güneş Kuralı (11:00 - 17:00 arası sulama yasağı)
  if (cond.includes('gunes') || cond.includes('güneş') || cond.includes('sulama')) {
    if (condition.timeHour >= 11 && condition.timeHour < 17) {
      return {
        isTriggered: true,
        message: '☀️ Güneş Kuralı Devrede: Yaprak yanmasını önlemek için sulama 19:30 akşam serinliğine ötelendi.',
        alertLevel: 'info'
      };
    }
  }

  return { isTriggered: false, message: 'Şart bekleniyor...', alertLevel: 'info' };
}
