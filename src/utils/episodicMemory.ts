import { SimpleCardItem } from '../App';

export interface EpisodicMemoryResult {
  newCardUpdates: Partial<SimpleCardItem>;
  pastCardUpdates: { id: string; changes: Partial<SimpleCardItem> }[];
}

export function checkEpisodicMemory(
  newNote: Partial<SimpleCardItem>,
  pastCards: SimpleCardItem[]
): EpisodicMemoryResult {
  const result: EpisodicMemoryResult = {
    newCardUpdates: {},
    pastCardUpdates: [],
  };

  if (!newNote.baslik) return result;

  const lowerTitle = newNote.baslik.toLowerCase();

  // --- 1. Finansal Bakiye Mahsuplaşması (Episodic Offset) ---
  // Örn: Yeni kart: "Ahmet: 500 Ödeme" veya "Ahmet'e 500 gönderdim"
  // Eski kart: "Ahmet: 2000 Alacak" veya benzeri
  const financeMatch = newNote.baslik.match(/^([A-ZÇĞİÖŞÜa-zçğıöşü]+):\s*(\d+(?:[.,]\d+)?)\s*(Ödeme|Alacak)/i);
  if (financeMatch) {
    const person = financeMatch[1];
    const amountStr = financeMatch[2].replace(',', '.');
    const amount = parseFloat(amountStr);
    const isPayment = financeMatch[3].toLowerCase() === 'ödeme'; // Kullanıcı ödeme yaptı (borç kapattı veya alacak tahsil etti)

    // Kişiyle ilgili geçmiş finansal kartı bul
    const pastFinanceCard = pastCards.find(c => 
      c.baslik.toLowerCase().startsWith(person.toLowerCase() + ':') &&
      (c.baslik.toLowerCase().includes('alacak') || c.baslik.toLowerCase().includes('ödeme'))
    );

    if (pastFinanceCard) {
      const pastMatch = pastFinanceCard.baslik.match(/^([A-ZÇĞİÖŞÜa-zçğıöşü]+):\s*(\d+(?:[.,]\d+)?)\s*(Ödeme|Alacak)/i);
      if (pastMatch) {
        const pastAmountStr = pastMatch[2].replace(',', '.');
        const pastAmount = parseFloat(pastAmountStr);
        const isPastAlacak = pastMatch[3].toLowerCase() === 'alacak';

        if (!isNaN(amount) && !isNaN(pastAmount)) {
          let newBalance = 0;
          let newType = isPastAlacak ? 'Alacak' : 'Ödeme';

          const isNewAlacak = !isPayment;
          
          if (isPastAlacak === isNewAlacak) {
            // Same direction (e.g. Alacak + Alacak)
            newBalance = pastAmount + amount;
          } else {
            // Opposite direction (e.g. Alacak - Ödeme)
            if (pastAmount >= amount) {
              newBalance = pastAmount - amount;
            } else {
              newBalance = amount - pastAmount;
              newType = isNewAlacak ? 'Alacak' : 'Ödeme';
            }
          }

          if (newBalance === 0) {
            result.newCardUpdates.baglantili_hatirlatma = `${person} ile hesap kapandı. ✅`;
            result.pastCardUpdates.push({
              id: pastFinanceCard.id,
              changes: { baslik: `${person}: Hesap Kapandı`, ikon: '✅', renk: '#F3F4F6' }
            });
          } else {
            result.newCardUpdates.baglantili_hatirlatma = `(Geçmiş bakiye güncellendi: ${person} son durum ${newBalance} ${newType})`;
            result.pastCardUpdates.push({
              id: pastFinanceCard.id,
              changes: { baslik: `${person}: ${newBalance} ${newType}` }
            });
          }
        }
      }
    }
  }

  // --- 2. Anomali Tespiti (Filtre Değişimi Örüntüsü) ---
  if (lowerTitle.includes('filtre') && (lowerTitle.includes('değiş') || lowerTitle.includes('bakım') || lowerTitle.includes('yenile'))) {
    // Geçmişte filtre değişimi var mı?
    const pastFilterCard = pastCards.find(c => 
      c.baslik.toLowerCase().includes('filtre') && 
      (c.baslik.toLowerCase().includes('değiş') || c.baslik.toLowerCase().includes('bakım') || c.baslik.toLowerCase().includes('yenile')) &&
      c.createdAt
    );

    if (pastFilterCard && pastFilterCard.createdAt) {
      const pastDate = new Date(pastFilterCard.createdAt);
      const diffDays = Math.round((Date.now() - pastDate.getTime()) / (1000 * 60 * 60 * 24));
      
      // Filtreler genelde 3-6 ay arası değişir. Eğer 30 günden önce değişmişse anomali!
      if (diffDays > 0 && diffDays < 30) {
        result.newCardUpdates.anomali_notu = `⚠️ Dikkat: Su filtresi normalden çok daha erken kirlendi (${diffDays} gün). Şebeke suyunda bir tortu olabilir.`;
      }
    }
  }

  // --- Ek Anomali: Lastik / Yağ Bakımı Erken Tekrarı ---
  if (lowerTitle.includes('yağ bakım') || (lowerTitle.includes('bakım') && lowerTitle.includes('araç'))) {
    const pastCare = pastCards.find(c => 
      c.baslik.toLowerCase().includes('yağ bakım') || (c.baslik.toLowerCase().includes('bakım') && c.baslik.toLowerCase().includes('araç'))
    );
    if (pastCare && pastCare.createdAt) {
      const pastDate = new Date(pastCare.createdAt);
      const diffDays = Math.round((Date.now() - pastDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays > 0 && diffDays < 60) {
        result.newCardUpdates.anomali_notu = `⚠️ Çok erken araç bakımı! Son bakım sadece ${diffDays} gün önceydi. Kaçak veya motorda sorun olabilir.`;
      }
    }
  }

  return result;
}
