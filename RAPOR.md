# Teslim Raporu — Quantum Yeni Üye İş Paketi

**Hazırlayan:** Nisa Begüm Erkılıç 

**Kim ne yaptı?**
- İP 01–10 araştırma notlarını kendim yazdım.
- Cüzdan, faucet, transfer, Remix ve Sepolia deploy işlemlerini kendim yaptım ve ekran görüntülerini kendim aldım. Siteleri Vercel'e ben yükledim.
- Kodları yapay zekâ asistanı Claude Code yazdı: cüzdan oluşturucu, Kadınzincir sözleşmesi ve etkinlik sitesi. Kuralları, tasarımı ve akışı ben belirledim. Her adımın açıklamasını okuyup sorularımı sordum.
- İP 11–17 notlarını ve bu raporu asistan, yaptıklarımdan ve mesajlarımdan taslak olarak yazdı. Bazı yerleri kendim düzelttim.
- Bazı doğrulamaları asistan yaptı. Bunlar İP 17'deki Etherscan değerleri, İP 20–22'deki yerel EVM çalıştırmaları, İP 23'teki zincir okumaları ve sözleşme bayt kodu karşılaştırması. İlgili yerlerde ayrıca belirtildi.

## 1. Durum özeti

| İP | Konu | Durum | Nerede |
|---|---|---|---|
| 01–10 | Araştırma notları | Tamamlandı | Depo kökündeki not dosyaları (aşağıda 6. bölüm) |
| 11 | Çalışma ortamı | Tamamlandı | [`notlar/ip11-calisma-ortami.md`](./notlar/ip11-calisma-ortami.md), [`README.md`](./README.md) |
| 12 | Kendi cüzdan oluşturucum | Tamamlandı · yayında: https://etkinlikcuzdani-araci.vercel.app/ | [`cuzdan-araci/`](./cuzdan-araci/), [`notlar/ip12-cuzdan-olusturucu.md`](./notlar/ip12-cuzdan-olusturucu.md) |
| 13 | MetaMask karşılaştırması ve checksum | Tamamlandı | [`notlar/ip13-metamask-ve-checksum.md`](./notlar/ip13-metamask-ve-checksum.md) |
| 14 | Test ETH | Tamamlandı | [`notlar/ip14-test-eth.md`](./notlar/ip14-test-eth.md) |
| 15 | Test USDC ve iki transfer | Tamamlandı | [`notlar/ip15-test-usdc-ve-iki-transfer.md`](./notlar/ip15-test-usdc-ve-iki-transfer.md) |
| 16 | Remix ile isim kaydı | Tamamlandı | [`notlar/ip16-remix-ile-isim-kaydi.md`](./notlar/ip16-remix-ile-isim-kaydi.md) |
| 17 | Explorer ile doğrulama | Kısmen: `tumKayitlar` okumasını Remix'te kendim yaptım. Etherscan alanlarını, Input Data'yı ve event'i asistan okudu. Ekran görüntüsü yok, Etherscan bağlantıları var | [`notlar/ip17-explorer-ile-kayit-dogrulama.md`](./notlar/ip17-explorer-ile-kayit-dogrulama.md) |
| 18–19 | Takım sözleşmesinin kopyası: deploy, verify ve Write Contract ile kayıt | Kısmen: kaynak kod ve derleyici ayarları hazır (0.8.24, optimizer kapalı, EVM cancun). Deploy, verify ve kopyaya kayıt yapılmadı | [`takim-sozlesmesi-kopyasi/`](./takim-sozlesmesi-kopyasi/) |
| 20 | İlk etkinlik kaydı | Tamamlandı: iki kayıt ve başka hesaptan okuma Remix VM'de, ekran görüntüsüyle. Ek üç okuma asistanın yerel EVM çalıştırmasından | [`etkinlik-sozlesmesi/EtkinlikKaydi_v1.sol`](./etkinlik-sozlesmesi/EtkinlikKaydi_v1.sol) |
| 21 | Kapasite ve kayıt kuralları | Kısmen: üç kayıt ve kapasite reddini Remix VM'de kendim yaptım, ekran görüntüsü var. Tekrar kayıt, boş ad ve iki beyan denemelerini Remix'te yapmadım. Bunlar asistanın yerel EVM çalıştırmasından | [`etkinlik-sozlesmesi/Kadinzincir_v2.sol`](./etkinlik-sozlesmesi/Kadinzincir_v2.sol) |
| 22 | Görevli ve giriş kontrolü | Kısmen: kod tamam. Giriş denemelerini Remix VM'de yapmadım. Gözlemlerin hepsi asistanın yerel EVM çalıştırmasından | [`etkinlik-sozlesmesi/Kadinzincir_v3.sol`](./etkinlik-sozlesmesi/Kadinzincir_v3.sol) |
| 23 | Sepolia'ya taşıma | Kısmen: deploy'u kendim yaptım. `gorevli()` değerini ve bayt kodu eşleşmesini asistan zincirden doğruladı. İkinci hesapla kayıt ve görevli onayı bekliyor | [`etkinlik-sozlesmesi/README.md`](./etkinlik-sozlesmesi/README.md) |
| 24 | Cüzdan bağlantılı web arayüzü | Kısmen: kod tamam ve yayında: https://etkinlik-sitesi-ivory.vercel.app/. Sitede henüz kayıt ve görevli onayı yapılmadı | [`etkinlik-sitesi/`](./etkinlik-sitesi/) |
| 25 | Bekleme ve hata durumları | Kısmen: bekleme, ret ve hata mesajları kodda var. Sitede senaryo denemeleri yapılmadı | [`etkinlik-sitesi/src/arayuz.js`](./etkinlik-sitesi/src/arayuz.js) |

## 2. Adresler ve işlemler (hepsi Sepolia)

| Ne | Değer |
|---|---|
| Eğitim hesabı (görevli) | `0x05d782Efca095aF3569D76Ef5542c352B3800Af6` |
| İkinci eğitim hesabı | `0x72d419faA7B4bbc4Bfa1956C81597EDb750E0F4B` (yol `m/44'/60'/0'/0/1`) |
| Takım sözleşmesi (QuantumKayit) | `0x81Dd700C459BF2806A1B5F2a349c89f0106A9036` |
| Test USDC sözleşmesi (Circle) | `0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238` |
| Kendi etkinlik sözleşmem (Kadinzincir v3) | `0x2Ee529a07e98dEEe473bE9bb0f2a63e757a01e65` |

| İşlem | Tx hash | Blok | Sonuç |
|---|---|---|---|
| Faucet → eğitim hesabı, 0.05 ETH (İP 14) | `0xb1d9ca4010e707066fd361dcb23ce79ce90ff6660cd70b07bc120e959b693e36` | 12140988 | Success |
| İsim kaydı, `nisabegumerkilic` (İP 16) | `0x67587deae063fe93b5678de80f6c66ce83a965fb3149ab8e794011afdfb06222` | 12141331 | Success · sıra 8 |
| İkinci kayıt denemesi (İP 16-5) | `0x9eb7161beb8d120af9434856ecd46984001572b81a244e2ef25ca315503670e5` | 12141332 | Fail · "Bu cuzdan zaten kayitli" |
| 0.005 ETH → ikinci hesap (İP 15) | `0x69960fc772a8a513dfc8c14efb6b08c244275db6c830de91c323ed3a61604da9` | 12163205 | Success |
| 10 USDC → ikinci hesap (İP 15) | `0x28e9bebc0a1ee6d2a121cc62cea2822e6f66ff30b4ada397354b1b14370a0520` | 12163212 | Success |
| Kadinzincir v3 deploy (İP 23) | `0x5dcd7f9efc6588beac8812801ab7136f0218035ba15cca2853903a407ca2678a` | 12175921 | Success |

Eğitim hesabının nonce sırası: 0 isim kaydı · 1 başarısız ikinci kayıt · 2 ETH transferi · 3 USDC transferi · 4 Kadinzincir deploy.

## 3. İP 12–17: ne yapıldı

- **İP 12 — Cüzdan oluşturucu.** Claude Code, Vite + ethers v6 ile yazdı. Uygulamayı ben çalıştırıp denedim ve tasarımını ben belirledim. Akış 8 ayrı dosyada: entropi → 12 kelime → seed → master key → `m/44'/60'/0'/0/0` → private key → public key → adres. Adresi elle türetip `computeAddress` ile karşılaştırıyorum. Gizli alanlar kapalı başlıyor. CSP her türlü ağ bağlantısını kapatıyor. Resmî BIP39 vektörü (TREZOR) eşleşiyor; `npm test` 8/8. Yayında: https://etkinlikcuzdani-araci.vercel.app/
- **İP 13 — MetaMask karşılaştırması.** Uygulamanın adresi ile MetaMask'in ilk hesabı aynı 20 bayt, EIP-55 harfleri dahil: `0x05d782…00Af6`. Kendi kelimelerimle checksum kutusunu denedim. Üç sonucun resmî test kelimeleriyle kontrolü uygulamanın otomatik testinde. Kelimeleri sohbete giren bir cüzdan terk edildi ve yenisi üretildi.
- **İP 14 — Test ETH.** Chainlink faucet'i yalnızca adres ve düz metin bir mesaj imzası istedi. Faucet'in gönderdiği 0.05 ETH Etherscan'de bulundu. PoW faucet kullanılmadı.
- **İP 15 — İki transfer.**
  - ETH işleminde To ikinci hesap, Value 0.005, Input boş.
  - USDC işleminde To USDC sözleşmesi, Value 0, Input `transfer(address,uint256)` (seçici `0xa9059cbb`, 10.000.000 birim = 10 USDC), Transfer event'i var.
  - İki ücret de ETH'den ödendi.
- **İP 16 — İsim kaydı.** Remix'te Browser Extension ve Sepolia seçiliyken At Address ile takım sözleşmesine bağlandım, Deploy kullanmadım. İsim `nisabegumerkilic`. İsimde Türkçe "ı" kalmış ilk onayı iptal ettim; o işlem hiç oluşmadı. İkinci kayıt denemesi zincirde revert oldu.
- **İP 17 — Doğrulama.** `tumKayitlar` ile kendi satırımı Remix'te okudum: sıra 8. İşlemin Etherscan alanlarını, Decode Input Data (`register(string)` → `nisabegumerkilic`) ve Registered event'ini asistan Etherscan'den okudu. Not ve akış şeması bu değerlerle yazıldı.

## 4. İP 20–25: Geliştirici Kadınlar Etkinliği

Etkinlik sözleşmesinin kurallarını ben belirledim, kodunu Claude Code sıfırdan yazdı. Etkinlik, kendini kadın olarak tanımlayan geliştiricilere yönelik. Sözleşme üç sürümde gelişti; her sürüm ayrı dosyada duruyor ve ilk sürüm silinmedi.

| Sürüm | Ne ekliyor | Denendiği yer |
|---|---|---|
| v1 `EtkinlikKaydi_v1.sol` | Etkinlik adı (constructor), adres → takma ad, dışarıdan okuma | Remix VM: Account 1 `Ayşe`, Account 2 `zeynepsu`. Account 2, Account 1'in kaydını okudu (okuma herkese açık, yazma yalnızca `msg.sender`'ın kendi satırına). |
| v2 `Kadinzincir_v2.sol` | Kadın ve geliştirici beyanı zorunlu, boş ad reddi, tekrar kayıt reddi, kapasite (deploy'da), `toplamKayit` | Remix VM, kapasite 3: üç kayıttan sonra dördüncü hesap "Kapasite dolu" ile reddedildi (zincirde revert, gas ödendi); toplam 3 kaldı. |
| v3 `Kadinzincir_v3.sol` | Görevli (deploy eden), `girisOnayla`, `girisYaptiMi`, `Kaydoldu` ve `GirisYapti` event'leri | Giriş denemeleri Remix VM'de yapılmadı. Sepolia'ya kendim deploy ettim: blok 12175921, görevli `0x05d7…00Af6`, ad `KadınZincir`, kapasite 3, solc 0.8.34, optimizer kapalı, EVM osaka. |

**Gözlemlerin kaynağı.** Remix VM'de kendim yaptığım denemeler ekran görüntüsüyle kayıtlı. Yapmadığım denemeler için yapay zekâ asistanı aynı kaynak kodu yerel bir EVM'de (`@ethereumjs/evm`, Remix'in varsayılan hesap adresleriyle) otomatik çalıştırdı. Sözleşme README'sinde her gözlemin hangisinden geldiği işaretli.

**Zincirdeki sözleşme doğrulaması (asistan, 20.11.2026).** `0x2Ee5…1e65` adresindeki kod, depodaki `Kadinzincir_v3.sol` dosyasının solc 0.8.34 derlemesiyle bayt bayt aynı. Derleme ayarları optimizer kapalı ve EVM osaka, metadata da eşleşiyor. Koda gömülü görevli `0x05d7…00Af6`, kapasite 3. Constructor parametreleri `KadınZincir` ve 3. Deploy işlemini nonce 4 ile eğitim hesabım gönderdi. Sözleşme Etherscan'de verify edilmedi. Bütün kurallar beklenen mesajla çalıştı: tekrar kayıt, boş ad, iki beyan, kapasite, görevli dışı onay, kayıtsız adres ve ikinci giriş reddedildi. Ayrıca beyanların kapasiteden önce denetlendiği ve v1'in aynı adresle tekrar çağrılınca takma adın üstüne yazdığı görüldü.

**Neden "beyan"?** Sözleşme cinsiyeti ya da geliştiriciliği doğrulayamaz; yalnızca beyanı zorunlu kılar. Gerçek kontrolü kapıda görevli yapar ve yetki `girisOnayla` içindeki `require(msg.sender == gorevli)` satırıyla sözleşmede denetlenir. Zincire "gizli soru-cevap" koymak işe yaramaz, çünkü Input Data herkese açıktır.

**İP 24 sitesi (`etkinlik-sitesi/`)**
- Vercel'de yayında: https://etkinlik-sitesi-ivory.vercel.app/
- MetaMask ile bağlanıyor ve Sepolia dışındaki ağlarda işlem göndermiyor.
- Etkinlik adını, kapasiteyi, toplam kaydı ve görevliyi sözleşmeden okuyor.
- Kayıt ve görevli onayı için düğmeler var. Canlı sitede henüz hiç işlem gönderilmedi, sözleşmedeki kayıt sayısı 0.
- Yayındaki dosyalar depodaki kodun derlemesiyle birebir aynı. Bunu asistan kontrol etti.
- Kod, başarıyı makbuzdaki status 1 ile gösterecek şekilde yazıldı; "MetaMask onayı bekleniyor" ile "zincir sonucu bekleniyor"u ayırıyor; reddi ve sonucu bilinmeyen işlemi ayrı mesajla bildiriyor.
- Hiçbir gizli veri istemiyor.
- Adres ve ABI tek yerde: `src/ayarlar.js`.
- Tasarım: naif masal kitabı üslubu. Giriş sahnesinde yuvarlak masada kod yazan üç kadın var; dokununca 10 blokzincir bilgisini sırayla söyleyen kara kedi ve çilek de orada.

## 5. Kanıt görselleri (`kanitlar/`)

| İP | Dosya | Gösterdiği |
|---|---|---|
| 13 | `ip13-1-adres-eslesme.png` | Uygulama ve MetaMask aynı adres; gizli alanlar kapalı |
| 13 | `ip13-2a-dogrulama-kutusu-kapatilmis.png` | Doğrulama kutusu; kelimeler kapatılmış |
| 14 | `ip14-0-faucet-imza-talebi.png` | Faucet'in mesaj imzası (işlem değil) |
| 14 | `ip14-1-faucet-tx-etherscan.png` | Faucet işleminin makbuzu, Success |
| 14 | `ip14-2-adres-sayfasi-ve-metamask.png` | Adres sayfası ve MetaMask bakiyesi |
| 14 | `ip14-3-faucet-adres-sayfasi.png` | Faucet cüzdanının işlem listesi |
| 15 | `ip15-1-eth-transfer-tx.png`, `ip15-2-usdc-transfer-tx.png` | İki işlemin karşılaştırılan alanları |
| 15 | `ip15-4-hesap-islem-listesi.png` | OUT/IN listesi; başarısız ikinci kayıt dahil |
| 15 | `ip15-5-eth-onay-penceresi.png`, `ip15-6-usdc-onay-penceresi.png` | Onay pencerelerinde ücret SepoliaETH cinsinden |
| 20 | `ip20-1a-okuma-account1.png` | Account 2 seçiliyken Account 1'in kaydını okuma |
| 21 | `ip21-1-kapasite-dolu.png`, `ip21-1b-toplam-kayit-3.png` | Kapasite reddi ve toplam 3 |
| 21 | `ip21-4-okuma-ve-adres-hatasi.png` | Okuma ve ABI tür denetimi (adres yerine isim) |
| 23 | `ip23-0-deploy-makbuz.png` | Sepolia deploy makbuzu, status 1 |

İP 16 ve 17 için ekran görüntüsü yerine işlemlerin Etherscan bağlantıları ve sayfalardaki değerler notlarda verildi.

## 6. Notlar (İP 01–17)

| İP | Dosya |
|---|---|
| 01 | `-BlokzincirTemelleri` |
| 02 | `-Node ve Konsensüs` |
| 03 | `-Kriptografi ve Cüzdan` |
| 04 | `-Bitcoin Ethereum ve Token` |
| 05 | `-Akıllı Sözleşme ve ABI` |
| 06 | `-RPC EXPLORER VE EVENT` |
| 07 | `-Bir işlemin yolculuğu` |
| 08 | `-Ekosistemi Tanı` |
| 09 | `PROJE ANLATIM:HALOCLINE` |
| 10 | `ŞARTNAME ÖZET` |
| 11–17 | `.md` uzantılı notlar (1. bölümdeki tablo) |

## 7. Benim yorumum (İP 20–24)

- **İP 20 — İlk sürüm hangi yanlış kullanımları engellemiyor?** Boş takma ad kabul ediliyordu ve kayıtsız biriyle ayırt edilemiyordu. Aynı adres tekrar çağırınca eski adın üstüne yazıyordu. Kapasite yoktu ve kimin kayıtlı olduğu sayılmıyordu. v2 bunların hepsini `require` ile kapattı.
- **İP 21 — Adres başına sınır neden kişi sayısını garanti etmez?** Bir kişi saniyeler içinde istediği kadar yeni cüzdan açabilir; İP 15'te ben de aynı kelimelerden ikinci bir hesap türettim. Sözleşme yalnızca adresleri sayar, insanları değil. Kadınzincir'deki beyanlar da aynı nedenle bir kanıt değil, bir taahhüttür.
- **İP 22 — Yetki neden arayüzde değil sözleşmede?** Sitede "Girişi onayla" düğmesini gizlesem bile herkes aynı fonksiyonu Remix'ten ya da Etherscan'den doğrudan çağırabilir; İP 16'da ben de takım sözleşmesine başka bir arayüzden bağlandım. Gerçek kilit, sözleşmedeki `require(msg.sender == gorevli)` satırı.
- **İP 23 — Yerel ve Sepolia sürümlerini nasıl karıştırmam?** Ağı (chain ID 11155111), sözleşme adresini ve deploy tx hash'ini kontrol ederim. Remix'te Environment satırına bakarım. Remix VM'deki `0x652…` ve `0xd91…` adresleri yalnızca tarayıcımda vardı; Begüm, Ayşe ve zeynepsu kayıtları Sepolia'daki yeni örnekte yok.
- **İP 24 — Kodda nerede ne var?**
  - Cüzdan bağlantısı: `src/cuzdan.js` → `cuzdanBagla()`
  - Veri okuma: `src/sozlesme.js` → `etkinlikBilgisiOku()`, `kullaniciDurumuOku()`
  - Sözleşme çağrıları: `kayitOl()`, `girisOnayla()`, ortak `islemGonder()`
  - Ekran: `src/arayuz.js`

