/**
 * Notivia Proaktif Bir Sonraki Adım Öneri Motoru (Next-Action Dispatcher)
 * Bir eylem kartı tamamlandığında veya detaylandırıldığında, mesleki mantığa göre
 * kullanıcıya 1-tıkla çalıştırılabilir takip aksiyonları ve mesaj taslakları önerir.
 */

import { NextActionSuggestion } from '../types/notivia.ts';

export function generateNextActionSuggestion(noteTitle: string, noteCategory?: string, rawInput: string = ''): NextActionSuggestion | null {
  const text = `${noteTitle} ${rawInput}`.toLowerCase();

  // 1. Hukuk: Duruşma bitti -> Müvekkile Bilgilendirme & Gerekçeli Karar Sayacı
  if (text.includes('duruşma') || text.includes('mahkeme') || text.includes('dava')) {
    return {
      id: `next-law-${Date.now()}`,
      title: 'Müvekkile Bilgilendirme Gönder',
      description: 'Duruşmanın tamamlandığına dair müvekkile WhatsApp özet mesajı hazırla.',
      actionType: 'DRAFT_MESSAGE',
      icon: '⚖️',
      payload: {
        recipient: 'Müvekkil',
        channel: 'whatsapp',
        messageBody: `Sayın Müvekkilim, bugünkü duruşmanız başarıyla tamamlanmıştır. Mahkeme ara kararları oluşturulmuş olup detaylar dosyanıza işlenmiştir. Bilgilerinize sunarım.`
      }
    };
  }

  // 2. İş / Mülakat: Mülakat bitti -> İK'ya Teşekkür Mesajı
  if (text.includes('mülakat') || text.includes('görüşme') || text.includes('ik görüşmesi')) {
    return {
      id: `next-interview-${Date.now()}`,
      title: 'İK Yetkilisine Teşekkür E-postası',
      description: 'Görüşme sonrası profesyonel teşekkür e-postası taslağı oluştur.',
      actionType: 'DRAFT_MESSAGE',
      icon: '💼',
      payload: {
        recipient: 'İnsan Kaynakları',
        channel: 'email',
        messageBody: `Sayın İlgili, bugün gerçekleştirdiğimiz pozisyon mülakatı için teşekkür ederim. Şirketinizin vizyonu ve projeleri beni çok heyecanlandırdı. Süreçle ilgili geri bildirimlerinizi sabırsızlıkla bekliyorum.`
      }
    };
  }

  // 3. Finans & Kira / Fatura: Kira ödendi -> Ev Sahibine Dekont Mesajı
  if (text.includes('kira') || text.includes('aidat') || text.includes('fatura')) {
    return {
      id: `next-rent-${Date.now()}`,
      title: 'Dekont Bilgi Mesajı Gönder',
      description: 'Ödemenin yapıldığına dair kısa teyit mesajı oluştur.',
      actionType: 'DRAFT_MESSAGE',
      icon: '💳',
      payload: {
        recipient: 'Ev Sahibi / Yönetim',
        channel: 'whatsapp',
        messageBody: `Merhaba, bu aya ait ödeme banka hesabınıza havale/EFT ile iletilmiştir. Dekontu ekte bilgilerinize sunarım. İyi günler dilerim.`
      }
    };
  }

  // 4. Donanım & Kombi / Tesisat: 48 Saat Sonra Kaçak Kontrolü
  if (text.includes('kombi') || text.includes('arıtma') || text.includes('filtre') || text.includes('su tesisat')) {
    return {
      id: `next-repair-${Date.now()}`,
      title: '48 Saat Kaçak Kontrolü Kur',
      description: 'Müdahaleden 48 saat sonra bar basıncı ve sızdırmazlık teyidi planla.',
      actionType: 'CREATE_FOLLOWUP',
      icon: '⏱️',
      payload: {
        followupTitle: 'Kombi & Tesisat 48 Saat Kaçak/Basınç Testi',
        followupZaman: '48 Saat Sonra',
        followupOffsetDays: 2,
        followupIkon: '🔧'
      }
    };
  }

  // 5. Eğitim & Okul: Sınav okundu -> Zümreye Teslim
  if (text.includes('sınav') || text.includes('yazılı') || text.includes('not giriş')) {
    return {
      id: `next-edu-${Date.now()}`,
      title: 'Zümre Teslim Tutanağı Hazırla',
      description: 'Sınav kağıtları ve analiz çıktılarının idareye teslim kaydını oluştur.',
      actionType: 'CREATE_FOLLOWUP',
      icon: '🗂️',
      payload: {
        followupTitle: 'Zümre Başkanına Sınav Evrakı Teslimi',
        followupZaman: 'Yarın 10:00',
        followupOffsetDays: 1,
        followupIkon: '📚'
      }
    };
  }

  // 6. Sağlık & İlaç: İlaç bitti -> Reçete Yenileme Randevusu
  if (text.includes('ilaç') || text.includes('reçete') || text.includes('sağlık ocağı')) {
    return {
      id: `next-med-${Date.now()}`,
      title: 'Aile Hekimi Randevusu Planla',
      description: 'Raporlu ilaç bitmeden 15 gün önce reçete yenileme alarmı kur.',
      actionType: 'CREATE_FOLLOWUP',
      icon: '🩺',
      payload: {
        followupTitle: 'Aile Hekimi Reçete & Rapor Yenileme',
        followupZaman: '10 Gün Sonra',
        followupOffsetDays: 10,
        followupIkon: '💊'
      }
    };
  }

  return null;
}
