# İP 12: Kendi Cüzdan Oluşturucunu Yaz

**Amaç:** Rastgelelikten Ethereum adresine giden aşamaları uygulamak.

## 1. Küçük bir web uygulaması ve güvenli 128 bit entropi

`cuzdan-araci/` klasöründe Vite ve sade JavaScript ile çalışan bir web uygulaması geliştirdim. Kriptografik işlemler için ethers.js v6 kullandım. "Yeni eğitim cüzdanı oluştur" düğmesi `randomBytes(16)` ile 16 bayt, yani 128 bit entropi üretir. Bu fonksiyon tarayıcıda işletim sisteminin güvenli rastgelelik kaynağını (`crypto.getRandomValues`) kullanır.

Math.random kullanmadım çünkü genel amaçlı rastgelelik tahmin edilebilir. Sonraki bütün aşamalar aynı girdiden aynı sonucu verdiği için entropiyi tahmin eden biri kelimeleri, anahtarları ve adresi de bulabilir.


## 2. Entropi → 12 kelime → seed → m/44'/60'/0'/0/0 → private key → public key → adres

```
Entropi (128 bit) → Mnemonic (12 kelime) → Seed (512 bit) → Master key (xprv)
→ m/44'/60'/0'/0/0 → Private key → Public key (65 bayt) → Adres (20 bayt)
```

Her dönüşüm kendi dosyasında ve tek bir fonksiyon:

| Aşama | Dosya | Kütüphane çağrısı | Standart |
|---|---|---|---|
| 1 Entropi | `1-entropi.js` | `randomBytes(16)`, `hexlify` | BIP39 |
| 2 12 kelime | `2-mnemonic.js` | `Mnemonic.fromEntropy(entropi).phrase` | BIP39 |
| 3 Seed | `3-seed.js` | `Mnemonic.fromPhrase(kelimeler, "").computeSeed()` | BIP39 |
| 4 Master key | `4-master-key.js` | `HDNodeWallet.fromSeed(seed).extendedKey` | BIP32 |
| 5 Türetme yolu | `5-turetme-yolu.js` | `kokDugum.derivePath("m/44'/60'/0'/0/0")` | BIP44 |
| 6 Private key | `6-private-key.js` | `hesapDugumu.privateKey` | BIP32 |
| 7 Public key | `7-public-key.js` | `SigningKey.computePublicKey(privateKey, false)` | secp256k1 |
| 8 Adres | `8-adres.js` | `dataSlice`, `keccak256`, `getAddress`; kontrol `computeAddress` | Keccak-256, EIP-55 |

BIP39 passphrase'i iş paketinin istediği gibi boş bıraktım (`""`). MetaMask da boş passphrase kullandığı için İP 13'te adresler eşleşti.

## 3. Ara aşamaların gösterimi ve gizli verilerin korunması

Her aşamanın sonucu ekranda ayrı bir kartta görünüyor. Hassas alanlar (entropi, 12 kelime, seed, xprv, private key) varsayılan olarak gizli ve her birinin kendi Göster/Gizle düğmesi var. Türetme yolu, public key ve adres açık gösteriliyor çünkü bunlardan geri gidilemez. Yeni cüzdan üretilince önceki değerler önce değişkenden, sonra ekrandan siliniyor.

Gizli veriler hiçbir yere gitmiyor. Kodda `console.log`, `localStorage`, `sessionStorage`, cookie veya ağ isteği yok. Bunu garanti altına almak için `index.html`'e bir Content-Security-Policy ekledim. `connect-src 'none'` kuralı sayfanın herhangi bir sunucuya bağlanmasını tarayıcı düzeyinde engelliyor; kodda yanlışlıkla bir istek olsa bile çalışamaz.

Sayfa yenilenince değerler bilerek silindiği için, kâğıttaki kelimelerden aynı cüzdanı yeniden ekrana getiren bir "kelimelerden geri türet" bölümü ekledim. Bu bölüm kelimelerden entropiye geri gidip (`Mnemonic.phraseToEntropy`) zinciri aynı entropiyle baştan çalıştırıyor.

## 4. Kütüphane kullanımı ve her dönüşümün görevi

Yalnızca `Wallet.createRandom()` sonucunu göstermek yerine her aşamayı ayrı çağırdım:

- **Aşama 2:** Entropinin SHA-256 hash'inin ilk 4 biti checksum olarak sona eklenir. 132 bit, 11'er bitlik 12 parçaya bölünür ve her parça 2048 kelimelik listeden bir kelime seçer.
- **Aşama 3:** Kelimeler, "mnemonic" + passphrase tuzuyla PBKDF2-HMAC-SHA512 üzerinden 2048 tur karıştırılıp 512 bitlik seed'e çevrilir.
- **Aşama 4:** Seed'den BIP32 anahtar ağacının kökü üretilir. xprv bütün hesapların anahtarı olduğu için gizli tutulur.
- **Aşama 5:** Kökten m/44'/60'/0'/0/0 yoluyla ilk Ethereum hesabına inilir. 60 Ethereum'u, son 0 ilk hesabı gösterir.
- **Aşama 6:** Yolun sonundaki düğümün 32 baytlık private key'i alınır.
- **Aşama 7:** Private key'den secp256k1 eğri çarpımıyla 65 baytlık sıkıştırılmamış public key hesaplanır. Ethereum adresi bu biçimden türediği için sıkıştırılmamış hâli seçtim.
- **Aşama 8:** Adresi elle türettim: 0x04 önekini attım, Keccak-256 aldım, son 20 baytı kestim ve `getAddress` ile EIP-55 büyük/küçük harflerini uyguladım. Sonra ethers'ın hazır `computeAddress` fonksiyonuyla aynı sonucu verdiğini kontrol ettim; ekranda "Kontrol ✔" olarak görünüyor.

## İsteğe bağlı: Resmî BIP39 test vektörü

Resmî BIP39 test vektörlerinin ilkini (trezor/python-mnemonic, english[0]) kullandım. Bu vektör "TREZOR" passphrase'iyle üretildiği için kendi deneyimdeki boş passphrase'ten ayrı bir dosyada (`test-vektoru.js`) tuttum. Aynı girdi ve ayarla mnemonic, seed ve xprv resmî değerlerle eşleşti. `npm test` ile 8 test çalıştırıyorum; hepsi geçiyor. Testlerde yalnızca resmî vektör ve sabit test değerleri kullanılıyor.


## Benim yorumum


Kendi uygulamamda mnemonic Aşama 2'de, private key ise Aşama 6'da çıkıyor ve aralarında dört aşama var. Mnemonic ağacın tohumu gibi: ondan seed, seed'den kök, kökten istediğim kadar hesap çıkıyor. Private key ise o ağacın tek bir yaprağının anahtarı. Aşama 5'teki yolun son 0'ını 1 yapınca kelimeler aynı kalıyor ama bambaşka bir private key ve adres çıkıyor. İP 15'te açtığım ikinci hesap tam olarak bu. Bu yüzden private key'imi kaptıran yalnızca o hesabı kaybeder, 12 kelimesini kaptıran bütün hesaplarını kaybeder. Bir de yön farkı var: kelimelerden private key'e gidebiliyorum ama private key'den kelimelere geri dönemiyorum.

## Kaynaklar
- [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki), [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki), [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)
- [EIP-55](https://eips.ethereum.org/EIPS/eip-55)
- [ethers.js v6 Dokümantasyonu](https://docs.ethers.org/v6/)
- [trezor/python-mnemonic – vectors.json](https://github.com/trezor/python-mnemonic/blob/master/vectors.json)
- [MDN – Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)
- Antonopoulos, A. M. & Wood, G. *Mastering Ethereum* – Bölüm 4, Bölüm 5
