# İP 05: Akıllı Sözleşme ve ABI

**Amaç:** Kodun zincirde çalışmasını ve çağrılmasını anlamak.

## 1. Akıllı sözleşme, EVM ve state nedir?

**Akıllı sözleşme:** Blokzincirde kendi adresi olan ve içinde hem kod hem veri tutan bir programdır. Kendi kendine çalışmaz, biri ona işlem gönderdiğinde veya onu çağırdığında çalışır. Kurallar kodda yazılı olduğu için sözleşme herkese aynı şekilde davranır ve kodu yayınlandıktan sonra değiştirilemez.

**EVM (Ethereum Virtual Machine):** Akıllı sözleşmelerin kodunu çalıştıran sanal makinedir. Ağdaki her node aynı EVM'yi çalıştırır ve aynı girdiden her zaman aynı sonucu elde eder, böylece bütün node'lar aynı state'e ulaşır. EVM'de yapılan her işlemin bir gas maliyeti vardır.

**State:** Ağdaki bütün hesapların ve sözleşmelerin şu anki durumudur. Bir sözleşmenin state'i ise o sözleşmenin içinde tuttuğu değişkenlerin şu anki değerleridir (storage). State sadece yeni bir işlemle değişir ve sözleşmenin kodu değişmez, sadece içinde tuttuğu değerler değişir.

## 2. Kaynak kod, derleme ve bytecode nasıl ilişkilidir? Deploy ne yapar?

**Kaynak kod:** Geliştiricinin insanın okuyabileceği bir dilde (Solidity) yazdığı koddur.

**Derleme:** Kaynak kodun derleyici (solc) ile EVM'nin anlayabileceği hale çevrilmesidir. Derleme sonucunda iki şey elde edilir: bytecode ve ABI.

**Bytecode:** EVM'nin çalıştırdığı, makinenin anlayabildiği komutlar dizisidir. İnsan için okunabilir değildir. Zincire kaynak kod değil bytecode yüklenir.

**Deploy:** Bytecode'u zincire yükleyip yeni bir sözleşme oluşturma işlemidir. Deploy de bir işlemdir, imzalanır ve gas öder. Bu işlemin alıcı (To) alanı boştur ve Input Data alanında sözleşmenin bytecode'u bulunur. EVM önce sözleşmenin başlangıç kodunu (constructor) çalıştırır, sonra sözleşmenin kalıcı kodunu yeni bir adrese kaydeder. Bu adres deploy eden hesabın adresinden ve o hesabın nonce'undan hesaplanır, bu yüzden her deploy yeni bir adres oluşturur.

```
Kaynak kod (Solidity) → Derleme (solc) → Bytecode + ABI → Deploy işlemi → Yeni adreste sözleşme
```

## 3. ABI ne işe yarar? Ne zaman elde edilir? Bir sözleşmenin adresi dışında hangi arayüz bilgilerine ihtiyaç duyabilirsiniz?

**ABI (Application Binary Interface):** Sözleşmenin dışarıdan nasıl çağrılacağını anlatan arayüz tanımıdır. Sözleşmede hangi fonksiyonların olduğunu, bu fonksiyonların hangi parametreleri aldığını ve ne döndürdüğünü, hangi fonksiyonların sadece okuma yaptığını ve hangi event'lerin yayımlandığını JSON formatında tutar.

Bir uygulama sözleşmeyi çağırmak istediğinde ABI'ya bakarak çağrıyı EVM'nin anlayacağı Input Data'ya çevirir. Sözleşmeden dönen cevabı ve event'leri de yine ABI'ya bakarak okunabilir hale getirir. ABI olmadan sözleşmenin adresi bilinse bile hangi fonksiyonun nasıl çağrılacağı bilinemez.

ABI derleme sırasında bytecode ile birlikte elde edilir. ABI zincirde saklanmaz. Bu yüzden ABI ya derleyiciden (Remix'in derleme sekmesinden) ya da kaynak kodu verify edilmiş sözleşmelerin explorer sayfasından alınır.

Sözleşmenin adresi dışında ihtiyaç duyulabilecek bilgiler şunlardır:
- **Ağ bilgisi (chain ID):** Sözleşmenin hangi ağda olduğu. Aynı adres farklı ağlarda farklı bir sözleşmeye ait olabilir veya hiç olmayabilir.
- **ABI:** Fonksiyon adları, parametre ve dönüş tipleri, fonksiyonların okuma mı yazma mı yaptığı, event'ler ve hata tanımları.
- **Deploy edildiği blok:** Sözleşmenin geçmiş event'lerini aramaya nereden başlanacağı.
- **Derleme ayarları:** Derleyici sürümü, optimizasyon ayarı ve EVM hedefi. Kaynak kodu verify etmek için gerekir.

## 4. Veri okumak ile state değiştiren işlem göndermek nasıl ayrılır?

**Veri okumak:** State'i değiştirmeyen fonksiyonların (view veya pure) çağrılmasıdır. Bu çağrı bir node üzerinde yerel olarak çalıştırılır, işlem gönderilmez, imza gerekmez, ücret ödenmez, bloğa girmez ve sonuç hemen döner.

**State değiştiren işlem göndermek:** State'i değiştiren bir fonksiyonun çağrılmasıdır. Bunun için cüzdanla imzalanmış bir işlem gönderilir, gas ücreti ödenir ve işlem bir bloğa girene kadar beklenir. İşlemin başarılı olup olmadığı ancak işlem makbuzundaki (receipt) status değerinden anlaşılır. State değiştiren fonksiyonun döndürdüğü değer doğrudan çağıran kişiye ulaşmaz, sonuç event'lerden veya sonradan yapılan okumalardan öğrenilir.

| | Veri okumak | İşlem göndermek |
|---|---|---|
| State değişir mi? | Hayır | Evet |
| İmza gerekir mi? | Hayır | Evet |
| Gas ücreti | Ödenmez | Ödenir |
| Bloğa girer mi? | Hayır | Evet |
| Sonuç | Hemen döner | Bloğa girip makbuz oluşunca öğrenilir |

## 5. Kaynak kodu verify etmek neyi doğrular? Güvenlik denetimiyle aynı şey midir?

Zincirde sadece bytecode bulunduğu için bir sözleşmenin hangi kaynak koddan geldiği dışarıdan görülemez. Verify etmek, yayınlanan kaynak kodun aynı derleyici sürümü ve aynı ayarlarla derlendiğinde zincirdeki bytecode ile birebir aynı sonucu verdiğini doğrular. Yani verify sadece "bu adresteki kod gerçekten bu kaynak koddan geldi" iddiasını kanıtlar. Verify edilmiş sözleşmelerin kaynak kodu ve ABI'sı explorer'da herkes tarafından okunabilir ve explorer üzerinden sözleşme çağrılabilir.

Verify güvenlik denetimiyle aynı şey değildir. Verify kodun güvenli, hatasız veya dürüst olduğunu göstermez. Hatalı veya kötü niyetli bir kod da verify edilebilir. Güvenlik denetimi ise uzmanların kodun mantığını inceleyip açıkları ve hataları aradığı ayrı bir süreçtir. Verify, denetimin yapılabilmesi için kaynak kodun doğru olduğunu garanti eden bir ön koşul gibidir.

## Benim yorumum

Aynı kod iki farklı adrese yayınlandığında kayıtların ayrı olmasının sebebi her deploy işleminin yeni ve bağımsız bir sözleşme oluşturmasıdır. Kod aynı olsa bile her sözleşmenin kendi adresi ve kendi state'i vardır ve yeni sözleşmenin state'i boş başlar. Kayıtlar koda değil sözleşmenin adresine bağlı tutulduğu için eski sözleşmedeki kayıtlar yeni sözleşmeye kendiliğinden taşınmaz. Bu yüzden bir sözleşmeyle işlem yapmadan önce sadece kodun değil adresin ve ağın da doğru olduğunu kontrol etmek gerekir.

## Kaynaklar
- Usta, A. & Doğantekin, S. *Blockchain 101 v2* – Bölüm 2.3 "Teknik Detayları ile Akıllı Sözleşmelere Bakış"
- Sert, T. *Sorularla Blockchain* – "Akıllı kontrat olur mu? Ethereum ve Akıllı Kontratlar"
- [ethereum.org – Introduction to smart contracts](https://ethereum.org/en/developers/docs/smart-contracts/)
- [ethereum.org – Ethereum Virtual Machine (EVM)](https://ethereum.org/en/developers/docs/evm/)
- [ethereum.org – Compiling smart contracts](https://ethereum.org/en/developers/docs/smart-contracts/compiling/)
- [ethereum.org – Deploying smart contracts](https://ethereum.org/en/developers/docs/smart-contracts/deploying/)
- [ethereum.org – Verifying smart contracts](https://ethereum.org/en/developers/docs/smart-contracts/verifying/)
- [Solidity Docs – Contract ABI Specification](https://docs.soliditylang.org/en/latest/abi-spec.html)
