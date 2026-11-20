# quantum-baslangic

Quantum Blokzincir Takımı yeni üye iş paketi çalışmam.

İş paketini İP 01'den İP 25'e kadar baştan sona çalıştım ve konuları anladım. Amacım unuttuğum yerleri hatırlamak ve başlıkları kendi cümlelerimle tekrar etmekti. Bu yüzden zaten bildiğim konuları da yeniden yazdım.

**Teslim raporu:** [RAPOR.md](./RAPOR.md). Her İP'nin durumu, işlem hash'leri, kanıtları ve henüz yapmadığım adımlar orada.

**Kim ne yaptı?** İP 01–10 notlarını kendim yazdım. Cüzdan, transfer, Remix ve deploy işlemlerini kendim yaptım. Kodları ve İP 11–17 not taslaklarını yapay zekâ asistanı Claude Code ile yazdım. Kuralları, tasarımı ve akışı ben belirledim. Ayrıntısı raporun başında.

## Yaptığım siteler

| Site | Canlı adres | Kod | İP |
|---|---|---|---|
| Eğitim Cüzdanı Oluşturucu | https://etkinlikcuzdani-araci.vercel.app/ | [`cuzdan-araci/`](./cuzdan-araci/) | 12–13 |
| Geliştirici Kadınlar Etkinliği | https://etkinlik-sitesi-ivory.vercel.app/ | [`etkinlik-sitesi/`](./etkinlik-sitesi/) | 24–25 |

- **Cüzdan oluşturucu** 128 bit entropiden Ethereum adresine giden 8 adımı tek tek gösterir. Yalnızca eğitim içindir, ürettiği hesaba gerçek varlık gönderilmemelidir.
- **Etkinlik sitesi** MetaMask ile Sepolia'daki kendi sözleşmem Kadınzincir'e bağlanır. Kayıt ve görevli giriş onayı için tasarlandı. Canlı sitede henüz işlem gönderilmedi. Göndereceğim

- İki sitenin güvenlik politikası (CSP) hiçbir sunucuya veri gönderilmesine izin vermez.

## Başlıklarım ve kanıtlarım

| İP | Başlık | Not / kod | Kanıt |
|---|---|---|---|
| 01 | Blokzincir temelleri | [`-BlokzincirTemelleri`](<./-BlokzincirTemelleri>) | araştırma notu |
| 02 | Node ve konsensüs | [`-Node ve Konsensüs`](<./-Node ve Konsensüs>) | araştırma notu |
| 03 | Kriptografi ve cüzdan | [`-Kriptografi ve Cüzdan`](<./-Kriptografi ve Cüzdan>) | araştırma notu |
| 04 | Bitcoin, Ethereum ve token | [`-Bitcoin Ethereum ve Token`](<./-Bitcoin Ethereum ve Token>) | araştırma notu |
| 05 | Akıllı sözleşme ve ABI | [`-Akıllı Sözleşme ve ABI`](<./-Akıllı Sözleşme ve ABI>) | araştırma notu |
| 06 | RPC, explorer ve event | [`-RPC EXPLORER VE EVENT`](<./-RPC EXPLORER VE EVENT>) | araştırma notu |
| 07 | Bir işlemin yolculuğu | [`-Bir işlemin yolculuğu`](<./-Bir işlemin yolculuğu>) | araştırma notu |
| 08 | Ekosistemi tanı | [`-Ekosistemi Tanı`](<./-Ekosistemi Tanı>) | araştırma notu |
| 09 | Proje anlatımı: HALOCLINE | [`PROJE ANLATIM:HALOCLINE`](<./PROJE ANLATIM:HALOCLINE>) | araştırma notu |
| 10 | Şartname özeti | [`ŞARTNAME ÖZET`](<./ŞARTNAME ÖZET>) | araştırma notu |
| 11 | Çalışma ortamını hazırla | [`-Çalışma Ortamı.md`](<./-Çalışma Ortamı.md>) | bu depo |
| 12 | Kendi cüzdan oluşturucunu yaz | [`-Cüzdan Oluşturucu.md`](<./-Cüzdan Oluşturucu.md>) | canlı site, `npm test` 8/8, resmî BIP39 vektörü |
| 13 | MetaMask ile karşılaştır ve checksum deneyi yap | [`-MetaMask ve Checksum.md`](<./-MetaMask ve Checksum.md>) | [adres eşleşmesi](./kanitlar/ip13-1-adres-eslesme.png), [doğrulama kutusu](./kanitlar/ip13-2a-dogrulama-kutusu-kapatilmis.png) |
| 14 | Test ETH kaynağını kendin bul | [`-Test ETH.md`](<./-Test ETH.md>) | [imza talebi](./kanitlar/ip14-0-faucet-imza-talebi.png), [faucet işlemi](./kanitlar/ip14-1-faucet-tx-etherscan.png), [adres sayfası](./kanitlar/ip14-2-adres-sayfasi-ve-metamask.png), [faucet cüzdanı](./kanitlar/ip14-3-faucet-adres-sayfasi.png) |
| 15 | Test USDC edin ve iki transferi karşılaştır | [`-Test USDC ve İki Transfer.md`](<./-Test USDC ve İki Transfer.md>) | [ETH işlemi](./kanitlar/ip15-1-eth-transfer-tx.png), [USDC işlemi](./kanitlar/ip15-2-usdc-transfer-tx.png), [işlem listesi](./kanitlar/ip15-4-hesap-islem-listesi.png), [ETH onayı](./kanitlar/ip15-5-eth-onay-penceresi.png), [USDC onayı](./kanitlar/ip15-6-usdc-onay-penceresi.png) |
| 16 | Remix ile gerçek ismini kaydet | [`-Remix ile İsim Kaydı.md`](<./-Remix ile İsim Kaydı.md>) | [kayıt işlemi](https://sepolia.etherscan.io/tx/0x67587deae063fe93b5678de80f6c66ce83a965fb3149ab8e794011afdfb06222) (Etherscan) |
| 17 | Explorer ile kaydı doğrula | [`-Explorer ile Kayıt Doğrulama.md`](<./-Explorer ile Kayıt Doğrulama.md>) | [başarısız ikinci kayıt](https://sepolia.etherscan.io/tx/0x9eb7161beb8d120af9434856ecd46984001572b81a244e2ef25ca315503670e5) (Etherscan). Değerleri asistan okudu, ekran görüntüsü yok |
| 18–19 | Takım sözleşmesinin kopyası | [`takim-sozlesmesi-kopyasi/`](./takim-sozlesmesi-kopyasi/) | **yapılmadı**: kaynak kod ve derleyici ayarları hazır, deploy yok |
| 20 | İlk etkinlik kaydı | [`etkinlik-sozlesmesi/`](./etkinlik-sozlesmesi/) | [okuma](./kanitlar/ip20-1a-okuma-account1.png) |
| 21 | Kapasite ve kayıt kuralları | [`etkinlik-sozlesmesi/`](./etkinlik-sozlesmesi/) | [kapasite dolu](./kanitlar/ip21-1-kapasite-dolu.png), [toplam 3](./kanitlar/ip21-1b-toplam-kayit-3.png), [adres hatası](./kanitlar/ip21-4-okuma-ve-adres-hatasi.png) |
| 22 | Görevli ve giriş kontrolü | [`etkinlik-sozlesmesi/`](./etkinlik-sozlesmesi/) | deneme tablosu sözleşme README'sinde |
| 23 | Sepolia'ya taşıma | [`etkinlik-sozlesmesi/`](./etkinlik-sozlesmesi/) | [deploy makbuzu](./kanitlar/ip23-0-deploy-makbuz.png) |
| 24–25 | Cüzdan bağlantılı web arayüzü, bekleme ve hata durumları | [`etkinlik-sitesi/`](./etkinlik-sitesi/) | canlı site |

## Önemli adresler (Sepolia)

| Ne | Adres |
|---|---|
| Eğitim hesabım (etkinlikte görevli) | `0x05d782Efca095aF3569D76Ef5542c352B3800Af6` |
| Takım sözleşmesi (QuantumKayit) | `0x81Dd700C459BF2806A1B5F2a349c89f0106A9036` |
| Kendi etkinlik sözleşmem (Kadinzincir v3) | `0x2Ee529a07e98dEEe473bE9bb0f2a63e757a01e65` |

## Yerelde çalıştırma

```bash
cd cuzdan-araci      # ya da: cd etkinlik-sitesi
npm install
npm run dev          # cüzdan aracı 5173, etkinlik sitesi 5174 portunda açılır
npm test
```

Kullandığım araçlar: VS Code, Git ve GitHub, Node.js 24, Vite 8, ethers.js v6, MetaMask, Remix IDE, Sepolia Etherscan ve Vercel.

## Güvenlik

- Bu depoda kurtarma kelimesi, seed veya private key yoktur.
- Eğitim hesapları yalnızca Sepolia test ağı içindir.
- Takımın iş paketi belgesi `.gitignore` ile depo dışında tutulur.
