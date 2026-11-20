# Kadınzincir — Etkinlik Sözleşmesi (İP 20–23)

Kendi etkinlik sözleşmem: kadın geliştiricileri bir araya getiren bir etkinlik. Kayıt için iki beyan zorunlu.
Takım sözleşmesinden bağımsız. Kuralları ben belirledim, kodu Claude Code sıfırdan yazdı. Eğitim takma adları kullanılır; gerçek isim yazılmaz.

**Sınır:** Sözleşme cinsiyeti de geliştiriciliği de doğrulayamaz; yalnızca kayıt sırasında beyanları zorunlu kılar. Zincire gizli bir soru-cevap koymak da işe yaramaz, çünkü Input Data herkese açıktır.
Gerçek kontrol, görevlinin giriş onayında (İP 22) yapılır.
**Kapasite:** deploy parametresi. İş paketi denemeleri (İP 21–23) için **3**, gerçek etkinlik için **30**.

| Dosya | İP | Ne ekliyor |
|---|---|---|
| `EtkinlikKaydi_v1.sol` | 20 | Etkinlik adı, adres başına takma ad, dışarıdan okuma |
| `Kadinzincir_v2.sol` | 21 | Kadın ve geliştirici beyanı zorunlu, boş ad ve tekrar kayıt reddi, kapasite (deploy'da), toplam kayıt sayısı |
| `Kadinzincir_v3.sol` | 22 | v2 kuralları + görevli (deploy eden), `girisOnayla`, `girisYaptiMi`, `Kaydoldu` ve `GirisYapti` event'leri |

İlk sürüm silinmeden duruyor (İP 21-4).

## İP 20 — Remix yerel ortam (Remix VM) denemesi

- Ortam: Remix VM (Osaka), Remix 2.6.15
- Etkinlik adı (deploy parametresi): Kadınzincir
- Yerel sözleşme adresi: 0xd91…39138 (yalnızca Remix VM'de, zincirde değil)

| # | Hesap (Remix VM) | İşlem | Beklenen | Gözlenen |
|---|---|---|---|---|
| 1 | Account 1 `0x5B38…eddC4` | `kayitOl("Ayşe")` | işlem başarılı | ✅ başarılı, logs 0, data 0xcdc4… |
| 2 | Account 2 `0xAb84…35cb2` | `kayitOl("zeynepsu")` | işlem başarılı | ✅ başarılı, logs 0, data 0xcdc4… |
| 3 | Account 2 seçiliyken | `takmaAdi(Account 1)` | A'nın takma adı | ✅ `Ayşe` — CALL, hash yok, gas yok |
| 4 | herhangi | `takmaAdi(Account 2)` | B'nin takma adı | ⚙️ `zeynepsu` |
| 5 | herhangi | `takmaAdi(kayıt olmamış Account 3)` | `""` (boş) | ⚙️ `""` (boş metin) |
| 6 | herhangi | `etkinlikAdi()` | deploy'da verilen ad | ⚙️ `Kadınzincir` |

✅ işaretli hücreleri Remix VM'de kendim gözledim. ⚙️ işaretli satırları Remix'te yapmadım: yapay zekâ asistanı (Claude Code) aynı kaynak kodu solc 0.8.20 ile derleyip yerel bir EVM'de (`@ethereumjs/evm`, Remix'in varsayılan hesap adresleriyle) otomatik çalıştırdı. Bu hücreler o çalıştırmanın gerçek çıktısıdır.

v1'in eksikleri de bu çalıştırmada göründü: Account 1 `kayitOl("Ayşe2")` ile tekrar çağırınca işlem başarılı oldu ve takma adı `Ayşe2` ile **değişti**. Account 3 boş ad `""` ile de kaydolabildi. v2'deki "tekrar kayıt" ve "boş ad" kuralları bu yüzden eklendi.

## İP 21 — Remix VM denemesi (deploy: `Kadınzincir`, `3`)

- Yerel sözleşme adresi: 0x652…bA595 (Remix VM, Osaka). `kapasite()` → 3.
- Not: Remix bool kutusuna `1` yazılınca `true` olarak kabul etti.
- Gözlem: `takmaAdi` (address) kutusuna isim yazılınca Remix çağrıyı hiç göndermedi: "Error encoding arguments: invalid address". ABI, parametre türünü gönderimden önce denetler.

| # | Deneme | Beklenen sonuç | Gözlenen |
|---|---|---|---|
| 1 | İlk geçerli kayıt: Account 1 `Begüm` | Kabul; toplam 1 | ✅ takmaAdi(Account 1) → `Begüm` |
| 2 | Account 1 tekrar: `kayitOl("ayse", true, true)` | Ret "Bu adres zaten kayitli"; toplam 1 | ⚙️ Ret "Bu adres zaten kayitli"; toplamKayit = 1 |
| 3 | Account 2: `kayitOl("", true, true)` — boş ad | Ret "Takma ad bos olamaz"; toplam 1 | ⚙️ Ret "Takma ad bos olamaz"; toplamKayit = 1 |
| 4 | İkinci ve üçüncü geçerli kayıt (Account 2, Account 3) | Kabul; toplam 3 | ✅ toplamKayit = 3 |
| 5 | Account 5: `kayitOl("Eren", 1, 1)` (dördüncü farklı hesap) | Ret "Kapasite dolu"; toplam 3 | ✅ Ret, "Kapasite dolu"; işlem zincire gitti ve revert oldu (hash 0xf20…48fcf, logs 0, gas ödendi: bakiye 99.999); toplamKayit = 3 |
| 6 | (ek) Account 4: `kayitOl("deniz", false, true)` | Ret "…kadin olarak tanimlayanlar icindir"; toplam 3 | ⚙️ Ret "Bu etkinlik kendini kadin olarak tanimlayanlar icindir"; toplamKayit = 3 |
| 7 | (ek) Account 4: `kayitOl("deniz", true, false)` | Ret "Bu etkinlik gelistiriciler icindir"; toplam 3 | ⚙️ Ret "Bu etkinlik gelistiriciler icindir"; toplamKayit = 3 |

Yerel EVM'de kapasite dolduktan sonra 6. ve 7. satırlar da "Kapasite dolu" yerine beyan mesajıyla reddedildi. Yani sözleşme beyanları kapasiteden önce denetliyor.

## İP 22 — Remix VM denemesi (deploy: Account 1 ile, `Kadınzincir`, `3`)

Görevli = deploy eden = Account 1. Önce iki kişi kaydolur (ör. Account 2, Account 3); Account 4 kayıtsız kalır.

| # | Deneme | Beklenen | Gözlenen |
|---|---|---|---|
| 1 | Account 2 kaydolur | Kabul; logs 1 → `Kaydoldu(Account 2, ad, 1)` | ⚙️ Kabul; `Kaydoldu(0xAb84…35cb2, zeynep, 1)`. Ardından Account 3 → `Kaydoldu(0x4B20…02db, elif, 2)` |
| 2 | Görevli (Account 1) `girisOnayla(Account 2)` | Başarı; `girisYaptiMi(Account 2)` = true; logs 1 → `GirisYapti` | ⚙️ Başarı; `GirisYapti(0xAb84…35cb2, 0x5B38…eddC4)`; `girisYaptiMi(Account 2)` = true |
| 3 | Görevli olmayan (Account 3) `girisOnayla(Account 2)` | Ret "Yalnizca gorevli giris onaylayabilir"; durum değişmez | ⚙️ Ret "Yalnizca gorevli giris onaylayabilir" |
| 4 | Görevli `girisOnayla(Account 4)` (kayıtsız) | Ret "Bu adres kayitli degil" | ⚙️ Ret "Bu adres kayitli degil" |
| 5 | Görevli `girisOnayla(Account 2)` ikinci kez | Ret "Bu katilimci zaten giris yapti"; ilk giriş korunur | ⚙️ Ret "Bu katilimci zaten giris yapti"; `girisYaptiMi(Account 2)` hâlâ true |
| 6 | İP 21 tekrarı: tekrar kayıt, boş ad, kapasite | v2 ile aynı sonuçlar | ⚙️ Aynı: "Bu adres zaten kayitli", "Takma ad bos olamaz"; Account 1 üçüncü kayıt (sıra 3), sonra Account 4 "Kapasite dolu"; toplamKayit = 3 |

> Durum: bu denemeleri Remix VM'de yapmadım. Tablodaki ⚙️ gözlemlerin hepsi asistanın yerel EVM çalıştırmasından (İP 20'deki nota bakın). Ayrıca İP 21 tablosunun tamamı v3 ile tekrarlandı; v3'te başarılı her kayıt bir `Kaydoldu` event'i yayımladı, v2'de ise hiç log yoktu.

## İP 23 — Sepolia'ya taşıma

ABI: `Kadinzincir_v3.abi.json` (yerelde solc 0.8.20 ile üretildi; ABI derleyici sürümüne bağlı değildir, Remix'te deploy edilen 0.8.34 derlemesiyle aynıdır). Gizli anahtar, kelime veya API anahtarı bu klasöre yazılmaz.

| Bilgi | Değer |
|---|---|
| Ağ | Ethereum Sepolia (chain ID 11155111) |
| Kaynak dosya | `Kadinzincir_v3.sol` (Remix'te `kadınsözleşmevol2.sol` adıyla) |
| Constructor parametreleri | `_etkinlikAdi` = `KadınZincir`, `_kapasite` = 3 |
| Derleyici sürümü | 0.8.34+commit.80d5c536 (Remix 2.6.15) |
| Optimizasyon | kapalı (no optimizer) |
| EVM sürümü | osaka |
| Deploy eden = görevli | `0x05d782Efca095aF3569D76Ef5542c352B3800Af6` (birinci eğitim hesabı) |
| Sözleşme adresi | `0x2Ee529a07e98dEEe473bE9bb0f2a63e757a01e65` |
| Deploy tx hash | `0x5dcd7f9efc6588beac8812801ab7136f0218035ba15cca2853903a407ca2678a` |
| Deploy bloğu / sonuç | 12175921 · status 1 (Remix makbuzu: "Transaction mined and execution completed") |

| # | Deneme | Hesap | Beklenen | Tx hash | Gözlenen |
|---|---|---|---|---|---|
| 1 | `gorevli()` okuması | — | birinci eğitim hesabı | — | ⚙️ `0x05d782Efca095aF3569D76Ef5542c352B3800Af6`; `etkinlikAdi` = `KadınZincir`, `kapasite` = 3 |
| 2 | `kayitOl(takma ad, true, true)` — İP 24 sitesi üzerinden | ikinci eğitim hesabı `0x72d419fa…0F4B` | Kabul; Kaydoldu event'i | henüz yok | ⏳ Henüz yapılmadı (site yayına alındıktan sonra) |
| 3 | `girisOnayla(ikinci hesap)` — İP 24 sitesi üzerinden | birinci eğitim hesabı | Kabul; GirisYapti event'i | henüz yok | ⏳ Henüz yapılmadı (2. satırdan sonra) |
| 4 | `kayitliMi`, `takmaAdi`, `girisYaptiMi` (ikinci hesap) | — | true, takma ad, true | — | ⏳ 2. ve 3. satırdan sonra okunacak |
| 5 | Remix VM'deki kayıtlar (Begüm vb.) yeni örnekte var mı? `kayitliMi(0x5B38…)`, `toplamKayit` | — | false, 1 (2. satırdan sonra) | — | ⚙️ `kayitliMi(0x5B38…)` = false. `toplamKayit` şu an 0, çünkü 2. satır henüz yapılmadı. Remix VM'deki kayıtlar Sepolia örneğine taşınmadı. |

⚙️ işaretli okumaları asistan 20.11.2026'da Sepolia'daki sözleşmeden herkese açık bir RPC ile yaptı (blok 12176563 civarı). Okuma (`eth_call`) işlem oluşturmadığı için tx hash'i yoktur.

**Bayt kodu doğrulaması (asistan, 20.11.2026):** zincirdeki kod, `Kadinzincir_v3.sol` dosyasının solc 0.8.34 derlemesiyle bayt bayt aynı. Derleme ayarları optimizer kapalı ve EVM osaka, metadata da eşleşiyor. Koda deploy anında gömülen değerler görevli `0x05d7…00Af6` ve kapasite 3. Deploy işleminden çözülen constructor parametreleri `KadınZincir` ve 3. Sözleşme Etherscan'de verify edilmedi.

## Fonksiyon seçicileri

Seçici, fonksiyon imzasının Keccak-256 özetinin ilk 4 baytıdır; derleyici sürümünden bağımsızdır.

### EtkinlikKaydi_v1

| Fonksiyon | Selector |
|---|---|
| `etkinlikAdi()` | `0x6527ed97` |
| `kayitOl(string)` | `0xcdc46707` |
| `takmaAdi(address)` | `0x2d016f39` |

### Kadinzincir_v2

| Fonksiyon | Selector |
|---|---|
| `kayitOl(string,bool,bool)` | `0x222d8feb` |
| `toplamKayit()` | `0x5ad5d154` |
| `kapasite()` | `0x96efaabf` |
| `kayitliMi(address)` | `0x8162c855` |

### Kadinzincir_v3

| Fonksiyon / Event | Selector / topic0 |
|---|---|
| `girisOnayla(address)` | `0x99496d36` |
| `girisYaptiMi(address)` | `0x3beaceb2` |
| `gorevli()` | `0x38bbc1b6` |
| `event Kaydoldu(address,string,uint256)` | `0x6ad47f7d…` |
| `event GirisYapti(address,address)` | `0x27658968…` |
