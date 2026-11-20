# Kanıt ve yorum haritası (İP 12–24)

Her İP için: öğrendiklerimin nerede olduğu, kanıt görselleri ve "Benim yorumum" sorusu.

İP 11–16'nın soru-cevap notları depo kökünde:
`-Çalışma Ortamı.md` (İP 11) · `-Cüzdan Oluşturucu.md` (İP 12) · `-MetaMask ve Checksum.md` (İP 13) ·
`-Test ETH.md` (İP 14) · `-Test USDC ve İki Transfer.md` (İP 15) · `-Remix ile İsim Kaydı.md` (İP 16).
Bu notlardaki `<!-- doldur -->` yerleri ve "Benim yorumum" taslakları teslimden önce gözden geçirilecek.
**Benim yorumum** bölümlerini ben yazacağım; altlarındaki ipuçları yalnızca düşünme yardımıdır.

Kural: Hiçbir görselde 12 kelime, seed, entropi, xprv veya private key görünmez.
Durum işaretleri: ✅ var · ⏳ eklenecek · — gerekmiyor

---

## İP 12 — Kendi cüzdan oluşturucunu yaz
- **Öğrendiklerim:** `cuzdan-araci/OGRENDIKLERIM.md` → ADIM 12.1–12.21
- **Olgular:** `cuzdan-araci/KAYIT.md` → Tamamlanan adımlar, Kabul testleri
- **Kod haritası:** `cuzdan-araci/README.md`

| Kanıt | Dosya | Durum |
|---|---|---|
| Uygulama ekranı, 8 aşama (gizli alanlar kapalı) | `ip12-1-uygulama-ekrani.png` | ⏳ |
| `npm test` çıktısı (8/8) | `ip12-2-npm-test.png` | ⏳ |
| Resmî vektör "Eşleşti" | `ip12-3-test-vektoru.png` | ⏳ |

**Benim yorumum** — *Mnemonic ile private key arasındaki farkı kendi uygulamanız üzerinden açıklayın.*

<!-- İpucu: Aşama 2 ile Aşama 6'yı karşılaştır. Hangisinden diğerine gidilebiliyor, tersi mümkün mü?
     Aşama 5'teki yolun son sayısını değiştirince hangisi aynı kalıyor, hangisi değişiyor? -->

_(benim yorumum)_

---

## İP 13 — MetaMask ile karşılaştır ve checksum deneyi
- **Öğrendiklerim:** `OGRENDIKLERIM.md` → ADIM 13.1–13.6, ADIM 12.18–12.19
- **Olgular:** `KAYIT.md` → İP 13 notları (eşleşen adres 0x05d782…00Af6)

| Kanıt | Dosya | Durum |
|---|---|---|
| Uygulama adresi = MetaMask adresi (gizli alanlar kapalı) | `ip13-1-adres-eslesme.png` | ✅ |
| Doğrulama kutusu, kelimeler kapatılmış ("12 kelime bekleniyor") | `ip13-2a-dogrulama-kutusu-kapatilmis.png` | ✅ |
| Checksum deneyi: "Geçerli" ve "checksum tutmadı" sonuçları (resmî vektör kelimeleriyle) | `ip13-2-checksum-deneyi.png` | ⏳ |

Checksum deneyi tablosu (en az 5 deneme, gerçek kelimeler yazılmaz):

| Deneme | Pozisyon | Yeni kelime | Sonuç |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| 6 | (uydurma kelime) | xyzxyz | |

**Benim yorumum** — *Geçerli mnemonic ile güvenli biçimde üretilmiş mnemonic aynı iddia mıdır?*

<!-- İpucu: "Geçerli" yalnızca checksum'ın tuttuğunu söyler. Checksum 4 bit, ~1/16 tesadüf.
     Güvenli üretim ise entropinin nereden geldiğiyle ilgili (Aşama 1). İkisini hangi kontrol ölçüyor? -->

_(benim yorumum)_

---

## İP 14 — Test ETH kaynağını kendin bul
- **Öğrendiklerim:** `OGRENDIKLERIM.md` → ADIM 14.1–14.4 ve "İP 14 — gerçekleşen"
- **Olgular:** `KAYIT.md` → İP 14 notları (faucet tx 0xb1d9ca40…693e36)

| Kanıt | Dosya | Durum |
|---|---|---|
| Faucet imza talebi (mesaj imzası, işlem değil) | `ip14-0-faucet-imza-talebi.png` | ✅ |
| Faucet işlemi, Etherscan (Status Success) | `ip14-1-faucet-tx-etherscan.png` | ✅ |
| Adres sayfası + MetaMask bakiyesi | `ip14-2-adres-sayfasi-ve-metamask.png` | ✅ |
| Faucet'in adres sayfası | `ip14-3-faucet-adres-sayfasi.png` | ✅ |

**Benim yorumum** — *Adresi paylaşmak neden harcama yetkisi vermez?*

<!-- İpucu: Adresini faucet'e, Etherscan'e ve bu sohbete verdin; hiçbiri senin adına gönderemedi.
     Faucet gönderebildi çünkü kendi ... ile imzaladı. Adres nereden türüyor (İP 12, Aşama 8)? -->

_(benim yorumum)_

---

## İP 15 — Test USDC ve iki transferi karşılaştır
- **Öğrendiklerim:** `OGRENDIKLERIM.md` → ADIM 15.1–15.6 ve "İP 15 — gerçekleşen"
- **Olgular:** `KAYIT.md` → İP 15 karşılaştırma tablosu

| Kanıt | Dosya | Durum |
|---|---|---|
| ETH transferi: To ikinci hesap, Value 0.005, Input `0x` | `ip15-1-eth-transfer-tx.png` | ✅ |
| USDC transferi: To sözleşme, Value 0, Input `transfer(...)` | `ip15-2-usdc-transfer-tx.png` | ✅ |
| USDC işleminin Logs sekmesi (Transfer event'i) | `ip15-3-usdc-transfer-log.png` | ⏳ |
| Hesap işlem listesi (OUT/IN, başarısız register dahil) | `ip15-4-hesap-islem-listesi.png` | ✅ |
| ETH onay penceresi (ücret SepoliaETH) | `ip15-5-eth-onay-penceresi.png` | ✅ |
| USDC onay penceresi (ücret SepoliaETH) | `ip15-6-usdc-onay-penceresi.png` | ✅ |

**Benim yorumum** — *USDC gönderirken ücretin hangi bakiyeden karşılandığını nasıl gördünüz?*

<!-- İpucu: ip15-2'de "Transaction Fee" hangi birimde? İşlemden sonra hangi bakiyen azaldı?
     MetaMask onay penceresindeki "Ağ ücreti" satırı ne yazıyordu? -->

_(benim yorumum)_

---

## İP 16 — Remix ile gerçek ismini kaydet
- **Öğrendiklerim:** `OGRENDIKLERIM.md` (İP 16 adımları eklenecek)
- **Olgular:** `KAYIT.md` → İP 16 notları (register 0x67587dea…6222, sıra 8)

| Kanıt | Dosya | Durum |
|---|---|---|
| Remix: Browser Extension, hesap, At Address ile bağlı sözleşme | `ip16-1-remix-at-address.png` | ⏳ |
| Register işlemi, Etherscan (Status Success) | `ip16-2-register-tx.png` | ⏳ |
| İkinci register: zincirde başarısız işlem (Status Fail) | `ip16-3-ikinci-kayit-zincirde-revert.png` | ⏳ |
| Kontrol sitesinde ismim | `ip16-4-kontrol-sitesi.png` | ⏳ |

**Benim yorumum** — *İsminizin sitede görünmesiyle zincirde kaydedilmiş olması aynı kontrol müdür?*

<!-- İpucu: Zincir neyi kanıtlıyor (tumKayitlar, sıra 8)? Site neyi filtreliyor (kendi isim listesi, isim biçimi)?
     Zincirde olup sitede görünmeyen bir kayıt olabilir mi? -->

_(benim yorumum)_

---

## İP 17 — Explorer ile kaydı doğrula · ⏳ sona bırakıldı
| Kanıt | Dosya | Durum |
|---|---|---|
| Decode Input Data'da ismim | `ip17-1-decode-input.png` | ⏳ |
| Logs → Registered event'i | `ip17-2-registered-event.png` | ⏳ |

**Benim yorumum** — *Input Data, event ve mevcut state size hangi farklı soruların cevabını verdi?*

_(benim yorumum)_

## İP 18 — Kopyayı deploy et ve verify et · ⏳ sona bırakıldı
- Kaynak kopyası hazır: `takim-sozlesmesi-kopyasi/`

**Benim yorumum** — *Aynı kodun farklı adreste çalışması neden eski kayıtları otomatik taşımıyor?*

_(benim yorumum)_

## İP 19 — Etherscan Write Contract ile kendi sözleşmene kaydol · ⏳ sona bırakıldı
**Benim yorumum** — *Aynı cüzdan takım sözleşmesine ikinci kez kaydolamazken kendi kopyanıza neden kaydolabildi?*

_(benim yorumum)_

---

## İP 20 — İlk etkinlik kaydını oluştur · ⏳
**Benim yorumum** — *Bu ilk sürüm hangi yanlış kullanımları henüz engellemiyor?*

_(benim yorumum)_

## İP 21 — Kapasite ve kayıt kuralları · ⏳
**Benim yorumum** — *Adres başına sınırın gerçek kişi sayısını neden garanti etmediğini açıklayın.*

_(benim yorumum)_

## İP 22 — Görevli ve giriş kontrolü · ⏳
**Benim yorumum** — *Arayüzde düğmeyi gizlemek yerine yetkiyi sözleşmede denetlemek neden gerekir?*

_(benim yorumum)_

## İP 23 — Etkinlik sözleşmesini Sepolia'ya taşı · ⏳
**Benim yorumum** — *Aynı projenin yerel ve Sepolia sürümlerini karıştırmamak için hangi bilgileri kontrol edersiniz?*

_(benim yorumum)_

## İP 24 — Cüzdan bağlantılı arayüz · ⏳
**Benim yorumum** — *Kodda cüzdan bağlantısı, sözleşme çağrısı ve veri okuma yapılan yerleri gösterin.*

_(benim yorumum)_
