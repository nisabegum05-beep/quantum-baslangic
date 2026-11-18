# Öğrenme Defterim — Cüzdan Aracı (İP 12–16)

Bu dosya rapor değildir; her adımda ne yaptığımı, nereye bakacağımı ve hangi terimleri öğrendiğimi tutar. Gizli değer içermez.

## İP 12 — Kendi cüzdan oluşturucumu yazıyorum

### ADIM 12.1 — Proje iskeleti (package.json)
- Ne yapıldı: Vite + ethers.js v6 ile çalışan, çerçevesiz (framework yok) bir web projesi kuruldu.
- Nereye bak: cuzdan-araci/package.json, satır 1–20.
- Yeni terimler (not al):
  - npm paketi — başkasının yazıp paylaştığı, projeye `npm install` ile eklenen kod kütüphanesi.
  - Vite — geliştirme sırasında dosyalarımı tarayıcıya sunan ve sonunda tek paket hâline getiren araç.
  - ethers.js — Ethereum ile ilgili kriptografik işlemleri (BIP39, BIP32, keccak, adres) hazır sunan kütüphane.
  - `"type": "module"` — dosyalarda `import` / `export` sözdiziminin kullanılacağını söyler.
- Önceden öğrendiğim terimler burada: Node.js — İP 11'de kurduğum araç; burada npm komutlarını çalıştırıyor.
- İş paketi: [İP12-4]

### ADIM 12.2 — Sayfa iskeleti ve CSP (index.html)
- Ne yapıldı: Başlık, kalıcı uyarı, "Yeni eğitim cüzdanı oluştur" düğmesi, 8 aşama kartı, doğrulama kutusu ve test vektörü bölümü stilsiz olarak yazıldı; ağ bağlantısını kapatan Content-Security-Policy eklendi.
- Nereye bak: cuzdan-araci/index.html; CSP satır 6–22, uyarı satır 33–35, aşama kartları satır 42–125.
- Yeni terimler (not al):
  - CSP (Content-Security-Policy) — tarayıcıya "bu sayfa nereden kod yükleyebilir, nereye bağlanabilir" kuralını veren başlık; `connect-src 'none'` hiçbir sunucuya bağlanmayı yasaklar.
  - data-attribute (`data-alan`, `data-gizli`) — HTML öğesine JavaScript'in okuyacağı küçük etiket eklemenin yolu.
  - semantik HTML — `<header>`, `<section>`, `<article>` gibi anlamı olan etiketlerle yapı kurmak.
- Önceden öğrendiğim terimler burada: Hash (Keccak-256) — Aşama 8 kartının açıklamasında adres hesabı için geçiyor; İP 03 notum. EIP-55 — Aşama 8 kartında büyük/küçük harf checksum'ı; İP 03 notum.
- İş paketi: [İP12-3]

### ADIM 12.3 — Boş stil dosyası (stil.css)
- Ne yapıldı: Tasarım bana bırakıldığı için dosya boş; en üstte bütün class/id'lerin listesi yorum olarak duruyor.
- Nereye bak: cuzdan-araci/stil.css, satır 1–40.
- Yeni terimler (not al): class / id — CSS'in bir öğeyi seçmek için kullandığı isimler; id tek öğeye, class birden çok öğeye verilir.
- Önceden öğrendiğim terimler burada: yok.
- İş paketi: [İP12-3] (ara aşamaların ayrı kartlarda incelenebilmesi)

### ADIM 12.4 — Aşama 1: Güvenli 128 bit entropi (1-entropi.js)
- Ne yapıldı: `randomBytes(16)` ile 16 bayt güvenli rastgele veri üretildi, `hexlify` ile 0x'li 32 karakterlik hex metne çevrildi.
- Nereye bak: cuzdan-araci/src/asamalar/1-entropi.js, satır 10–22.
- Yeni terimler (not al):
  - CSPRNG (kriptografik olarak güvenli rastgele sayı üreteci) — tahmin edilemeyen rastgelelik kaynağı; tarayıcıda `crypto.getRandomValues`.
  - Uint8Array — JavaScript'te ham bayt dizisi tipi.
  - hex (onaltılık) — her baytı 2 karakterle (0–9, a–f) yazma biçimi; 16 bayt = 32 hex karakter.
- Önceden öğrendiğim terimler burada: Entropi — burada 128 bit olarak üretiliyor, 12 kelimenin kaynağı; İP 03 notum soru 3. BIP39 — 128 bitlik girişi şart koşan standart; İP 03 notum tablo.
- İş paketi: [İP12-1]

### ADIM 12.5 — Arayüz: düğme, gizli alan, Göster/Gizle (arayuz.js)
- Ne yapıldı: Düğmeye basınca önceki değerler silinip yeni entropi üretiliyor; gizli alanlar kapalı başlıyor ve her birinin kendi Göster/Gizle düğmesi var.
- Nereye bak: cuzdan-araci/src/arayuz.js, satır 10–60.
- Yeni terimler (not al):
  - DOM — tarayıcının HTML'i JavaScript'e sunduğu nesne ağacı; `document.getElementById` buradan öğe bulur.
  - event listener (`addEventListener("click", …)`) — bir tıklama olunca çalışacak fonksiyonu kaydetme.
  - dataset — HTML'deki `data-…` etiketlerini JavaScript'ten okuma/yazma yolu.
- Önceden öğrendiğim terimler burada: Private key / mnemonic — "gizli veri ekrana ancak isteyince çıkar" kuralı bu alanlar için; İP 03 notum soru 4 (adres paylaşılır, anahtar paylaşılmaz).
- İş paketi: [İP12-3]

### ADIM 12.6 — Aşama 2: Entropiden 12 kelime (2-mnemonic.js)
- Ne yapıldı: `Mnemonic.fromEntropy(entropiHex).phrase` ile 128 bit entropi, 4 bit checksum eklenip 11'er bitlik 12 parçaya bölünerek 2048 kelimelik listeden 12 kelimeye çevrildi.
- Nereye bak: cuzdan-araci/src/asamalar/2-mnemonic.js, satır 15–22.
- Yeni terimler (not al):
  - Wordlist (kelime listesi) — BIP39'un sabit 2048 İngilizce kelimesi; her kelime 0–2047 arası bir sayıya karşılık gelir.
  - 11 bit — 2^11 = 2048; bir kelime seçmek için tam 11 bit gerekir, 12 × 11 = 132 bit.
  - SHA-256 — checksum'ı üreten hash fonksiyonu (Bitcoin'in de kullandığı).
- Önceden öğrendiğim terimler burada: Checksum — entropinin SHA-256'sının ilk 4 biti burada kelimelere ekleniyor; İP 03 notum soru 3. Mnemonic — "entropinin insanın yazabileceği hâli" dediğim şey tam burada üretiliyor; İP 03 soru 2. BIP39 — bu aşamanın standardı; İP 03 tablosu.
- İş paketi: [İP12-2]

### ADIM 12.7 — Aşama 3: 12 kelimeden seed (3-seed.js)
- Ne yapıldı: `Mnemonic.fromPhrase(kelimeler, "").computeSeed()` ile kelimeler PBKDF2-HMAC-SHA512 (2048 tur, tuz "mnemonic" + boş passphrase) üzerinden 512 bit seed'e çevrildi.
- Nereye bak: cuzdan-araci/src/asamalar/3-seed.js, satır 15–23.
- Yeni terimler (not al):
  - PBKDF2 — bir şifreyi çok kez hash'leyip anahtara çeviren yavaş fonksiyon; yavaşlık kaba kuvvet denemelerini pahalılaştırır.
  - HMAC-SHA512 — anahtarlı hash; PBKDF2'nin her turunda kullanılır, 512 bit üretir.
  - Salt (tuz) — hash'e eklenen sabit metin; BIP39'da "mnemonic" + passphrase.
  - Passphrase — kelimelere eklenen isteğe bağlı 13. "kelime"; değişirse seed ve bütün hesaplar değişir. Bu deneyde boş.
- Önceden öğrendiğim terimler burada: Seed — "mnemonic'ten türetilen 512 bitlik sayı" dediğim şey; İP 03 soru 2. Hash — PBKDF2'nin içinde 2048 kez çalışıyor; İP 03 soru 1.
- İş paketi: [İP12-2]

### ADIM 12.8 — Aşama 4: Seed'den master key (4-master-key.js)
- Ne yapıldı: `HDNodeWallet.fromSeed(seedHex)` ile BIP32 anahtar ağacının kök düğümü üretildi; `.extendedKey` ile xprv alındı ve gizli alan olarak gösterildi.
- Nereye bak: cuzdan-araci/src/asamalar/4-master-key.js, satır 17–23.
- Yeni terimler (not al):
  - Master key — seed'den HMAC-SHA512("Bitcoin seed", seed) ile üretilen ilk anahtar; ağacın kökü.
  - Chain code — master key'in yanındaki 32 bayt; alt anahtar türetirken karıştırma malzemesi.
  - Extended key (xprv) — private key + chain code'un birlikte Base58 yazılmış hâli; "xprv" ile başlar. Bütün hesapların anahtarı, bu yüzden gizli.
  - HD wallet (hierarchical deterministic) — tek kökten ağaç gibi sınırsız anahtar türeten cüzdan.
- Önceden öğrendiğim terimler burada: BIP32 — "seed'den master private key ve chain code üretir, tek kökten sınırsız alt anahtar" dediğim şey; İP 03 soru 3. Seed — bu aşamanın girdisi; İP 03 soru 2.
- İş paketi: [İP12-2]

### ADIM 12.9 — Aşama 5: Türetme yolu m/44'/60'/0'/0/0 (5-turetme-yolu.js)
- Ne yapıldı: `kokDugum.derivePath("m/44'/60'/0'/0/0")` ile kökten ilk Ethereum hesabının düğümüne inildi; yol açık alan olarak gösterildi.
- Nereye bak: cuzdan-araci/src/asamalar/5-turetme-yolu.js, satır 20–28.
- Yeni terimler (not al):
  - Coin type 60 — BIP44'te Ethereum'un numarası (Bitcoin 0).
  - Change 0 — dış (alma) adresleri dalı; Ethereum'da hep 0.
  - Adres indeksi — yolun son sayısı; MetaMask "hesap ekle" dediğinde 0, 1, 2… diye artar.
  - Hardened (') — alt anahtarın üst public key'den hesaplanamadığı türetme; ilk üç seviyede kullanılır.
- Önceden öğrendiğim terimler burada: BIP44 — notumda yolun her parçasını açıklamıştım (44 standart, 60 Ethereum, 0' hesap, 0 dış zincir, 0 ilk adres); İP 03 soru 3. Hardened türetme — aynı yer. Bu yüzden MetaMask aynı kelimelerden aynı adresi verecek.
- İş paketi: [İP12-2]

### ADIM 12.10 — Aşama 6: Private key (6-private-key.js)
- Ne yapıldı: `hesapDugumu.privateKey` ile yolun sonundaki düğümün 32 baytlık gizli anahtarı alındı; gizli alan.
- Nereye bak: cuzdan-araci/src/asamalar/6-private-key.js, satır 11–14.
- Yeni terimler (not al): yok (tek alan okuma).
- Önceden öğrendiğim terimler burada: Private key — "256 bitlik gizli sayı, harcama yetkisinin tamamı" dediğim şey; İP 03 soru 2. Dijital imza — İP 13–16'da MetaMask işlemleri bu sayıyla imzalayacak; İP 03 soru 1.
- İş paketi: [İP12-2]

### ADIM 12.11 — Aşama 7: Public key (7-public-key.js)
- Ne yapıldı: `SigningKey.computePublicKey(privateKeyHex, false)` ile 65 baytlık sıkıştırılmamış public key hesaplandı (0x04 + x + y); açık alan.
- Nereye bak: cuzdan-araci/src/asamalar/7-public-key.js, satır 14–21.
- Yeni terimler (not al):
  - Eğri çarpımı (privateKey × G) — secp256k1'de public key'i veren tek yönlü işlem.
  - Sıkıştırılmış / sıkıştırılmamış public key — 33 bayt (0x02/0x03 + x) / 65 bayt (0x04 + x + y). Adres 65 baytlıktan hesaplanır.
- Önceden öğrendiğim terimler burada: Public key — "private key'den secp256k1 eğri çarpımıyla hesaplanır, geri dönülemez"; İP 03 soru 2. secp256k1 — İP 03 soru 1.
- İş paketi: [İP12-2]

### ADIM 12.12 — Aşama 8: Adres, elle ve kontrollü (8-adres.js)
- Ne yapıldı: 0x04 öneki atıldı (`dataSlice(pub, 1)`), Keccak-256 alındı, son 20 bayt kesildi (`dataSlice(hash, 12)`), `getAddress` ile EIP-55 harfleri uygulandı; `computeAddress` ile aynı çıktığı kontrol edildi.
- Nereye bak: cuzdan-araci/src/asamalar/8-adres.js, satır 24–43.
- Yeni terimler (not al):
  - dataSlice — bayt dizisinden aralık kesme (başlangıç dahil, bitiş hariç).
  - Keccak-256 — Ethereum'un hash fonksiyonu; SHA-3 ailesinden, 32 bayt üretir.
  - computeAddress — ethers'ın "public key'den adres" hazır fonksiyonu; burada yalnızca kontrol için.
- Önceden öğrendiğim terimler burada: Adres — "public key'in Keccak-256'sının son 20 baytı" dediğim şey satır satır burada; İP 03 soru 2. EIP-55 — "büyük/küçük harf checksum'ı, harfleri farklı iki adres aynı 20 bayt olabilir"; `getAddress` bunu uyguluyor; İP 03 soru 2 ve İP 13'te MetaMask karşılaştırması.
- İş paketi: [İP12-2], [İP12-4]

### ADIM 12.13 — Zincir: 8 aşamayı tek fonksiyonda birleştirme (cuzdan-zinciri.js)
- Ne yapıldı: `cuzdanZinciriniCalistir(entropiHex?)` 8 aşamayı sırayla çağırıp tek nesne döndürüyor; entropi verilmezse yeni üretiyor, verilirse (test) ondan devam ediyor.
- Nereye bak: cuzdan-araci/src/cuzdan-zinciri.js, satır 26–48.
- Yeni terimler (not al): Varsayılan parametre (`entropiHex = entropiUret()`) — argüman verilmezse çalışan ifade. Destructuring (`const { kokDugum, masterKeyXprv } = …`) — nesneden alanları adıyla çekme.
- Önceden öğrendiğim terimler burada: Entropi → Mnemonic → Seed → Private key → Public key → Adres zinciri — İP 03 notumdaki tek satırlık şema, kodda 7 satır.
- İş paketi: [İP12-2], [İP12-4]

### ADIM 12.14 — Arayüz: gizle/göster, temizleme, adres kontrol satırı (arayuz.js)
- Ne yapıldı: 5 gizli alan (entropi, mnemonic, seed, masterKey, privateKey) kapalı başlıyor ve ayrı düğmeyle açılıyor; 3 açık alan (yol, public key, adres) doğrudan yazılıyor; yeni cüzdanda önce değişken null yapılıp ekran siliniyor; adres kontrol sonucu yazılıyor.
- Nereye bak: cuzdan-araci/src/arayuz.js, satır 14–72.
- Yeni terimler (not al): aria-live — ekran okuyucuya değişen metni bildiren HTML özelliği (index.html'de durum mesajlarında).
- Önceden öğrendiğim terimler burada: "Adres paylaşılır, anahtar paylaşılmaz" — gizli/açık alan listesi tam bu ayrım; İP 03 soru 4.
- İş paketi: [İP12-3]

### ADIM 12.15 — Mnemonic doğrulama kutusu (dogrulama.js)
- Ne yapıldı: 12 kelime için üç sonuç: önce her kelime `wordlists.en.getWordIndex` ile listede aranıyor; hepsi varsa `Mnemonic.isValidMnemonic` ile checksum kontrol ediliyor.
- Nereye bak: cuzdan-araci/src/dogrulama.js, satır 26–44.
- Yeni terimler (not al): `Array.some` — dizide koşulu sağlayan en az bir eleman var mı. `wordlists.en.split` — metni kelimelere ayıran, küçük harfe çeviren ethers yardımcısı.
- Önceden öğrendiğim terimler burada: Checksum — "listede olan ama yanlış kelimeyi checksum yakalar, 4 bit olduğu için ~1/16 ihtimalle yanlış kelime de geçer" dediğim şey; İP 13 deneyinde bunu kendim göreceğim; İP 03 soru 3.
- İş paketi: [İP13-3]

### ADIM 12.16 — Resmî BIP39 test vektörü (test-vektoru.js)
- Ne yapıldı: trezor/python-mnemonic vectors.json english[0] (entropi sıfır, passphrase "TREZOR") ile mnemonic, seed ve xprv üretilip resmî değerlerle karşılaştırıldı; sonuç "Eşleşti".
- Nereye bak: cuzdan-araci/src/test-vektoru.js, satır 15–40.
- Yeni terimler (not al): Test vektörü — standardın yazarlarının yayımladığı "bu girdi → bu çıktı" çifti; uygulamanın standarda uyduğunu kanıtlar.
- Önceden öğrendiğim terimler burada: Passphrase — vektörde "TREZOR", deneyimde boş; aynı kelimeler farklı seed veriyor, bu yüzden ayrı dosyada; İP 03 soru 3 (BIP39 salt).
- İş paketi: [İP12-5]

### ADIM 12.17 — Testler ve README (test/cuzdan.test.js, README.md)
- Ne yapıldı: Node'un yerleşik `node --test` aracıyla 7 test: vektör eşleşmesi, entropi biçimi ve farklılığı, sabit entropi → aynı sonuç, boş ≠ TREZOR seed, biçimler, elle adres = computeAddress, doğrulama kutusunun üç sonucu. README'de kod haritası ve çalıştırma komutları.
- Nereye bak: cuzdan-araci/test/cuzdan.test.js (tamamı), cuzdan-araci/README.md.
- Yeni terimler (not al): assert — "bu doğru olmalı, değilse test başarısız" komutu. Deterministik — aynı girdi her zaman aynı çıktı; sabit entropi testi bunu gösterir.
- Önceden öğrendiğim terimler burada: "Sonraki bütün adımlar aynı girdiden aynı sonucu verir" dediğim şey (İP 03 soru 3) test olarak kanıtlandı.
- İş paketi: [İP12-5], [İP12-4]

### ADIM 12.18 — Hata düzeltme: yapıştırılan kelimelerde baş/son boşluk (dogrulama.js)
- Ne yapıldı: Kopyala-yapıştırla gelen metnin başındaki/sonundaki boşluk ve satır sonu, `split`'te boş parça üretip kelime sayısını 12'den farklı saydırıyordu; `kelimeMetni.trim()` eklendi, test genişletildi.
- Nereye bak: cuzdan-araci/src/dogrulama.js, satır 27–30; cuzdan-araci/test/cuzdan.test.js son test.
- Yeni terimler (not al): trim — metnin başındaki ve sonundaki boşluk karakterlerini (boşluk, tab, satır sonu) atan string fonksiyonu. Regex `/\s+/` — bir veya daha fazla boşluk karakteri; ethers kelimeleri bununla ayırıyor.
- Önceden öğrendiğim terimler burada: Checksum kontrolü — kelime sayısı yanlış sayılınca checksum'a hiç gelinmiyordu; kontrollerin sırası (sayı → liste → checksum) burada önem kazandı; İP 03 soru 3.
- İş paketi: [İP13-3]

## İP 13 — MetaMask ile karşılaştırma ve checksum deneyi (ben yapıyorum, rehber eşliğinde)

### ADIM 13.1 — Gerçek eğitim cüzdanını üret, kelimeleri KÂĞIDA yaz
- Ne yapıldı: Uygulamada "Yeni eğitim cüzdanı oluştur" ile bir cüzdan üretildi; 12 kelime sırasıyla kâğıda yazıldı; Aşama 8'deki adres not edildi.
- Nereye bak: tarayıcı → http://localhost:5173 → Aşama 2 (Göster) ve Aşama 8 kartları.
- Yeni terimler (not al): Kurtarma kelimeleri (Secret Recovery Phrase) — MetaMask'in mnemonic'e verdiği ad.
- Önceden öğrendiğim terimler burada: Mnemonic — kâğıda yazdığım 12 kelime; İP 03 soru 2. "Cüzdan uygulaması silinse de kelimelerle hesap geri gelir" — İP 03 Benim yorumum; kâğıt bu yüzden.
- İş paketi: [İP13-1] hazırlık
- Sonuç: adres KAYIT.md'de.

### ADIM 13.2 — Ayrı tarayıcı profili + MetaMask'e içe aktarma
- Ne yapıldı: Tarayıcıda yeni profil açıldı, MetaMask resmî kaynaktan kuruldu, "Import an existing wallet" ile 12 kelime girildi, parola belirlendi. Kişisel cüzdan sıfırlanmadı.
- Nereye bak: tarayıcı profil menüsü; MetaMask kurulum ekranı.
- Yeni terimler (not al): Tarayıcı profili — ayrı uzantı, çerez ve ayar seti; MetaMask'in iki kurulumu birbirini görmez. İçe aktarma (import) — kelimelerden hesabı yeniden türetme; yeni cüzdan oluşturmak değil.
- Önceden öğrendiğim terimler burada: BIP39/BIP32/BIP44 — MetaMask kelimelerden aynı yolla (m/44'/60'/0'/0/0, boş passphrase) aynı private key'i türetiyor; İP 03 soru 3.
- İş paketi: [İP13-1]

### ADIM 13.3 — İlk hesabın adresini uygulamanın adresiyle karşılaştır
- Ne yapıldı: MetaMask Account 1 adresi kopyalanıp uygulamanın Aşama 8 adresiyle karşılaştırıldı. Harf büyüklüğü farkı varsa 40 hex karakter küçük harfe çevrilip (20 bayt) karşılaştırıldı.
- Nereye bak: MetaMask ana ekranı, hesap adının altındaki kısaltılmış adres (tıklayınca kopyalanır); uygulama Aşama 8.
- Yeni terimler (not al): Account 1 — MetaMask'in m/44'/60'/0'/0/0'dan türettiği ilk hesap.
- Önceden öğrendiğim terimler burada: EIP-55 — iki arayüz harfleri farklı gösterse de aynı 20 bayt; İP 03 soru 2. Adres — paylaşılabilir; İP 03 soru 4.
- İş paketi: [İP13-2]

### ADIM 13.4 — Eşleşme ekran görüntüsü (gizli alanlar kapalı)
- Ne yapıldı: MetaMask adresi ve uygulamanın Aşama 8 kartı aynı görüntüde; Aşama 1, 2, 3, 4, 6 kapalı. Dosya: kanitlar/ip13-1-adres-eslesme.png
- Nereye bak: kanitlar/ klasörü.
- Yeni terimler (not al): yok.
- Önceden öğrendiğim terimler burada: "Kurtarma kelimeleri ekran görüntüsüne girmemeli" — iş paketi Test Ortamı kuralı.
- İş paketi: [İP13-2]

### ADIM 13.5 — Checksum deneyi (en az 5 deneme)
- Ne yapıldı: Doğrulama kutusunda 12 kelimenin bir kelimesi listedeki başka bir kelimeyle değiştirilip sonuç kaydedildi; denemeler tabloya yazıldı.
- Nereye bak: uygulama → Mnemonic doğrulama kutusu; sonuç satırı.
- Yeni terimler (not al): Hata yakalama oranı — 4 bit checksum rastgele yanlış kelimelerin 15/16'sını yakalar, 1/16'sı geçer.
- Önceden öğrendiğim terimler burada: Checksum — "sınırlı hata yakalama" cümlem deneyle görüldü; İP 03 soru 3. Wordlist — listede olmayan kelime checksum'a gelmeden reddedilir; ADIM 12.15.
- İş paketi: [İP13-3]
- Sonuç tablosu: KAYIT.md'de.

### ADIM 13.6 — Değiştirilmiş mnemonic'i kullanmama
- Ne yapıldı: Checksum'ı geçen değiştirilmiş bir mnemonic çıksa bile MetaMask'e aktarılmadı; sonraki görevlerde yalnızca 13.3'te doğrulanan hesap kullanılacak.
- Nereye bak: yok.
- Yeni terimler (not al): yok.
- Önceden öğrendiğim terimler burada: "Geçerli görünen yanlış kelimeler başka bir hesaba karşılık gelir" — İP 03 soru 3; o hesap boş ve başka bir cüzdandır.
- İş paketi: [İP13-4]

### ADIM 12.19 — Kâğıttaki kelimelerden yeniden türetme (cuzdan-zinciri.js, arayuz.js)
- Ne yapıldı: Sayfa yenilenince değerler silindiği için, 12 kelimeden entropiye geri gidip (`Mnemonic.phraseToEntropy`) zinciri aynı entropiyle yeniden çalıştıran `kelimelerdenZinciriCalistir` eklendi; sayfaya "Kâğıttaki kelimelerden yeniden türet" bölümü geldi; kutu işlem sonrası temizleniyor.
- Nereye bak: cuzdan-araci/src/cuzdan-zinciri.js son 12 satır; cuzdan-araci/src/arayuz.js "yeniden türetme" bloğu; index.html `#yeniden-turetme`.
- Yeni terimler (not al): phraseToEntropy — BIP39'un tersi: kelimeler → 11 bitlik sayılar → checksum ayrılır → 128 bit entropi. Checksum tutmazsa hata fırlatır. try/catch — hata fırlatan kodu yakalayıp kullanıcıya mesaj gösterme.
- Önceden öğrendiğim terimler burada: "Mnemonic = entropinin yazılı hâli" — tersine çevrilebilir olduğu için kelimelerden aynı entropi ve aynı adres çıkıyor; İP 03 soru 2. Deterministiklik — ADIM 12.17.
- İş paketi: [İP12-3], [İP13-2]

### ADIM 12.20 — Tasarım (benim tarifimle): stil.css, çiçekler, yıldızlar
- Ne yapıldı: Mint arka plan; 8 kart organik blob biçiminde adaçayı/kahve/hardal döngüsüyle; kartlar arası pembe oklar CSS ile (`::before` çubuk + `::after` üçgen); iki çiçek satır içi SVG, tıklanınca `src/aciklamalar.js`'teki 10 açıklama sırayla balonda; sol yıldız = Doğrula, sağ yıldız = kelimelerden geri türet (eski düğme id'leri korunduğu için arayuz.js mantığı değişmedi).
- Nereye bak: cuzdan-araci/stil.css (tamamı); index.html çiçek/yıldız bloğu; src/aciklamalar.js; src/arayuz.js son blok.
- Yeni terimler (not al): CSS custom property (`--pembe`) — renkleri tek yerde tanımlayıp her yerde kullanma. `nth-child(3n+1)` — her üç karttan birincisini seçen kural. Pseudo-element (`::before/::after`) — HTML'e öğe eklemeden CSS ile çizim. Satır içi SVG — resim dosyası olmadan şekil; CSP `img-src 'none'` ile uyumlu.
- Önceden öğrendiğim terimler burada: CSP — dış resim/yazı tipi yasak olduğu için çiçek ve yıldızlar SVG, yazı tipi sistem fontu; ADIM 12.2.
- İş paketi: [İP12-3] (ara aşamaların ayrı ve okunur gösterimi)

### ADIM 12.21 — Tasarım düzeltmesi: okunabilirlik ve balon × düğmesi
- Ne yapıldı: Kart iç boşluğu büyütüldü ve blob eğrisi yumuşatıldı (yazı köşelerde taşıyordu); kütüphane çağrısı, değer kutusu ve kontrol satırı beyaz zemine alındı; balona × kapatma düğmesi eklendi.
- Nereye bak: cuzdan-araci/stil.css `.asama-karti`, `.kutuphane-cagrisi`, `.balon-kapat`; index.html `#balon-kapat`.
- Yeni terimler (not al): Kontrast — yazı ile zemin arasındaki açıklık farkı; okunabilirlik için gerekir. text-shadow — açık yazıyı koyu zeminde belirginleştiren gölge.
- Önceden öğrendiğim terimler burada: yok.
- İş paketi: [İP12-3]

## İP 13 — kalan iş (kullanıcı sonra yapacak)
- Checksum deneyi tablosu ve kanıt ekran görüntüleri henüz bildirilmedi; KAYIT.md'de "bildirilmedi" olarak duruyor. İP 14'e geçildi; bu deney sonradan tamamlanıp KAYIT.md'ye işlenecek.

## İP 14 — Test ETH (ben yapıyorum, rehber eşliğinde)

### ADIM 14.1 — MetaMask'te Sepolia ağını seç
- Ne yapıldı: MetaMask'te ağ seçiciden test ağları gösterilip Sepolia seçildi; adres aynı kaldı.
- Nereye bak: MetaMask sol üst ağ menüsü (Brave uzantısı) / "Tüm ağlar" filtresi.
- Yeni terimler (not al): Sepolia — Ethereum'un resmî test ağı; chain ID 11155111; ETH'sinin değeri yok. Ağ seçici — cüzdanın hangi zincire istek göndereceğini belirler.
- Önceden öğrendiğim terimler burada: Testnet/mainnet ayrımı — İP 04 soru 4. Chain ID — imzaya girer, işlem başka ağda geçmez; İP 07 soru 2. Aynı adres her EVM ağında aynıdır (adres private key'den türer, ağdan değil); İP 03 soru 2.
- İş paketi: [İP14-1]

### ADIM 14.2 — Resmî faucet bul ve güvenlik kontrolü yap
- Ne yapıldı: Resmî kaynaklardan (ethereum.org geliştirici dokümanları, büyük RPC sağlayıcılarının kendi siteleri) bir Sepolia faucet'i seçildi; alan adı, koşullar ve "yalnızca adres ister" şartı doğrulandı.
- Nereye bak: tarayıcı; faucet sayfasının adres çubuğu ve koşul metni.
- Yeni terimler (not al): Faucet — test ağında ücretsiz test varlığı dağıtan servis. PoW faucet — dağıtım koşulu olarak tarayıcıda hesaplama yaptıran faucet. Phishing — sahte site ile kelime/anahtar çalma; faucet kelime isterse sahtedir.
- Önceden öğrendiğim terimler burada: Adresi paylaşmak harcama yetkisi vermez; faucet'e yalnızca adres girilir; İP 03 soru 4. Test varlıkları satın alınmaz; İP 04 soru 4.
- İş paketi: [İP14-2]

### ADIM 14.3 — Test ETH al, işlemi cüzdanda ve Sepolia Etherscan'de bul
- Ne yapıldı: Faucet'e adres girildi; gelen işlem MetaMask "İşlemler" sekmesinde ve sepolia.etherscan.io'da adres aranarak bulundu; tx hash kaydedildi.
- Nereye bak: MetaMask → İşlemler; sepolia.etherscan.io → adres → "Transactions" sekmesi → ilk satır → tx sayfası.
- Yeni terimler (not al): Block explorer araması — adres yazınca o adresin tüm işlemleri listelenir. Incoming (gelen) işlem — From faucet, To benim adresim.
- Önceden öğrendiğim terimler burada: Tx hash — işlemin kimliği; İP 07 soru 3. Status 1 = başarılı; İP 07 soru 4. Block explorer zincirin penceresi; İP 06 soru 2.
- İş paketi: [İP14-3]

### ADIM 14.4 — PoW faucet kullanıldıysa: bu madencilik değil
- Ne yapıldı: Tarayıcıdaki hesaplamanın faucet'in kendi dağıtım koşulu olduğu, Sepolia'da blok üretmekle ilgisi olmadığı araştırıldı.
- Nereye bak: faucet'in açıklama sayfası.
- Yeni terimler (not al): Anti-spam PoW — faucet'in botları caydırmak için istediği hesaplama; zincire yazılmaz.
- Önceden öğrendiğim terimler burada: PoW/PoS — Sepolia PoS ile çalışır, blokları validatörler üretir; İP 02 soru 2. Node ≠ validatör; İP 02 soru 1.
- İş paketi: [İP14-4]

### İP 14 — gerçekleşen (olgu özeti, ayrıntı KAYIT.md)
- Sepolia seçildi; Chainlink faucet'inden (faucets.chain.link) mesaj imzasıyla 0.05 ETH alındı; işlem Etherscan'de bulundu (tx 0xb1d9ca40…693e36, blok 12140988, Success).
- Öğrendiğim ayrımlar: gelen işlem MetaMask aktivitesinde görünmez (gönderen faucet); explorer'a adres girilir, public key değil; faucet'in kendisi 1 milyon+ işlem göndermiş sıradan bir cüzdan; "mesaj imzalamak" işlem göndermek değildir (gas yok, zincire yazılmaz).
- Makbuz alanları: Status Success = başarı kanıtı; Block + confirmations = bloğa alınma ve üstüne eklenen bloklar; Transaction Fee = gas used × gas price (21 wei → faucet ödedi); Logs (1) = işlemin event'i.

## İP 15 — Test USDC ve iki transfer (ben yapıyorum, rehber eşliğinde)

### ADIM 15.1 — Circle'ın resmî faucet'i ve USDC sözleşme adresi
- Ne yapıldı: developers.circle.com'daki "USDC contract addresses" sayfasından Ethereum Sepolia USDC adresi bulundu; faucet.circle.com'dan test USDC istendi.
- Nereye bak: developers.circle.com/stablecoins/usdc-contract-addresses (tablo: Ethereum Sepolia); faucet.circle.com.
- Yeni terimler (not al): Token sözleşme adresi — token'ın bakiyelerini tutan akıllı sözleşmenin adresi; aynı "USDC" adını taşıyan sahte sözleşmeler olabileceği için resmî kaynaktan alınır. Resmî kaynak — projenin kendi alan adı (circle.com), üçüncü taraf liste değil.
- Önceden öğrendiğim terimler burada: Token vs native varlık — USDC bir ERC-20 sözleşmesi, bakiyeler sözleşmenin içinde; İP 04 soru 2. Test USDC'nin rezervi yok; İP 04 soru 4.
- İş paketi: [İP15-1]

### ADIM 15.2 — USDC'yi MetaMask'te görünür yapma
- Ne yapıldı: MetaMask → Tokenlar → "Token içe aktar" → özel token → sözleşme adresi yapıştırıldı; sembol USDC, ondalık 6 otomatik geldi.
- Nereye bak: MetaMask Tokenlar sekmesi.
- Yeni terimler (not al): Decimals (ondalık) — USDC 6 ondalık kullanır: 1 USDC = 1.000.000 en küçük birim (ETH'de 18). Token içe aktarma — cüzdana "bu sözleşmenin bakiyemi de göster" demek; zincirde hiçbir şey değişmez.
- Önceden öğrendiğim terimler burada: "Token'ı cüzdanda göstermek ile zincirde almak farklıdır" — İP 15 maddesi; bakiye sözleşmenin storage'ında (state) zaten var, cüzdan sadece okur (`balanceOf`); İP 05 soru 4 (okuma ücretsiz).
- İş paketi: [İP15-1]

### ADIM 15.3 — İkinci eğitim hesabı
- Ne yapıldı: MetaMask → Hesap ekle → yeni Ethereum hesabı; aynı 12 kelimeden m/44'/60'/0'/0/1 türetildi; adres kaydedildi.
- Nereye bak: MetaMask hesap listesi → Account 2 → Hesap ayrıntıları.
- Yeni terimler (not al): Hesap indeksi — yolun son sayısı; 0 ilk hesap, 1 ikinci hesap. Aynı kelimeler, farklı dal.
- Önceden öğrendiğim terimler burada: BIP44 yolu — ADIM 12.9'daki "küçük değişiklik" (son 0'ı 1 yap) tam bu hesabı verir; İP 03 soru 3. HD cüzdan — tek kökten çok hesap; ADIM 12.8.
- İş paketi: [İP15-2]

### ADIM 15.4 — İlk hesaptan ikinciye az ETH gönder
- Ne yapıldı: Account 1 → Gönder → Account 2 adresi → küçük miktar ETH (ör. 0.005); MetaMask gas tahmini onaylandı; tx hash kaydedildi. İlk hesapta İP 16 için ETH bırakıldı.
- Nereye bak: MetaMask Gönder ekranı; onay penceresinde "Ağ ücreti"; sonra Etherscan tx sayfası.
- Yeni terimler (not al): Gas tahmini — cüzdanın işlem için öngördüğü gas limit × gas fiyatı. Nonce 0 — bu hesabın ilk gönderdiği işlem.
- Önceden öğrendiğim terimler burada: İşlem göndermek = imza + gas + bloğa girme; İP 07 soru 1. Gas limit/used/ücret; İP 07 soru 2.
- İş paketi: [İP15-2]

### ADIM 15.5 — İlk hesaptan ikinciye test USDC gönder
- Ne yapıldı: Account 1 → Tokenlar → USDC → Gönder → Account 2 → miktar (ör. 1 USDC); onaylandı; tx hash kaydedildi. Ücret ETH bakiyesinden düştü.
- Nereye bak: MetaMask onay penceresi: "Ağ ücreti" ETH cinsinden; Etherscan tx sayfası.
- Yeni terimler (not al): ERC-20 transfer çağrısı — işlemin To alanı USDC sözleşmesi, alıcı ve miktar Input Data içinde. Transfer event'i — sözleşmenin "şu adresten şuna şu kadar gitti" diye bıraktığı log.
- Önceden öğrendiğim terimler burada: "USDC gönderirken To = sözleşme adresi, Value = 0, alıcı Input Data'da, Transfer event'i yayımlanır, ücret ETH'den" — İP 04 soru 2'de yazdığım cümle, şimdi gözlemleniyor. ABI — Input Data'nın okunabilir hâli ABI ile çözülür; İP 05 soru 3. Event vs state; İP 06 soru 3.
- İş paketi: [İP15-2], [İP15-3]

### ADIM 15.6 — İki işlemi Etherscan'de alan alan karşılaştır
- Ne yapıldı: ETH ve USDC işlemlerinin To, Value, Input Data, Transaction Fee, Logs/Token Transferred alanları tabloya yazıldı.
- Nereye bak: iki tx sayfası; "More Details → Click to show more" altında Input Data; "Logs" sekmesi.
- Yeni terimler (not al): Decode Input Data — Etherscan'in ABI ile Input Data'yı `transfer(address to, uint256 amount)` olarak göstermesi. Method ID — Input Data'nın ilk 4 baytı (0xa9059cbb = transfer).
- Önceden öğrendiğim terimler burada: Native varlık ile token farkı — İP 04 soru 2; bu tablo o sorunun kanıtı.
- İş paketi: [İP15-3]
