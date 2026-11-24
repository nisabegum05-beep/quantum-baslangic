# İP 06: RPC, Explorer ve Event

**Amaç:** Uygulamanın zincirdeki bilgiye nasıl eriştiğini anlamak.

## 1. RPC ve RPC endpoint nedir? Node ve RPC hizmet sağlayıcısı ile ilişkileri nasıldır?

**RPC (Remote Procedure Call):** Bir uygulamanın bir node'a istek göndererek zincirden bilgi almasını veya zincire işlem göndermesini sağlayan arayüzdür. Ethereum node'ları JSON-RPC adlı bir standart kullanır. Uygulama bu arayüz üzerinden bakiye sorabilir, bir sözleşmenin view fonksiyonunu çağırabilir, imzalı bir işlemi ağa gönderebilir veya bir işlemin sonucunu öğrenebilir.

**RPC endpoint:** Bu arayüze ulaşmak için kullanılan adrestir (URL). Cüzdanlar ve uygulamalar zincire bu adres üzerinden bağlanır.

**İlişkileri:** RPC isteklerini aslında bir node cevaplar. Herkes kendi node'unu çalıştırıp kendi endpoint'ini kullanabilir ama bu donanım ve bakım gerektirdiği için çoğu uygulama RPC hizmet sağlayıcılarını kullanır. RPC hizmet sağlayıcısı kendi node'larını çalıştıran ve bunlara ulaşmak için endpoint sunan şirkettir. Bu durumda kullanıcı zincirden gelen bilginin doğru olduğu konusunda sağlayıcıya güvenmiş olur.

## 2. Block explorer nedir? Explorer'ın veya bir RPC adresinin kapanması ağın durduğunu gösterir mi?

**Block explorer:** Zincirdeki blokları, işlemleri, adresleri ve sözleşmeleri insanların okuyabileceği şekilde gösteren web sitesidir. Explorer kendi node'larından veya RPC'den aldığı verileri bir veritabanında düzenler ve arama yapılabilir hale getirir. Explorer zincirin kendisi değildir, zincire bakmak için kullanılan bir penceredir. Kendi ağımızı kurarken kullanıyorduk hatırlıyorum buraları.

Explorer'ın veya bir RPC adresinin kapanması ağın durduğunu göstermez. Ağ, birbirinden bağımsız bir sürü node ve validatör tarafından çalıştırılır ve bir web sitesi veya bir endpoint kapandığında bu node'lar çalışmaya devam eder. Sadece o siteyi veya o endpoint'i kullanan kişiler zincire o yoldan ulaşamaz. Başka bir explorer, başka bir RPC adresi veya kendi node'u ile aynı bilgilere ulaşılabilir.

## 3. Event/log ile sözleşmenin güncel state'i nasıl ayrılır? Indexer ne işe yarar?

**Event/log:** Bir işlem çalışırken sözleşmenin "şu oldu" diye bıraktığı kayıttır. Event'ler işlemin makbuzunda (receipt) tutulur ve geçmişte neyin, ne zaman ve hangi adres tarafından yapıldığını gösterir. Event'ler sözleşmeler tarafından okunamaz, sadece zincir dışındaki uygulamalar tarafından okunur ve state'e yazmaktan daha ucuzdur.

**Güncel state:** Sözleşmenin değişkenlerinin şu anki değeridir. Sözleşmenin kendisi ve diğer sözleşmeler tarafından okunabilir ve view fonksiyonlarıyla ücretsiz olarak sorgulanabilir.

Yani event geçmişte ne olduğunu, state ise şu anki durumun ne olduğunu gösterir. Bir değer birden fazla kez değiştiyse state sadece son değeri gösterir, event'ler ise her değişikliğin kaydını tutar.

**Indexer:** Blokları ve event'leri okuyup aranabilir ve sorgulanabilir bir veritabanına dönüştüren servistir. Zincir bir veritabanı gibi sorgulanamadığı için bir adresin bütün işlemlerini veya bir sözleşmenin bütün event'lerini bulmak için her bloğu tek tek okumak gerekir. Indexer bu işi önceden yapar ve uygulamaların bu bilgilere hızlıca ulaşmasını sağlar. Explorer'lar da arka planda bir indexer kullanır.

## Benim yorumum

HALOCLİNE'ı yaparken expolerer kullanıyorduk (ATLAS EXPLORER) ama explorer olmadan bir kaydı kontrol etmek için zincire doğrudan bir RPC endpoint'i üzerinden bağlanmayı araştırırdım. İşlemin hash'i ile `eth_getTransactionReceipt` isteği gönderip makbuzdaki status değerini ve event'leri görebilir, sözleşmenin view fonksiyonlarını `eth_call` ile çağırıp güncel state'i okuyabilirim. Tek bir sağlayıcıya güvenmemek için birden fazla RPC sağlayıcısından aynı bilgiyi kontrol edebilir veya kendi node'umu çalıştırabilirim. Ayrıca aynı ağ için farklı kurumların çalıştırdığı başka explorer'lar da kullanılabilir.

## Kaynaklar
- [ethereum.org – JSON-RPC API](https://ethereum.org/en/developers/docs/apis/json-rpc/)
- [ethereum.org – Nodes as a service](https://ethereum.org/en/developers/docs/nodes-and-clients/nodes-as-a-service/)
- [ethereum.org – Block explorers](https://ethereum.org/en/developers/docs/data-and-analytics/block-explorers/)
- [Solidity Docs – Events](https://docs.soliditylang.org/en/latest/contracts.html#events)
- [The Graph – Dokümantasyon](https://thegraph.com/docs/)
