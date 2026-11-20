# quantum-baslangic

Quantum Blokzincir Takımı yeni üye iş paketi çalışmam. Bu depoda blokzincirin temellerini araştırdım, kendi test cüzdanımı üreten bir uygulama yazdım, Sepolia test ağında işlem yapıp doğruladım, kendi akıllı sözleşmemi geliştirip yayınladım ve ona bağlanan bir web sitesi kurdum. Bildiğim yerleri tekrar ettim.

**Teslim raporu:** [RAPOR.md](./RAPOR.md). Hangi iş paketinin nerede, hangi kanıtla yapıldığı orada.

## Amaç ve öğrenmek istediğim konular

Amacım blokzinciri yalnızca kavram olarak değil, elimle yaparak öğrenmek ve hatırlamaktı:
- Defter, blok, node ve konsensüs nasıl çalışıyor?
- 12 kelimeden adrese giden yol nedir; private key, public key ve adres arasındaki fark ne?
- Bir işlem imzadan makbuza nasıl bir yolculuk yapıyor; başarı neyle kanıtlanıyor?
- Native varlık (ETH) ile token (USDC) arasındaki fark nedir?
- Akıllı sözleşme nasıl yazılır, derlenir, yayınlanır; ABI, event ve state nedir?
- Bir web sitesi cüzdanla sözleşmeye nasıl güvenli biçimde bağlanır?

## Klasörler

| Klasör / dosya | İçerik | İP |
|---|---|---|
| Kökteki not dosyaları | Araştırma ve görev notları; her sorunun cevabı, "Benim yorumum" ve kaynaklar | 01–17 |
| [`cuzdan-araci/`](./cuzdan-araci/) | 128 bit entropiden Ethereum adresine 8 adımda giden eğitim cüzdanı oluşturucusu | 12–13 |
| [`takim-sozlesmesi-kopyasi/`](./takim-sozlesmesi-kopyasi/) | Takımın QuantumKayit sözleşmesinin kaynak kopyası ve derleyici ayarları | 18 |
| [`etkinlik-sozlesmesi/`](./etkinlik-sozlesmesi/) | Kendi etkinlik sözleşmem Kadınzincir (v1 → v3), ABI, Sepolia bilgileri | 20–23 |
| [`etkinlik-sitesi/`](./etkinlik-sitesi/) | "Geliştirici Kadınlar Etkinliği" web sitesi: MetaMask ile kayıt ve görevli onayı | 24–25 |
| [`kanitlar/`](./kanitlar/) | Ekran görüntüleri (gizli veri içermez) | 13–23 |
| [`RAPOR.md`](./RAPOR.md) | Teslim raporu | hepsi |

## Kullandığım araçlar

| Araç | Ne için |
|---|---|
| Visual Studio Code, Git, GitHub | Kod ve not yazma, sürüm takibi, yayınlama |
| Node.js v24 ve npm 11 | Uygulamaları çalıştırma ve test etme |
| Vite 8 | Geliştirme sunucusu ve derleme |
| ethers.js v6 | BIP39/BIP32 türetme, adres hesabı, sözleşme çağrıları |
| MetaMask | Eğitim hesabı, işlem imzalama (ayrı tarayıcı profili) |
| Remix IDE | Solidity derleme, Remix VM'de deneme, Sepolia'ya deploy, At Address |
| Sepolia Etherscan | İşlem, makbuz, event ve sözleşme doğrulama |
| Vercel | Etkinlik sitesinin yayını |

Yeni npm paketi olarak yalnızca `ethers` ve `vite` kullanıldı.

## Uygulamaları çalıştırma

**Cüzdan oluşturucu (İP 12):** yalnızca yerelde çalışır, hiçbir yere veri göndermez.
```bash
cd cuzdan-araci
npm install
npm run dev      # http://localhost:5173
npm test         # resmî BIP39 test vektörü ve sabit değer testleri
```

**Etkinlik sitesi (İP 24):** MetaMask'in kurulu olduğu tarayıcıda açılır; Sepolia'daki Kadınzincir sözleşmesine bağlanır.
```bash
cd etkinlik-sitesi
npm install
npm run dev      # http://localhost:5174
npm test         # adres, ağ ve ABI uyum testleri
npm run build    # yayın için dist/ klasörünü üretir
```

İki uygulamanın da güvenlik politikası (CSP) sayfanın hiçbir sunucuya veri isteği atmasına izin vermez. Etkinlik sitesi zincirle yalnızca MetaMask üzerinden konuşur.

## Önemli adresler (Sepolia)

| Ne | Adres |
|---|---|
| Eğitim hesabım | `0x05d782Efca095aF3569D76Ef5542c352B3800Af6` |
| Takım sözleşmesi (QuantumKayit) | `0x81Dd700C459BF2806A1B5F2a349c89f0106A9036` |
| Kendi etkinlik sözleşmem (Kadinzincir v3) | `0x2Ee529a07e98dEEe473bE9bb0f2a63e757a01e65` |

## Güvenlik

- Bu depoda kurtarma kelimesi, seed veya private key yoktur.
- Eğitim hesapları yalnızca Sepolia test ağı içindir; gerçek varlık gönderilmemelidir.
- Takımın iş paketi belgesi `.gitignore` ile depo dışında tutulur.
