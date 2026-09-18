export interface WeatherCondition {
  isRaining: boolean;
  isFreezing: boolean;
  temperature: number;
}

export async function checkLocalWeather(lat: number = 41.73, lon: number = 27.22): Promise<WeatherCondition | null> {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,weather_code`
    );
    if (!res.ok) return null;
    const data = await res.json();
    const current = data.current;

    return {
      isRaining: current.precipitation > 0 || [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(current.weather_code),
      isFreezing: current.temperature_2m <= 0 || [71, 73, 75, 85, 86].includes(current.weather_code),
      temperature: current.temperature_2m,
    };
  } catch (err) {
    console.warn('Hava durumu sorgulanamadı:', err);
    return null;
  }
}

// Tarayıcı coğrafi konumunu kullanarak veya varsayılan koordinatlarla hava durumunu çeker
export async function getDeviceLocationWeather(): Promise<WeatherCondition | null> {
  if (typeof window !== 'undefined' && 'geolocation' in navigator) {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 4000,
          maximumAge: 10 * 60 * 1000, // 10 dakika önbellek
        });
      });
      return await checkLocalWeather(position.coords.latitude, position.coords.longitude);
    } catch {
      // Konum izni verilmediyse veya zaman aşımına uğradıysa varsayılan koordinatları kullan
      return await checkLocalWeather();
    }
  }
  return await checkLocalWeather();
}

// Hava durumuna göre bilişsel tavsiye fısıltısı üretir
export function getWeatherGuidanceWhisper(weather: WeatherCondition | null): string | null {
  if (!weather) return null;
  if (weather.isRaining && weather.isFreezing) {
    return `Dışarıda kar/buzlanma ve yağış var (${weather.temperature}°C). Şemsiyeni al ve kaygan yollara dikkat et.`;
  }
  if (weather.isRaining) {
    return `Hava yağmurlu (${weather.temperature}°C), şemsiyeni yanına almayı unutma.`;
  }
  if (weather.isFreezing) {
    return `Hava oldukça soğuk (${weather.temperature}°C), sıkı giyin ve don/buzlanmaya dikkat et.`;
  }
  return null;
}

/**
 * Görevin hava şartlarıyla (yağmur, don, aşırı rüzgar/soğuk) çakışmasını kontrol eder
 */
export function checkWeatherTaskCompatibility(
  taskTitle: string,
  weather: WeatherCondition | null
): { isCompatible: boolean; warning?: string; suggestedAction?: string } {
  if (!weather || !taskTitle) return { isCompatible: true };

  const lower = taskTitle.toLowerCase();

  // Yağmur duyarlı açık hava görevleri
  const rainSensitiveTasks = [
    { key: 'araba yıka', label: 'Araç yıkama' },
    { key: 'araba yika', label: 'Araç yıkama' },
    { key: 'araç yıka', label: 'Araç yıkama' },
    { key: 'cam sil', label: 'Cam silme' },
    { key: 'halı yıka', label: 'Halı yıkama' },
    { key: 'hali yika', label: 'Halı yıkama' },
    { key: 'çamaşır as', label: 'Çamaşır asma' },
    { key: 'camasir as', label: 'Çamaşır asma' },
    { key: 'boya badana', label: 'Dış cephe boya/badana' },
    { key: 'dış cephe', label: 'Dış cephe işlemi' },
    { key: 'ilaçlama', label: 'Zirai ilaçlama' },
    { key: 'bahçe sulama', label: 'Bahçe sulama' },
  ];

  if (weather.isRaining) {
    for (const item of rainSensitiveTasks) {
      if (lower.includes(item.key)) {
        return {
          isCompatible: false,
          warning: `🌧️ Hava Durumu Çakışması: Dışarıda yağmur var (${weather.temperature}°C). ${item.label} işlemi yağış bittikten sonraya ertelenebilir.`,
          suggestedAction: 'Yağmur dindikten sonraya ertele',
        };
      }
    }
  }

  if (weather.isFreezing) {
    if (lower.includes('sulama') || lower.includes('çiçek sula') || lower.includes('ağaç dik')) {
      return {
        isCompatible: false,
        warning: `❄️ Don Uyarısı: Sıcaklık ${weather.temperature}°C. Don şartlarında sulama köklerin donmasına yol açabilir.`,
        suggestedAction: 'Don tehlikesi geçtikten sonraya ertele',
      };
    }
  }

  return { isCompatible: true };
}
