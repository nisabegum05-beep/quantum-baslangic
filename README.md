# quantum-baslangic

Quantum Blokzincir Takımı yeni üye iş paketi çalışmam.

İş paketini İP 01'den İP 25'e kadar baştan sona çalıştım ve konuları anladım. Amacım unuttuğum yerleri hatırlamak ve başlıkları kendi cümlelerimle tekrar etmekti. Bu yüzden zaten bildiğim konuları da yeniden yazdım.

**Teslim raporu:** [RAPOR.md](./RAPOR.md). Her İP'nin durumu, işlem hash'leri ve kanıtları orada. (sonra test edilecek adımlar)

**Kim ne yaptı?** İP 01–10 notlarını kendim yazdım. Cüzdan, transfer, Remix ve deploy işlemlerini kendim yaptım. Kodları ve İP 11–17 not taslaklarını yapay zekâ asistanı Claude ile yazdım. Kuralları, tasarımı ve akışı ben belirledim. Ayrıntısı raporun başında.

## Yaptığım siteler

| Site | Canlı adres | Kod | İP |
|---|---|---|---|
| Eğitim Cüzdanı Oluşturucu | https://etkinlikcuzdani-araci.vercel.app/ | [`cuzdan-araci/`](./cuzdan-araci/) | 12–13 |
| Geliştirici Kadınlar Etkinliği | https://etkinlik-sitesi-ivory.vercel.app/ | [`etkinlik-sitesi/`](./etkinlik-sitesi/) | 24–25 |

- **Cüzdan oluşturucu** 128 bit entropiden Ethereum adresine giden 8 adımı tek tek gösterir. Yalnızca eğitim içindir, ürettiği hesaba gerçek varlık gönderilmemelidir.
- **Etkinlik sitesi** MetaMask ile Sepolia'daki kendi sözleşmem Kadınzincir'e bağlanır. Kayıt ve görevli giriş onayı için tasarlandı. Canlı sitede henüz işlem gönderilmedi.
- İki sitenin güvenlik politikası (CSP) hiçbir sunucuya veri gönderilmesine izin vermez.

## Başlıklarım ve kanıtlarım

| İP | Başlık | Not / kod | Kanıt |
|---|---|---|---|
| 01 | Blokzincir temelleri | [`notlar/ip01-blokzincir-temelleri.md`](./notlar/ip01-blokzincir-temelleri.md) | araştırma notu |
| 02 | Node ve konsensüs | [`notlar/ip02-node-ve-konsensus.md`](./notlar/ip02-node-ve-konsensus.md) | araştırma notu |
| 03 | Kriptografi ve cüzdan | [`notlar/ip03-kriptografi-ve-cuzdan.md`](./notlar/ip03-kriptografi-ve-cuzdan.md) | araştırma notu |
| 04 | Bitcoin, Ethereum ve token | [`notlar/ip04-bitcoin-ethereum-ve-token.md`](./notlar/ip04-bitcoin-ethereum-ve-token.md) | araştırma notu |
| 05 | Akıllı sözleşme ve ABI | [`notlar/ip05-akilli-sozlesme-ve-abi.md`](./notlar/ip05-akilli-sozlesme-ve-abi.md) | araştırma notu |
| 06 | RPC, explorer ve event | [`notlar/ip06-rpc-explorer-ve-event.md`](./notlar/ip06-rpc-explorer-ve-event.md) | araştırma notu |
| 07 | Bir işlemin yolculuğu | [`notlar/ip07-bir-islemin-yolculugu.md`](./notlar/ip07-bir-islemin-yolculugu.md) | araştırma notu |
| 08 | Ekosistemi tanı | [`notlar/ip08-ekosistemi-tani.md`](./notlar/ip08-ekosistemi-tani.md) | araştırma notu |
| 09 | Proje anlatımı: HALOCLINE | [`notlar/ip09-proje-anlatim-halocline.md`](./notlar/ip09-proje-anlatim-halocline.md) | araştırma notu |
| 10 | Şartname özeti | [`notlar/ip10-sartname-ozet.md`](./notlar/ip10-sartname-ozet.md) | araştırma notu |
| 11 | Çalışma ortamını hazırla | [`notlar/ip11-calisma-ortami.md`](./notlar/ip11-calisma-ortami.md) | bu depo |
| 12 | Kendi cüzdan oluşturucunu yaz | [`notlar/ip12-cuzdan-olusturucu.md`](./notlar/ip12-cuzdan-olusturucu.md) | canlı site, `npm test` 8/8, resmî BIP39 vektörü |
| 13 | MetaMask ile karşılaştır ve checksum deneyi yap | [`notlar/ip13-metamask-ve-checksum.md`](./notlar/ip13-metamask-ve-checksum.md) | [adres eşleşmesi](./kanitlar/ip13-1-adres-eslesme.png), [doğrulama kutusu](./kanitlar/ip13-2a-dogrulama-kutusu-kapatilmis.png) |
| 14 | Test ETH kaynağını kendin bul | [`notlar/ip14-test-eth.md`](./notlar/ip14-test-eth.md) | [imza talebi](./kanitlar/ip14-0-faucet-imza-talebi.png), [faucet işlemi](./kanitlar/ip14-1-faucet-tx-etherscan.png), [adres sayfası](./kanitlar/ip14-2-adres-sayfasi-ve-metamask.png), [faucet cüzdanı](./kanitlar/ip14-3-faucet-adres-sayfasi.png) |
| 15 | Test USDC edin ve iki transferi karşılaştır | [`notlar/ip15-test-usdc-ve-iki-transfer.md`](./notlar/ip15-test-usdc-ve-iki-transfer.md) | [ETH işlemi](./kanitlar/ip15-1-eth-transfer-tx.png), [USDC işlemi](./kanitlar/ip15-2-usdc-transfer-tx.png), [işlem listesi](./kanitlar/ip15-4-hesap-islem-listesi.png), [ETH onayı](./kanitlar/ip15-5-eth-onay-penceresi.png), [USDC onayı](./kanitlar/ip15-6-usdc-onay-penceresi.png) |
| 16 | Remix ile gerçek ismini kaydet | [`notlar/ip16-remix-ile-isim-kaydi.md`](./notlar/ip16-remix-ile-isim-kaydi.md) | [kayıt işlemi](https://sepolia.etherscan.io/tx/0x67587deae063fe93b5678de80f6c66ce83a965fb3149ab8e794011afdfb06222) (Etherscan) |
| 17 | Explorer ile kaydı doğrula | [`notlar/ip17-explorer-ile-kayit-dogrulama.md`](./notlar/ip17-explorer-ile-kayit-dogrulama.md) | [başarısız ikinci kayıt](https://sepolia.etherscan.io/tx/0x9eb7161beb8d120af9434856ecd46984001572b81a244e2ef25ca315503670e5) (Etherscan). Değerleri asistan okudu, ekran görüntüsü yok |
| 18–19 | Takım sözleşmesinin kopyası | [`takim-sozlesmesi-kopyasi/`](./takim-sozlesmesi-kopyasi/) | kısmen: kaynak kod ve derleyici ayarları hazır, deploy yapılmadı |
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
