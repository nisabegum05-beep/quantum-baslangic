# İP 16: Remix ile Gerçek İsmini Kaydet

**Amaç:** Mevcut bir sözleşmeye bağlanıp açık veri göndermek.

## 1. Etherscan'deki kodu Remix'e kopyalayıp derlemek

Takım sözleşmesinin (`0x81Dd700C459BF2806A1B5F2a349c89f0106A9036`) Etherscan'deki Contract → Code bölümünden `src/QuantumKayit.sol` dosyasını Remix'te yeni bir dosyaya kopyaladım; settings.json içeriğini kopyalamadım. Remix'te derleyince `artifacts/` altında sözleşmenin ABI'si ve bytecode'u oluştu. Bu derleme zincire hiçbir şey göndermedi; amacı Remix'in sözleşmenin fonksiyonlarını tanıması için ABI üretmekti. İsmim koda yazılmadı, daha sonra fonksiyona parametre olarak verildi.

Etherscan'deki doğrulanmış ayarlar: **Compiler** v0.8.24+commit.e11b9ed9 · **Optimization** kapalı (200 runs) · **EVM** cancun. Remix'te 0.8.x bir derleyiciyle derlemek ABI üretmek için yeterli; bu ayarlar İP 18'deki verify için önemli.

Kodda dikkat ettiğim satırlar:

| Satır | Ne yapıyor |
|---|---|
| `mapping(address => bool) public kayitliMi;` | Hangi adresin kayıtlı olduğunu tutar; herkes ücretsiz okuyabilir |
| `Kayit[] private kayitlar;` | Bütün kayıtların listesi: adres, isim, sıra, zaman |
| `require(!kayitliMi[msg.sender], "Bu cuzdan zaten kayitli");` | Aynı cüzdanın ikinci kaydını reddeder |
| `kayitliMi[msg.sender] = true;` ve `kayitlar.push(...)` | Sözleşmenin state'ini değiştirir |
| `emit Registered(...)` | Kaydı bir event olarak makbuza yazar |

`msg.sender` işlemi imzalayan adres olduğu için kimse başkası adına kayıt yapamaz. İsim biçimi kodda denetlenmiyor; hangi isimlerin gösterileceğine takım sitesi karar veriyor.

## 2. Cüzdan ortamı, ağ, hesap ve At Address

Deploy & Run sekmesinde ortam olarak Browser Extension / MetaMask'i seçtim ve İP 13'te doğruladığım `0x05d7…00Af6` hesabını bağladım. Deploy düğmesine basmadım; At Address ile takımın sözleşme adresindeki mevcut sözleşmeye bağlandım. Deploy'a basmış olsaydım boş state'li yeni bir sözleşme oluşturmuş olurdum ve kaydım takımın sözleşmesine değil ona giderdi.

İlk denemede `tumKayitlar` okuması "no code found at address" hatası verdi ve Remix'te bakiyem 0 görünüyordu. Sebebi, MetaMask'in remix.ethereum.org sitesini Sepolia'ya değil başka bir ağa bağlamış olmasıydı. O ağda bu adreste sözleşme yok. MetaMask'te site için ağı Sepolia yapıp bağlantıyı yenileyince bakiyem 0.05 ETH göründü ve `kayitSayisi` ile `tumKayitlar` takım listesini döndürdü. Aynı adresin farklı ağda farklı bir şey olabileceğini burada canlı gördüm.


## 3. İsim kuralı

| Adım | Sonuç |
|---|---|
| Gerçek ad-soyad | Nisa Begüm Erkılıç |
| ü→u, ı→i, ç→c | Nisa Begum Erkilic |
| Küçük harf, boşluksuz | **nisabegumerkilic** |

Sonuç yalnızca a–z harflerinden oluşuyor. İlk onay penceresi açıldığında register kutusunda Türkçe "ı" harfleri kalmış olduğunu fark ettim. İşlemi MetaMask'te iptal ettim; iptal edilen işlem imzalanmadığı için hiç oluşmadı. İsmi düzelttikten sonra gönderdim.

## 4. register işlemi

Göndermeden önce ağın Sepolia, hesabın `0x05d7…00Af6`, etkileşim adresinin `0x81Dd…9036` olduğunu ve ismin doğru yazıldığını kontrol ettim. Gas ücretini MetaMask'te inceleyip onayladım.

| Bilgi | Değer |
|---|---|
| Tx hash | `0x67587deae063fe93b5678de80f6c66ce83a965fb3149ab8e794011afdfb06222` |
| Blok / zaman (UTC) | 12141331 · 15.11.2026 16:12:36 |
| Status | Success · gas used 583,639 · nonce 0 |
| Sonuç (tumKayitlar) | uye `0x05d782…00Af6`, isim `nisabegumerkilic`, sıra 8, zaman 1794759156 (15 Kasım 2026, 16:12:36 UTC) |

Bu işlemle yeni bir sözleşme oluşturmadım. Takımın mevcut sözleşmesinin state'ine kendi kaydımı ekledim: `kayitliMi` benim için `true` oldu ve `kayitlar` listesine 8. satır olarak girdim. Sözleşmenin kodu değişmedi, yalnızca tuttuğu veri değişti.


## 5. Aynı cüzdanla ikinci register denemesi

Etherscan'de hesabımın işlem listesinde, başarılı kaydımdan bir blok sonra başarısız bir ikinci Register işlemi görünüyor:

| Bilgi | Değer |
|---|---|
| Tx hash | `0x9eb7161beb8d120af9434856ecd46984001572b81a244e2ef25ca315503670e5` |
| Blok / zaman (UTC) | 12141332 · 15.11.2026 16:12:48 (ilk kayıttan 12 saniye sonra) |
| Status | Fail — "Bu cuzdan zaten kayitli" (execution reverted) |
| Nonce | 1 |
| Gas used / limit | 21,400 / 589,438 |
| Ücret | 0.0000000000003638 ETH |

İki işlem 12 saniye arayla, art arda iki blokta yer alıyor. Bu da ikinci işlemin aynı oturumda ikinci bir onayla gönderildiğini gösteriyor. İkinci işlem zincire gitti, bloğa alındı ve sözleşmedeki `require` satırında revert oldu. Gas ödendi, nonce harcandı, ama state değişmedi; kaydım tek ve doğru kaldı.

Bu hatayı gönderilmeden önce oluşan hatadan ayırmak gerekiyor. Normalde cüzdan işlemi göndermeden önce `eth_estimateGas` ile simüle eder; `require` simülasyonda da revert vereceği için cüzdan uyarı gösterir. Uyarı zorla geçilmezse tx hash hiç oluşmaz ve zincirde iz kalmaz. Benim durumumda ise işlem bloğa girdiği için hata zincirde oluştu ve bir tx hash'i var.


## 6. Kontrol sitesi

Kontrol sitesinde (haloclineblockchain.vercel.app) ismimi aradım ve kaydım göründü.


## Benim yorumum

İsmimin sitede görünmesi ile zincirde kaydedilmiş olması aynı kontrol değil. Zincir kaydı sözleşmenin state'inde duruyor: `tumKayitlar` beni 8. sırada gösteriyor ve bu, siteden bağımsız olarak herkesin doğrulayabileceği bir gerçek. Site ise zinciri okuyan bir pencere; yalnızca kendi listesindeki isimlerle eşleşen kayıtları gösteriyor. Mesela ismimi "ı" harfiyle gönderseydim zincire yine yazılırdı ama sitede görünmezdi. Site kapansa ya da yanlış sözleşmeyi izlese de kaydım zincirde kalırdı. Bu yüzden asıl kanıt Etherscan'deki Status ve sözleşmenin state'i; site ise bunun kullanıcı dostu bir özeti.

## Kaynaklar
- [Takım sözleşmesi – Sepolia Etherscan](https://sepolia.etherscan.io/address/0x81Dd700C459BF2806A1B5F2a349c89f0106A9036#code)
- [Remix IDE – Deploy & Run](https://remix-ide.readthedocs.io/en/latest/run.html)
- [Solidity Docs – Error handling (require, revert)](https://docs.soliditylang.org/en/latest/control-structures.html#error-handling-assert-require-revert-and-exceptions)
- [Solidity Docs – Events](https://docs.soliditylang.org/en/latest/contracts.html#events)
- [ethereum.org – JSON-RPC (eth_estimateGas)](https://ethereum.org/en/developers/docs/apis/json-rpc/)
