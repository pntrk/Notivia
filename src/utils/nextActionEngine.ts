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

  // 7. Veteriner: Operasyon / Kısırlaştırma -> 7. Gün Dikiş Alma & Post-Op Kontrol
  if (text.includes('kısırlaştırma') || text.includes('ameliyat') || text.includes('post-op') || text.includes('dikiş')) {
    return {
      id: `next-vet-${Date.now()}`,
      title: '7. Gün Dikiş & Post-Op Kontrolü',
      description: 'Cerrahi operasyon sonrası yara iyileşmesi ve dikiş kontrolü kur.',
      actionType: 'CREATE_FOLLOWUP',
      icon: '🐾',
      payload: {
        followupTitle: 'Veteriner 7. Gün Dikiş & Post-Op Kontrolü',
        followupZaman: '7 Gün Sonra 11:00',
        followupOffsetDays: 7,
        followupIkon: '🐾'
      }
    };
  }

  // 8. Emlak: Tapu Satışı -> DASK & Abonelik İptal / Devir Mesajı
  if (text.includes('tapu') || text.includes('satış devir') || text.includes('gayrimenkul')) {
    return {
      id: `next-re-${Date.now()}`,
      title: 'Alıcı/Satıcı Abonelik Bilgilendirmesi',
      description: 'Tapu devri sonrası DASK ve elektrik/su/doğalgaz devir mesajı hazırla.',
      actionType: 'DRAFT_MESSAGE',
      icon: '🏢',
      payload: {
        recipient: 'Alıcı & Satıcı',
        channel: 'whatsapp',
        messageBody: `Tebrik ederiz, tapu devir işlemi başarıyla tamamlanmıştır. Yeni malikin elektrik, su ve doğalgaz aboneliklerini üzerine alabilmesi için DASK poliçesi ve tapu fotokopisiyle ilgili kurumlara başvurması gerekmektedir.`
      }
    };
  }

  // 9. Denizcilik: Liman Yanaşma -> Draft Survey & Jurnal Kaydı
  if (text.includes('psc') || text.includes('liman') || text.includes('yanaşma') || text.includes('demirleme')) {
    return {
      id: `next-mar-${Date.now()}`,
      title: 'Draft Survey & Sintine Jurnal Kaydı',
      description: 'Liman emniyeti ve PSC denetim evrakı için draft ve balast kontrolü ata.',
      actionType: 'CREATE_FOLLOWUP',
      icon: '⚓',
      payload: {
        followupTitle: 'PSC Denetim & Draft Survey Raporu',
        followupZaman: 'Yarın 09:00',
        followupOffsetDays: 1,
        followupIkon: '⚓'
      }
    };
  }

  // 10. Gümrük: Kırmızı Hat -> Muayene Refakati & Ordino Takibi
  if (text.includes('kırmızı hat') || text.includes('sarı hat') || text.includes('supalan') || text.includes('gümrük')) {
    return {
      id: `next-customs-${Date.now()}`,
      title: 'Müşteriye Muayene Durum Mesajı',
      description: 'Beyanname hat durumu ve muayene randevusu hakkında bilgilendirme ilet.',
      actionType: 'DRAFT_MESSAGE',
      icon: '📦',
      payload: {
        recipient: 'İthalatçı / İhracatçı Firma',
        channel: 'email',
        messageBody: `Sayın Yetkili, ilgili beyannameniz gümrük tescilinden geçmiş olup sistem tarafından muayene hattına sevk edilmiştir. Muayene memuru refakati ve fiziki kontrol adımları takip edilmektedir.`
      }
    };
  }

  // 11. Bilişim Mühendisliği & Siber Güvenlik (IT / SIEM): Kurulum Tamamlandı -> Müşteriye POC & UAT Sunum Mesajı
  if (text.includes('siem') || text.includes('soc') || text.includes('firewall') || text.includes('uat') || text.includes('poc')) {
    return {
      id: `next-it-${Date.now()}`,
      title: 'Müşteriye POC & Sunum Mesajı',
      description: 'Kurulum ve korelasyon testlerinin tamamlandığına dair müşteri sunum daveti oluştur.',
      actionType: 'DRAFT_MESSAGE',
      icon: '🛡️',
      payload: {
        recipient: 'Müşteri / Yönetim Ekibi',
        channel: 'email',
        messageBody: `Sayın Yetkili,\n\nTalep edilen SIEM ve güvenlik entegrasyonu altyapı kurulumu ve kural korelasyon testleri başarıyla tamamlanmıştır. Hazırlanan POC raporu, tespit bulguları ve canlı sistem demonstrasyonu için belirleyeceğiniz uygun bir zaman diliminde sunum toplantısı gerçekleştirmek isteriz.\n\nBilgilerinize sunar, iyi çalışmalar dileriz.`
      }
    };
  }

  // 12. Hukuk: Tensip Zaptı -> Delil & Masraf Avansı Vezne Görevi
  if (text.includes('tensip') || text.includes('cevap dilekçesi')) {
    return {
      id: `next-law-tensip-${Date.now()}`,
      title: 'Delil & Gider Avansı Yatırma Görevi',
      description: 'Mahkeme veznesine gider avansı ve delil listesi sunum alarmı aç.',
      actionType: 'CREATE_FOLLOWUP',
      icon: '⚖️',
      payload: {
        followupTitle: 'Mahkeme Veznesine Gider Avansı Yatırma',
        followupZaman: '3 Gün İçinde',
        followupOffsetDays: 3,
        followupIkon: '🏛️'
      }
    };
  }

  // 13. Maliye / SMMM: Şirket Kuruluşu -> E-Yoklama Takibi
  if (text.includes('şirket kuruluşu') || text.includes('mersis') || text.includes('tescil')) {
    return {
      id: `next-smmm-yoklama-${Date.now()}`,
      title: 'Vergi Dairesi E-Yoklama Randevusu',
      description: 'İnteraktif Vergi Dairesi üzerinden yoklama memuru randevu takibi kur.',
      actionType: 'CREATE_FOLLOWUP',
      icon: '📊',
      payload: {
        followupTitle: 'Vergi Dairesi E-Yoklama & İmza Sirküleri',
        followupZaman: '2 İş Günü Sonra',
        followupOffsetDays: 2,
        followupIkon: '📝'
      }
    };
  }

  // 14. Emlak: Kiracı Tahliyesi -> Depozito İade Mutabakatı
  if (text.includes('kiracı') || text.includes('tahliye') || text.includes('anahtar')) {
    return {
      id: `next-re-deposit-${Date.now()}`,
      title: 'Depozito Mahsup & İade Mesajı',
      description: 'Sayaç endeksleri ve hasar tespit dökümünü içeren mutabakat metni hazırla.',
      actionType: 'DRAFT_MESSAGE',
      icon: '🏢',
      payload: {
        recipient: 'Eski Kiracı',
        channel: 'whatsapp',
        messageBody: `Merhaba, daire tahliyesi ve sayaç okuma tutanağınız incelenmiştir. Son fatura borçları ve hasar mahsubu düşüldükten sonra kalan depozito bakiyeniz belirttiğiniz IBAN hesabına iade edilecektir.`
      }
    };
  }

  // 15. Ziraat & Tarım: Ekim / Budama -> 15 Gün Sonra Ot ve Hastalık Kontrolü
  if (text.includes('ektik') || text.includes('ekim') || text.includes('budadık') || text.includes('bordo bulamacı')) {
    return {
      id: `next-farm-check-${Date.now()}`,
      title: '15 Gün Sonra Saha Ot/Mantar Teftişi',
      description: 'Çimlenme, toprak tavı ve herbisit ihtiyacı için arazi teftiş alarmı planla.',
      actionType: 'CREATE_FOLLOWUP',
      icon: '🌾',
      payload: {
        followupTitle: 'Tarla Ot & Gelişim Kontrolü',
        followupZaman: '15 Gün Sonra 09:00',
        followupOffsetDays: 15,
        followupIkon: '🌱'
      }
    };
  }

  // 16. Kuaför: Ombre / Açıcı -> 3 Hafta Sonra Keratin Seansı
  if (text.includes('ombre') || text.includes('açıcı') || text.includes('platin') || text.includes('röfle')) {
    return {
      id: `next-hair-keratin-${Date.now()}`,
      title: '3 Hafta Sonra Keratin Randevusu',
      description: 'Müşteriye saç nem ve bağ güçlendirici seansı için hatırlatma aç.',
      actionType: 'CREATE_FOLLOWUP',
      icon: '✂️',
      payload: {
        followupTitle: 'Müşteri Keratin & Nem Yükleme Seansı',
        followupZaman: '21 Gün Sonra 14:00',
        followupOffsetDays: 21,
        followupIkon: '💆‍♀️'
      }
    };
  }

  return null;
}
