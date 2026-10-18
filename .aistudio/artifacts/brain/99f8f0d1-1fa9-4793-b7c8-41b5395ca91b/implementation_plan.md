# Bilişsel Motor Sektör Sadeleştirmesi ve Çatı Kümeleme Uygulama Planı

Bu plan; mevcut 27 bağımsız ve parçalı MYK sektörünü **10 Ana Bilişsel Odak Grubu (Cluster)** altında birleştirirken, tüm alt meslek kurallarını, terminolojiyi, kısaltmaları ve bilişsel algoritmaları korumayı hedefler.

## 1. Mimari Tasarım ve 10 Ana Odak Grubu Eşlemesi

Mevcut dağınık 27 sektör, aralarında kökensel ve pratik çalışma bağı bulunan 10 modern çatı kümede toplanacaktır:

| No | Ana Çatı Küme (Cluster) | Kapsanan Alt Sektörler ve Disiplinler | İkon | Pastel Tema Rengi |
|---|---|---|:---:|:---:|
| 1 | **Genel & Yaşam** | Genel Görevler, Kişisel Ajanda, Ev Rutinleri | 🌟 | `#FEF3C7` |
| 2 | **Teknoloji & Bilişim** | Yazılım Mühendisliği, Siber Güvenlik, Medya & Dijital İletişim | 💻 | `#E0F2FE` |
| 3 | **Mühendislik, Sanayi & Üretim** | Makine & Mekanik, Elektrik & Enerji/Otomasyon, Kimya & Lab, Maden, Tekstil | ⚙️ | `#E2E8F0` |
| 4 | **İnşaat, Mimarlık & Şantiye** | Şantiye & İnşaat Mühendisliği, Mimarlık & Tasarım, Şehir Planlama | 🏗️ | `#FEF08A` |
| 5 | **Sağlık & Medikal Bilimler** | Tıp & Hekimlik, Hemşirelik, Eczane, Diş Hekimliği | 🩺 | `#CCFBF1` |
| 6 | **Hukuk, Finans & Bürokrasi** | Hukuk (Avukat/Hakim), Muhasebe & Mali Müşavirlik (SMMM), Kamu Yönetimi & Belgenet/EBYS | ⚖️ | `#EDE9FE` |
| 7 | **Eğitim & Akademi** | K-12 Öğretmenlik, Okul Müdürlüğü/İdare, Üniversite & Araştırma Görevlisi | 📚 | `#FEF9C3` |
| 8 | **Operasyon, Güvenlik & Savunma** | Polis & Emniyet, İtfaiye & Kurtarma, Askeri & Birlik Komutanlığı | 🛡️ | `#BFDBFE` |
| 9 | **Ulaşım, Lojistik & Saha** | Ağır Vasıta & Lojistik, Havacılık & Pilotaj, Denizcilik, Otomotiv Servis, Saha Teknik & Telekom | 🚛 | `#FED7AA` |
| 10 | **Ticaret, Hizmet & Gastronomi** | Gastronomi & Mutfak Şefliği, Satış Danışmanlığı, Kasiyerlik & Perakende, Turizm/Otel, Tarım & Ziraat | 🏪 | `#DCFCE7` |

## 2. Temel İlkeler ve Geriye Dönük Uyumluluk (Zero Breaking Change)

1. **Alt Jargon ve Kuralların Birebir Korunması**:
   - `USER_RULES` ve `AGENTS_md` içinde tanımlanmış olan tüm yasal süreler ve operasyonel kurallar aynen korunacaktır:
     * *Hukuk*: UYAP Tebligat Kanunu 7/a (5 gün), HMK 30 gün gerekçeli karar sayacı.
     * *Finans*: 26'sı KDV/MUHSGK, ay sonu SGK ve e-Defter berat kontrolü.
     * *Mühendislik*: Beton döküm 7. ve 28. gün kırım testleri, Elektrik LOTO (Kilitleme-Etiketleme) güvenlik protokolü.
     * *Sağlık*: 5 Doğru Kuralı, 2 saatte bir dekübitus pozisyon değişimi, soğuk zincir (2-8°C).
     * *Eğitim*: 10 günlük e-Okul not giriş sayacı, 72 saat (+4°C) yemek numunesi saklama.
     * *Lojistik*: AETR ve takograf kuralları (4.5 saat sürüş / 45 dk mola, 9 saat günlük limit).
     * *Mutfak*: HACCP sıcaklıkları, FIFO rotasyonu ve servis öncesi mise en place.
     * *Emniyet & Askeri*: 24 saat yasal gözaltı süresi, SCBA 300 Bar tüp kontrolleri, silahlık sayım cetveli ve mühür denetimi.

2. **Geriye Dönük Veri Uyumluluğu**:
   - Kullanıcının `localStorage` üzerinde önceden seçilmiş bir alt sektörü (örn: `workDomain: 'bilisim'` veya `'insaat'`) varsa bu durum bozulmadan ilgili ana çatı kümesiyle otomatik eşleşecektir.
   - Hem çatı ID'leri (`bilisim_cluster` vb.) hem de spesifik alt sektör ID'leri (`bilisim`, `makine` vb.) geçerli kabul edilecektir.

3. **Modern Arayüz ve Kategorize Seçim Kartları**:
   - `SettingsModal.tsx` içindeki uzun, boğucu 27 elemanlı açılır menü yerine:
     * 10 ana odak kümesini şık ikonları, pastel rozetleri ve açıklayıcı alt uzmanlık etiketleriyle gösteren interaktif **Kategori Kartları Grid'i** kurulacaktır.
     * Kullanıcı ana kartı seçtiğinde, dilerse tek dokunuşla spesifik alt uzmanlığını da filtreleyebilecek veya doğrudan tüm çatı motorunu etkin kılabilecektir.

## 3. Uygulama Adımları

### Adım 1: Tip ve Veri Mimarisi Güncellemesi (`src/types/domainThemes.ts`)
- `WORK_DOMAIN_CLUSTERS` veri modelinin tanımlanması (id, title, description, icon, color, subDomains listesi).
- Her alt sektörün ait olduğu küme referansının (`clusterId`) tanımlanması.
- `getDomainCluster(domainId)` ve `resolveActiveSubDomains(selectedDomain)` yardımcı fonksiyonlarının eklenmesi.

### Adım 2: Bilişsel Motor ve Dispatcher Entegrasyonu (`src/services/dispatcherAgent.ts`)
- Sistem istemi ve senaryo yönlendiricisinin hem çatı küme seçimlerini hem de tekil uzmanlık seçimlerini desteklemesi.
- Çatı küme seçildiğinde, o kümedeki tüm alt disiplinlerin kural setlerinin prompt bağlamına tek bir akılcı blok halinde enjekte edilmesi.

### Adım 3: Senaryo ve Bilişsel Bilgi Bankası Optimizasyonu (`src/data/scenarioDatabase.ts`)
- Senaryo paketlerinin 10 ana küme ekseninde gruplanarak sorgulanabilmesi (`getConsolidatedScenarios(domainOrCluster)`).

### Adım 4: Ayarlar Modalı UI Yenilemesi (`src/components/SettingsModal.tsx`)
- Sektör seçim alanının 10 odak grubunu gösteren şık, duyarlı kart ızgarasına (grid) dönüştürülmesi.
- Seçili kümenin alt uzmanlık etiketlerinin (tags) anında görüntülenmesi.
- Akıcı geçişler ve mobil uyumlu dokunmatik tasarım.

### Adım 5: Doğrulama ve Test
- `lint_applet` ve `compile_applet` ile tip ve derleme denetimi.
- Farklı sektör seçimlerinde bilişsel kart ve alt görev üretiminin doğrulanması.
