# cuzdan-araci — Eğitim Cüzdanı Oluşturucu (İP 12)

Yalnızca eğitim amaçlıdır. Bu cüzdana gerçek varlık göndermeyin. Kelimeleri kimseyle paylaşmayın.

Rastgelelikten Ethereum adresine giden 8 aşamayı ayrı dosyalarda uygular ve her ara sonucu
yerel ekranda ayrı kartta gösterir. Hiçbir veri sunucuya, analitiğe, log'a veya tarayıcı
depolamasına gitmez; index.html'deki Content-Security-Policy ağ bağlantısını tamamen kapatır.

**Canlı adres:** https://etkinlikcuzdani-araci.vercel.app/ (Vercel).
Yayındaki sürüm de her şeyi yalnızca açan kişinin tarayıcısında hesaplar; sunucuya hiçbir değer gitmez.

## Çalıştırma

```bash
cd cuzdan-araci
npm install        # ethers 6.x ve vite 8.x
npm run dev        # http://localhost:5173  (CSP, Vite'ın canlı yenileme WebSocket'ini de engeller; sayfayı elle yenileyin)
npm test           # node --test: resmî BIP39 vektörü + sabit entropi testleri
npm run build      # dist/ üretir
```

## Kod haritası

| Aşama | Dosya | Dönüşüm | ethers çağrısı | Standart |
|---|---|---|---|---|
| 1 | src/asamalar/1-entropi.js | → 128 bit entropi | `randomBytes(16)`, `hexlify` | BIP39 |
| 2 | src/asamalar/2-mnemonic.js | entropi → 12 kelime | `Mnemonic.fromEntropy(e).phrase` | BIP39 |
| 3 | src/asamalar/3-seed.js | 12 kelime → 512 bit seed (passphrase "") | `Mnemonic.fromPhrase(k, "").computeSeed()` | BIP39 |
| 4 | src/asamalar/4-master-key.js | seed → kök düğüm (xprv) | `HDNodeWallet.fromSeed(s)`, `.extendedKey` | BIP32 |
| 5 | src/asamalar/5-turetme-yolu.js | kök → m/44'/60'/0'/0/0 | `kok.derivePath(yol)` | BIP44 |
| 6 | src/asamalar/6-private-key.js | düğüm → private key | `dugum.privateKey` | BIP32 |
| 7 | src/asamalar/7-public-key.js | private → public (65 bayt) | `SigningKey.computePublicKey(pk, false)` | secp256k1 |
| 8 | src/asamalar/8-adres.js | public → adres (elle) + kontrol | `dataSlice`, `keccak256`, `getAddress`; `computeAddress` | Keccak-256, EIP-55 |

Diğer dosyalar:

- `src/cuzdan-zinciri.js` — 8 aşamayı sırayla çağıran tek fonksiyon; ayrıca kâğıttaki 12 kelimeden aynı zinciri yeniden türeten `kelimelerdenZinciriCalistir` (`Mnemonic.phraseToEntropy`).
- `src/dogrulama.js` — mnemonic doğrulama kutusu; üç sonuç: geçerli / kelime listede yok / checksum tutmadı (İP 13 deneyi).
- `src/test-vektoru.js` — resmî BIP39 test vektörü (trezor/python-mnemonic vectors.json, english[0], passphrase "TREZOR"). Kullanıcı deneyi boş passphrase kullanır; iki ayar ayrı tutulur.
- `src/arayuz.js` — düğmeler, ekrana yazma, Göster/Gizle, temizleme. Hesap yapmaz.
- `index.html` — iskelet ve CSP; çiçek ve yıldız düğmeleri satır içi SVG (dış resim yok, CSP `img-src none`).
- `stil.css` — kullanıcının tarifine göre tasarım: mint arka plan, blob kartlar, pembe oklar, çiçek balonu, yıldız düğmeler.
- `src/aciklamalar.js` — çiçeğe basınca sırayla gösterilen 10 "ne / neden" açıklaması.
- `test/cuzdan.test.js` — Node yerleşik test aracı.

## Güvenlik kararları

- Rastgelelik yalnızca `randomBytes` (tarayıcıda `crypto.getRandomValues`); `Math.random` yok.
- Gizli alanlar (entropi, mnemonic, seed, xprv, private key) varsayılan gizli; her birinin ayrı Göster/Gizle düğmesi var.
- Yeni cüzdan üretilince önceki değerler değişkenden ve ekrandan silinir.
- `console.log`, `localStorage`, `sessionStorage`, cookie, fetch yok. CSP: `default-src 'none'; connect-src 'none'`.
