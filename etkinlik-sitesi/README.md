# Geliştirici Kadınlar Etkinliği — web sitesi (İP 24)

Kadın geliştiricilere yönelik Kadınzincir etkinlik sözleşmesini MetaMask ile kullanan web arayüzü. Sitenin başlığı "Geliştirici Kadınlar Etkinliği".
Sıfırdan yazıldı: Vite + sade JavaScript + ethers.js v6.

## Çalıştırma

```bash
cd etkinlik-sitesi
npm install
npm run dev     # http://localhost:5174 (cüzdan aracı 5173'te)
npm test        # ayar ve ABI uyum testleri
npm run build   # yayın için dist/ klasörünü üretir
```

MetaMask'in kurulu olduğu eğitim tarayıcı profilinde açılmalı.

## Yapılandırma nerede? [İP24-2]

Hepsi `src/ayarlar.js` içinde; sözleşme sürümü değişirse yalnızca bu dosya güncellenir.

| Ayar | Değer |
|---|---|
| Sözleşme adresi (İP 23) | `0x2Ee529a07e98dEEe473bE9bb0f2a63e757a01e65` |
| Ağ | Sepolia, chain ID 11155111 |
| ABI | `KADINZINCIR_ABI` (okunabilir biçim); `etkinlik-sozlesmesi/Kadinzincir_v3.abi.json` ile eşleştiği testte doğrulanır |

## Kod haritası [İP24 "Benim yorumum"]

| Ne | Nerede |
|---|---|
| Cüzdan bağlantısı | `src/cuzdan.js` → `cuzdanBagla()` (BrowserProvider + getSigner) |
| Ağ kontrolü | `src/cuzdan.js` → `sepoliaMi()`; `src/arayuz.js` → `gondermeDugmeleriniAyarla()` |
| Veri okuma (eth_call) | `src/sozlesme.js` → `etkinlikBilgisiOku()`, `kullaniciDurumuOku()` |
| Sözleşme çağrısı (işlem) | `src/sozlesme.js` → `kayitOl()`, `girisOnayla()`, ortak `islemGonder()` |
| Ekrana yazma, düğmeler | `src/arayuz.js` |
| Kedinin ve çileğin söylediği 10 blokzincir bilgisi | `src/bilgiler.js` |

## Güvenlik kararları

- Site private key veya kurtarma kelimesi istemez; işlemleri MetaMask imzalar. [İP24-6]
- Yetki kontrolü sözleşmede: "Girişi onayla" herkese görünür ama görevli olmayanın işlemi zincirde reddedilir. [İP24-5]
- Yanlış ağda kayıt/giriş düğmeleri kapalı; "Sepolia'ya geç" önerilir. [İP24-3]
- Başarı tx hash'iyle değil, makbuzdaki status 1 ile gösterilir.
- CSP `connect-src 'none'`: sayfa kendisi hiçbir sunucuya bağlanmaz; zincirle MetaMask üzerinden konuşur.

## Tasarım (kullanıcının tarifine göre)

- **Dil:** naif illüstrasyon · eskitilmiş kâğıt/kumaş dokusu · folk süsler · masal kitabı. Figürler kullanıcının referans resimlerinin üslubunda **özgün** çizimlerdir.
- **Giriş (kapak):** halının üstünde, sandalyelerde oturan üç kız yuvarlak masada dizüstüleriyle kod yazıyor. Ekranlardan çıkan Solidity satırları arka planda akar. Sahnenin iki yanında bir çilek ve kırmızı papyonlu kara kedi duruyor. İkisi de tıklanabilir: her tıklamada konuşma balonunda `src/bilgiler.js` içindeki 10 blokzincir bilgisinden biri sırayla çıkıyor. Altta üç kızın portre sırası ve yırtık kâğıt etiketli "Giriş" düğmesi var.
- **Uygulama:** tek sayfalık masal kitabı. Bölümler I–VI eski kâğıt kartlarda; her kartta hardal bant, Roma rakamlı mühür ve süsler var. Süsler sırasıyla kurdele, ev ve ağaç, sağdaki kızın portresi, çilek ile ortadaki kızın portresi, soldaki kızın portresi ile kara kedi, yıldız ve kalp.
- **Palet:** Cream `#E9D4AD`, Paper `#D8B987`, Warm Ochre `#C99555`, Olive `#666B43`, Muted Sage `#92977A`, Dusty Blue `#A6B2A5`, Chocolate `#38251F`, Terracotta `#A94F35`, Dusty Rose `#C98D83`. Kullanım oranı: %45 krem/kâğıt · %25 hardal/toprak · %15 adaçayı/mavi · %10 kahve · %5 kiremit/gül.
- **Yazı tipleri:** Fraunces (başlık), DM Sans (gövde), Patrick Hand (el yazısı notlar). `public/yazitipleri/` klasöründe woff2 olarak duruyor; latin + latin-ext alt kümeleri sayesinde Türkçe harfler destekleniyor. Lisans SIL OFL 1.1, metni `public/yazitipleri/OFL.txt`.
- **Çizimler:** `public/cizimler/*.svg`. Doku SVG filtreleriyle üretiliyor: pastel kalem konturu, tuval, kâğıt lekeleri. Hareket azaltma tercihi olan kullanıcıya `giris-sahnesi-statik.svg` gösteriliyor.
- **CSP değişikliği:** `img-src 'self'` ve `font-src 'self'`. Yalnızca sitenin kendi dosyaları yüklenir; Google'a ya da başka bir üçüncü tarafa istek gitmez. `connect-src 'none'` aynen duruyor.

## İP 12 cüzdan aracı ile ilişki [İP24-7]

İki uygulama aynı depoda, birbirinden bağımsız:
- `cuzdan-araci/` 12 kelimeden adres türetir; yalnızca yerelde çalışır, hiçbir yere veri göndermez.
- `etkinlik-sitesi/` hiçbir gizli veri görmez; yalnızca MetaMask'in verdiği adresi bilir.

Aynı eğitim hesabını şöyle kullanıyorlar: cüzdan aracında üretilen 12 kelime MetaMask'e içe aktarıldı (İP 13);
MetaMask'teki o hesap (`0x05d782…00Af6`) etkinlik sitesine bağlanıp görevli olarak işlem imzalıyor.
İki uygulama arasında kelime, seed veya private key aktarılmaz.

## Vercel'de yayınlama

Depo GitHub'a gönderildikten sonra Vercel panelinden içe aktarılır:

1. Vercel → **Add New… → Project** → GitHub'daki `quantum-baslangic` deposunu seç. Ekip: **beguemworkspace**.
2. **Root Directory:** `etkinlik-sitesi`. Depo kökü değil, yalnızca bu klasör.
3. **Framework Preset:** Vite.
4. **Build Command:** `npm run build` · **Output Directory:** `dist` · **Install Command:** `npm install`
5. Ortam değişkeni yok. Site gizli bilgi kullanmaz; sözleşme adresi ve ABI `src/ayarlar.js` içinde ve zaten herkese açık.
6. **Deploy.**

Yayından sonra sayfa MetaMask'in kurulu olduğu bir tarayıcıda açılmalı. Çizimler (`/cizimler`) ve yazı tipleri (`/yazitipleri`) sitenin kendi dosyalarıdır; CSP yalnızca bunlara izin verir.
