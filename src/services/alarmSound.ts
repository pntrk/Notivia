import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

export class AlarmSoundService {
  private audioCtx: AudioContext | null = null;
  private isRinging: boolean = false;
  private ringInterval: any = null;

  private getAudioContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Sentetik çift tonlu zil (D5 -> A5 harmonisi)
  private playBeepTone() {
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;

      // 1. Ton (587 Hz - Re)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now);
      gain1.gain.setValueAtTime(0.3, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.35);

      // 2. Ton (880 Hz - La) 150ms sonra çalar
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(880, now + 0.15);
      gain2.gain.setValueAtTime(0.4, now + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.15);
      osc2.stop(now + 0.55);
    } catch (e) {
      console.warn('Web Audio API engellendi veya desteklenmiyor:', e);
    }
  }

  // Alarmı başlatır (kullanıcı kapatana kadar her 1.2 saniyede çalar ve titrer)
  public startAlarm(onTick?: () => void) {
    if (this.isRinging) return;
    this.isRinging = true;

    const ring = async () => {
      this.playBeepTone();

      // Mobil cihazda hissedilir titreşim
      if (Capacitor.isNativePlatform()) {
        try {
          await Haptics.notification({ type: NotificationType.Warning });
        } catch {
          Haptics.impact({ style: ImpactStyle.Heavy });
        }
      }

      if (onTick) onTick();
    };

    ring();
    this.ringInterval = setInterval(ring, 1200);
  }

  // Kullanıcı 'Kapat' veya 'Tamam' butonuna bastığında susturur
  public stopAlarm() {
    this.isRinging = false;
    if (this.ringInterval) {
      clearInterval(this.ringInterval);
      this.ringInterval = null;
    }
  }

  public getStatus() {
    return this.isRinging;
  }
}

export const alarmSound = new AlarmSoundService();
