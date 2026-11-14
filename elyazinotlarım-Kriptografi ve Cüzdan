# İP 03: Kriptografi ve Cüzdan

**Amaç:** Cüzdan oluşturma görevine kavramsal hazırlık yapmak.

## 1. Hash, şifreleme ve dijital imza hangi farklı amaçlarla kullanılır?

**Hash:** Herhangi bir veriden sabit uzunlukta bir parmak izi üretir. Aynı veri her zaman aynı hashi verir, hashten veriye geri dönülemez ve verinin tek bir harfi değişse bile hash tamamen değişir. Anahtar kullanmaz. Amacı verinin değişip değişmediğini kontrol etmektir. Bitcoin SHA-256, Ethereum Keccak-256 kullanır.
**Şifreleme:** Veriyi anahtarı olmayan kişilerin okuyamayacağı hale getirir ve anahtar ile tekrar geri çevrilebilir. Amacı verinin gizli kalmasıdır. Ethereum'da işlemler şifrelenmez, herkes okuyabilir. Şifreleme cüzdan uygulamasının içinde kurtarma kelimelerini saklamak için kullanılır.
**Dijital imza:** Private key ile imza üretilir ve herkes bu imzayı public key ile doğrulayabilir. Amacı mesajı gerçekten private key sahibinin gönderdiğini ve mesajın yolda değişmediğini kanıtlamaktır (kimlik doğrulama ve bütünlük). Ethereum ve Bitcoin'de her işlem gönderen tarafından imzalanır ve bunun için secp256k1 eğrisi üzerinde ECDSA kullanılır. İmzalama şifreleme değildir, ayrı bir matematiksel işlemdir.


## 2. Private key, public key, adres, mnemonic ve seed arasındaki ilişki nedir?

**Private key:** 256 bitlik gizli bir sayıdır. Hesabın harcama yetkisi tamamen bu sayıdır, bilen herkes hesabı kontrol eder.

**Public key:** Private key'den secp256k1 eğri çarpımı ile hesaplanır. Public key'den private key'e geri dönmek pratikte imkansızdır.

**Adres:** Public key'in Keccak-256 hashinin son 20 baytıdır. Herkesle paylaşılabilir ve para veya token almak için kullanılır. Adresteki büyük ve küçük harfler (EIP-55) yazım hatalarını yakalamak için kullanılan bir checksumdır, harfleri farklı yazılan iki adres aynı 20 baytlık adres olabilir.

**Mnemonic:** Rastgele üretilen entropinin insanın yazıp saklayabileceği 12 kelimelik halidir.

**Seed:** Mnemonic'ten (ve varsa passphrase'ten) türetilen 512 bitlik sayıdır. Günlük dilde mnemonic'e de seed denir ama teknik olarak ikisi farklı aşamalardır.

**İlişkileri:** Mnemonic'ten seed üretilir, seed'den anahtar ağacı ile private key türetilir, private key'den public key, public key'den de adres elde edilir. Bu yolun her adımı tek yönlüdür, yani adresten geriye doğru gidilemez.

```
Entropi → Mnemonic → Seed → Private key → Public key → Adres
```

## 3. Entropi ve checksum ne işe yarar? BIP39, BIP32 ve BIP44 hangi aşamalarla ilgilidir?

**Entropi:** Başlangıçtaki rastgelelik miktarıdır. 12 kelimelik bir mnemonic 128 bit entropiden üretilir. Sonraki bütün adımlar aynı girdiden her zaman aynı sonucu verdiği için hesabın güvenliği tamamen bu ilk rastgele sayıya bağlıdır. Bu yüzden entropi kriptografik olarak güvenli bir rastgelelik kaynağından üretilmelidir, tahmin edilebilir rastgelelik kullanılırsa hesap güvensiz olur.

**Checksum:** Kelimelerin yanlış yazılmasını yakalamak için eklenen küçük bir kontroldür. Entropinin SHA-256 hashinin ilk 4 biti entropinin sonuna eklenir. Listede olmayan bir kelimeyi kelime listesi kontrolü yakalar, listede olan ama yanlış yazılan bir kelimeyi ise checksum yakalar. Checksum sadece 4 bit olduğu için yanlış bir kelimeyi her zaman yakalayamaz, yaklaşık 16'da 1 ihtimalle yanlış kelimeler de geçerli görünür ve bu durumda başka bir hesaba karşılık gelir.

**BIP39:** Entropiden mnemonic'e ve mnemonic'ten seed'e geçiş aşamasıyla ilgilidir. 128 bit entropiye 4 bit checksum eklenir, 132 bit 11'er bitlik 12 parçaya bölünür ve her parça 2048 kelimelik listeden bir kelime seçer. Sonra mnemonic, PBKDF2-HMAC-SHA512 ile 2048 turda ve "mnemonic" + passphrase salt'ı ile 512 bitlik seed'e çevrilir.

**BIP32:** Seed'den anahtar ağacına geçiş aşamasıyla ilgilidir. Seed'den bir master private key ve chain code üretilir ve bu tek kökten sınırsız sayıda alt anahtar türetilebilir. Aynı seed her zaman aynı anahtarları verir.

**BIP44:** Bu ağaçta hangi yolun kullanılacağını belirleyen standarttır. Ethereum'da ilk hesap için yol `m/44'/60'/0'/0/0`'dır. Burada 44 standardı, 60 Ethereum'u, ilk 0 hesap numarasını, ikinci 0 dış adres zincirini ve son 0 ilk adresi gösterir. `'` işareti hardened türetmeyi gösterir ve üst seviyelerde kullanılır, böylece bir alt private key ile üst extended public key birlikte sızsa bile üst anahtar hesaplanamaz. Farklı cüzdanlar aynı yolu kullandığı için aynı kelimelerden aynı adresler çıkar.

| Standart | Aşama |
|---|---|
| BIP39 | Entropi → mnemonic → seed |
| BIP32 | Seed → anahtar ağacı |
| BIP44 | Ağaçta kullanılacak yol |

## 4. Cüzdan uygulaması ile hesap aynı şey midir? Adresi paylaşmakla anahtarı paylaşmak neden farklıdır? Adres paylaşımının mahremiyet etkisi var mıdır?

Cüzdan uygulaması ile hesap aynı şey değildir. Hesap zincirin state'inde tutulur ve adres, bakiye ve nonce bilgilerinden oluşur. Cüzdan uygulaması ise private key'i saklayan ve işlemleri imzalayan bir yazılımdır. Yani para uygulamanın içinde değil zincirde durur, uygulamanın içinde sadece anahtar durur.

Adresi paylaşmak sadece başkalarının bu adrese para göndermesini sağlar ve harcama yetkisi vermez çünkü işlem imzalamak için private key gerekir. Anahtarı veya mnemonic'i paylaşmak ise hesabın tamamen kontrolünü vermek demektir ve geri alınamaz.

Adres paylaşımının mahremiyet etkisi vardır. Blokzincir anonim değil takma adlıdır. Adresi bilen herkes bu adresin bakiyesini ve bütün işlem geçmişini görebilir. Adres bir kere gerçek kimlikle eşleşirse o adresin bütün geçmişi o kişiye bağlanmış olur.

## Benim yorumum

Cüzdan uygulamasının silinmesi ile kurtarma bilgisinin kaybolması aynı sonucu doğurmaz. Uygulama silinse bile hesap zincirde durmaya devam eder ve kurtarma kelimeleri elimdeyse aynı hesabı başka bir uyumlu cüzdanda geri yükleyebilirim. Ama kurtarma kelimeleri ve private key kaybolursa hesap yine zincirde durur fakat hiç kimse ona bir daha erişemez kısacası varlıklarına ulaşamazsın hayat biter.
## Kaynaklar
- Usta, A. & Doğantekin, S. *Blockchain 101 v2* – Bölüm 2.1 "Kriptolojinin Teknik Detayları"
- Sert, T. *Sorularla Blockchain* – "Blockchain şifrelemesi ne demek?"
- Antonopoulos, A. M. & Wood, G. *Mastering Ethereum* – Bölüm 4 (Cryptography), Bölüm 5 (Wallets)
- [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki), [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki), [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)
- [EIP-55](https://eips.ethereum.org/EIPS/eip-55)
- [ethereum.org – Ethereum accounts](https://ethereum.org/en/developers/docs/accounts/)

