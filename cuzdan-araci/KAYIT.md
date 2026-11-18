# KAYIT — yalnızca olgular

## Tamamlanan adımlar
| Adım | Phase | Durum |
|---|---|---|
| 12.1 package.json | 12-A | tamam |
| 12.2 index.html + CSP | 12-A | tamam |
| 12.3 stil.css (boş) | 12-A | tamam |
| 12.4 Aşama 1 entropi | 12-A | tamam |
| 12.5 arayuz.js (Aşama 1 bağlı) | 12-A | tamam |
| 12.6 Aşama 2 mnemonic | 12-B | tamam |
| 12.7 Aşama 3 seed | 12-B | tamam |
| arayuz.js Aşama 1–3 bağlı | 12-B | tamam |
| 12.8 Aşama 4 master key | 12-C | tamam |
| 12.9 Aşama 5 türetme yolu | 12-C | tamam |
| 12.10 Aşama 6 private key | 12-C | tamam |
| 12.11 Aşama 7 public key | 12-D | tamam |
| 12.12 Aşama 8 adres (elle + kontrol) | 12-D | tamam |
| 12.13 cuzdan-zinciri.js | 12-D | tamam |
| 12.14 arayuz.js tam (gizle/göster, temizleme, kontrol satırı) | 12-E | tamam |
| 12.15 dogrulama.js | 12-F | tamam |
| 12.16 test-vektoru.js | 12-G | tamam |
| 12.17 test/cuzdan.test.js + README.md | 12-G | tamam |
| 12.18 dogrulama.js trim düzeltmesi (kullanıcı bulgusu) | 12-G | tamam |
| 12.19 kelimelerden yeniden türetme (sayfa yenilenince kanıt için) | 13 sırasında | tamam |
| 12.20 tasarım (kullanıcı tarifi): stil.css, aciklamalar.js, çiçek/yıldız SVG | 13 sırasında | tamam |

## Oluşturulan dosyalar
- .gitignore (depo kökü): kaynaklar/, PDF dosya adı, node_modules/, dist/, .env
- cuzdan-araci/package.json
- cuzdan-araci/index.html
- cuzdan-araci/stil.css
- cuzdan-araci/src/asamalar/1-entropi.js
- cuzdan-araci/src/asamalar/2-mnemonic.js
- cuzdan-araci/src/asamalar/3-seed.js
- cuzdan-araci/src/asamalar/4-master-key.js
- cuzdan-araci/src/asamalar/5-turetme-yolu.js
- cuzdan-araci/src/asamalar/6-private-key.js
- cuzdan-araci/src/asamalar/7-public-key.js
- cuzdan-araci/src/asamalar/8-adres.js
- cuzdan-araci/src/cuzdan-zinciri.js
- cuzdan-araci/src/dogrulama.js
- cuzdan-araci/src/test-vektoru.js
- cuzdan-araci/src/aciklamalar.js
- cuzdan-araci/test/cuzdan.test.js
- cuzdan-araci/README.md
- cuzdan-araci/src/arayuz.js
- cuzdan-araci/OGRENDIKLERIM.md
- cuzdan-araci/KAYIT.md

## Bağımlılıklar
| Paket | Sürüm | Tür |
|---|---|---|
| ethers | 6.17.0 | dependency |
| vite | 8.3.8 | devDependency |
Node v24.18.1, npm 11.16.0.

## Aşama → dosya → ethers fonksiyonu
| Aşama | Dosya | ethers çağrısı | Durum |
|---|---|---|---|
| 1 entropi | src/asamalar/1-entropi.js | randomBytes(16), hexlify | yazıldı |
| 2 mnemonic | src/asamalar/2-mnemonic.js | Mnemonic.fromEntropy(entropiHex).phrase | yazıldı |
| 3 seed | src/asamalar/3-seed.js | Mnemonic.fromPhrase(kelimeler, "").computeSeed() | yazıldı |
| 4 master key | src/asamalar/4-master-key.js | HDNodeWallet.fromSeed(seedHex), .extendedKey | yazıldı |
| 5 yol | src/asamalar/5-turetme-yolu.js | kokDugum.derivePath("m/44'/60'/0'/0/0"), .path | yazıldı |
| 6 private key | src/asamalar/6-private-key.js | hesapDugumu.privateKey | yazıldı |
| 7 public key | src/asamalar/7-public-key.js | SigningKey.computePublicKey(privateKeyHex, false) | yazıldı |
| 8 adres | src/asamalar/8-adres.js | dataSlice, keccak256, getAddress; kontrol computeAddress | yazıldı |

## Kabul testleri (İP 12)
| Test | Sonuç | Not |
|---|---|---|
| npm install + npm run build | GEÇTİ | 12-G sonrası yeniden derlendi, hata yok |
| npm test | GEÇTİ | 8/8 (node --test test/cuzdan.test.js) |
| Resmî vektör (TREZOR): mnemonic, seed, xprv | GEÇTİ | test + uygulama içi düğme |
| Sabit entropi her seferinde aynı mnemonic ve adres | GEÇTİ | test |
| Biçimler: seed 128 hex, private 64 hex, public 0x04+128 hex, adres 40 hex, yol m/44'/60'/0'/0/0 | GEÇTİ | test |
| Elle adres = computeAddress; ayrıca = HDNodeWallet.fromPhrase(…, "", yol).address | GEÇTİ | test + node |
| Doğrulama kutusu üç sonuç + baş/son boşluklu yapıştırma | GEÇTİ | test (kullanıcı tarayıcıda hata buldu, düzeltildi) |
| Tarayıcıda arayuz.js hatasız yüklendi | GEÇTİ | başsız Brave konsolu; yalnızca Vite WS CSP engeli |
| Sıfır entropi → 12 kelime, son kelime "about" (vektörle uyumlu) | GEÇTİ | node ile |
| seed biçimi 0x + 128 hex | GEÇTİ | node ile |
| boş passphrase seed ≠ TREZOR passphrase seed | GEÇTİ | node ile |
| npm run dev açılıyor | GEÇTİ | Vite 8.3.8, localhost:5173; başsız Brave'de sayfa yüklendi |
| CSP: kendi dosyalar yükleniyor, dış bağlantı yok | GEÇTİ | yalnızca Vite HMR WebSocket'i engellendi (bilinçli) |
| Her basışta farklı entropi | GEÇTİ (node) / tarayıcıda kullanıcı doğrulayacak | test |
| Hassas alanlar açılışta gizli, düğmeyle açılıp kapanıyor | TEST EDİLMEDİ | kullanıcı tarayıcıda deneyecek |
| Ağ sekmesinde sayfa sonrası istek yok | TEST EDİLMEDİ | kullanıcı tarayıcıda deneyecek; CSP connect-src none |
| Kodda Math.random / console.log / localStorage yok | GEÇTİ | grep yalnızca yorum satırlarını buldu |
| HTML'de satır içi style yok; stil.css kullanıcı tarifiyle dolduruldu (tasarım kararı kullanıcının) | GEÇTİ | grep |

## Test vektörü sonucu
- Kaynak: trezor/python-mnemonic vectors.json, english[0], passphrase "TREZOR"
- Uygulama içi kontrol: "Vektörü kontrol et" düğmesi; test ile Eşleşti (mnemonic ✔ seed ✔ xprv ✔)
- Ön doğrulama (çalışma alanı dışında, ethers 6.17.0): phrase, seed, xprv eşleşti

## İP 13–16 bildirilen değerler
| Değer | Durum |
|---|---|
| Eğitim hesabı adresi (uygulama) | 0x05d782Efca095aF3569D76Ef5542c352B3800Af6 |
| MetaMask ilk hesap adresi | 0x05d782Efca095aF3569D76Ef5542c352B3800Af6 (aynı 20 bayt, EIP-55 harfleri de aynı) — 2026-11-15 |
| Checksum deneyi tablosu | kullanıcı yaptığını bildirdi (2026-11-15); denemelerde "Geçersiz" sonucu alındı; pozisyon/kelime/sonuç tablosu ve ekran görüntüsü henüz iletilmedi |
| Faucet tx hash | 0xb1d9ca4010e707066fd361dcb23ce79ce90ff6660cd70b07bc120e959b693e36 — Sepolia, blok 12140988, 2026-11-15 15:02:48 UTC, Status Success, From 0xAfEDA61dB9e162293b2eF2C2bC5A800b37Bb5E4a (Chainlink faucet), To 0x05d782…00Af6, Value 0.05 ETH, ücret gönderen ödedi |
| İkinci hesap adresi | bildirilmedi |
| ETH transfer tx hash | bildirilmedi |
| USDC transfer tx hash | bildirilmedi |
| register tx hash | bildirilmedi (kayıt state'te doğrulandı: tumKayitlar → uye 0x05d782Efca095aF3569D76Ef5542c352B3800Af6, isim nisabegumerkilic, sira 8, zaman 1794759156 = 2026-11-15 16:12:36 UTC) |
| İkinci register denemesi | bildirilmedi |
| Kontrol sitesi sonucu | isim sitede göründü (kullanıcı bildirdi, 2026-11-15) |

## İP 16 notları (olgu)
- Takım sözleşmesi: 0x81Dd700C459BF2806A1B5F2a349c89f0106A9036 (Sepolia). Remix'e Etherscan'den src/QuantumKayit.sol kopyalandı, derlendi; Deploy kullanılmadı, At Address ile bağlanıldı.
- İlk bağlantıda Remix'in MetaMask sağlayıcısı Sepolia dışındaydı → "no code found at address" hatası; site ağı Sepolia yapılıp At Address yenilendi.
- İlk onay penceresinde isim kutusunda Türkçe "ı" içeren yanlış yazım vardı → kullanıcı İptal etti (tx oluşmadı); isim nisabegumerkilic olarak düzeltildi.
- Gönderim öncesi kontroller: ağ Sepolia, hesap 0x05d…00Af6, etkileşim 0x81Dd…9036, tumKayitlar/kayitSayisi okuması başarılı, isim a–z.
- Compiler Version (Etherscan): bildirilmedi

## İP 15 notları (olgu)
- Test USDC sözleşme adresi (Ethereum Sepolia): 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238 — kaynak: developers.circle.com/stablecoins/usdc-contract-addresses; kullanıcı buldu, Claude aynı sayfadan doğruladı (2026-11-15).
- Faucet (faucet.circle.com) sonucu: bildirilmedi
- USDC MetaMask'te görünür yapıldı mı: bildirilmedi

## İP 14 notları (olgu)
- Faucet: faucets.chain.link (Chainlink, resmî alan adı). Koşul: adres + cüzdanla mesaj imzası (düz metin, işlem değil). Ekranda "Drips 0.5 ETH" yazdı, zincire 0.05 ETH geldi.
- MetaMask İşlemler sekmesinde gelen işlem görünmedi (gönderen faucet); bakiye 0,05 SepoliaETH olarak göründü. İşlem Etherscan adres sayfasında bulundu.
- PoW faucet kullanılmadı → [İP14-4] uygulanmadı.
- Kanıt dosyaları (kullanıcı kaydedecek): kanitlar/ip14-1-faucet-tx-etherscan.png, kanitlar/ip14-2-adres-sayfasi-ve-metamask.png

## İP 13 notları (olgu)
- MetaMask kurulumu: ayrı kurulum (telefon uygulaması + Brave yeni profil uzantısı), aynı 12 kelime, aynı adres.
- Önceki kişisel MetaMask uzantısında "Bu Gizli Kurtarma İfadesi zaten içe aktarıldı" hatası yeni kelimelerle de görüldü; sebebi doğrulanamadı; temiz kuruluma geçildi.
- Bir eğitim cüzdanının kelimeleri ekran görüntüsüyle yapay zekâ sohbetine girdi; o cüzdan terk edildi, yenisi üretildi (yukarıdaki adres).
- Kullanıcının kişisel MetaMask uzantısı kullanıcı tarafından silindi (gerçek varlık yoktu); eğitimden bağımsız.

## Kanıt dosyaları (kanitlar/)
- henüz yok
