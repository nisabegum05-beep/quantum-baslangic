# İP 09: Gerçek Bir Blokzincir Projesini İncele – HALOCLINE

**Amaç:** Kavramları kullanılan bir sistemle ilişkilendirmek.

> Not: İncelediğim proje, Quantum takımı olarak TEKNOFEST 2026 Blokzincir Yarışması'nın "Yüksek Başarımlı ve Ölçeklenebilir DLT Altyapıları" kategorisinde geliştirdiğimiz ve Türkiye üçüncüsü olduğumuz HALOCLINE projesidir. Proje henüz pilot aşamasında olduğu için kamuya açık bir dokümantasyon sitesi yerine takımın proje sunum raporu ve final sunumu kaynak olarak kullanılmıştır. Projede mobil uygulama geliştirmesinde görev aldığım için incelemeyi hem kullanıcı hem geliştirici gözüyle yaptım.

## 1. Proje ve kaynakları

**Proje:** HALOCLINE – küçük ve bağımsız işletmeler için ödeme, sadakat ve işletme yönetimini tek altyapıda birleştiren DLT tabanlı bir platform.

## 2. Hangi problemi, kimler için çözüyor? Zincirde yapılan işlemler ve zincir dışı hizmetler

**Problem:** Küçük işletmeler menü, ödeme, sadakat ve müşteri yönetimini farklı sistemlerden yürütmek zorunda kalıyor. İşletme sahibi ya hazır ama sınırlı bir çözüm ya da pahalı ve bakım gerektiren özel bir sistem arasında seçim yapıyor. İnternet kesildiğinde sipariş ve dijital ödeme akışı durabiliyor. Müşteriler de her işletmede ayrı bir uygulama ve ayrı bir sadakat sistemiyle karşılaşıyor.

**Kimler için:** Dijital sistemlerini kolayca yönetmek isteyen bağımsız ve küçük ölçekli işletmeler, zincirleşirken ortak bir altyapıya ihtiyaç duyan büyüyen yerel markalar ve farklı işletmeleri tek bir uygulamadan kullanmak isteyen müşteriler için.

**Çözüm:** İşletme kendi menüsünü, kampanyalarını, müşteri bakiyelerini ve raporlarını tek bir panelden yönetir. Müşteri farklı işletmeleri tek bir uygulamadan keşfeder, sipariş verir ve ödeme yapar. İnternet bağlantısı olmadığında da HOS cihazı güvenli bir ödeme token'ı ile ödemeyi alır ve bağlantı geri geldiğinde kayıtları senkronize eder. Birden fazla işletme aynı altyapıyı kullanırken her biri kendi ekonomisini bağımsız yönetir.

Sistem üç katmandan oluşur:
- **Cebelitarık:** Kimlik, yetki ve işlem akışını yöneten orkestrasyon katmanıdır.
- **Atlas:** Ekonomik kayıtları tutan izinli (permissioned) DLT ağıdır. Hyperledger Besu üzerinde QBFT konsensüsü ile çalışır ve bloklar üretildiği anda kesinleşir.
- **HOS:** İşletmenin fiziksel kasasını sisteme bağlayan satış noktası yazılımıdır.

**Zincirde (Atlas'ta) yapılanlar:**
- Müşterinin işletmeye özel bakiye (kupon) kayıtları
- Ödeme, yükleme ve bakiye hareketlerinin ekonomik kayıtları
- Protokol event'leri ve kesinleşen bloklar (Atlas Explorer'dan izlenebilir (BİZ YAPTIK YERLİ MİLLİ))
- Validatör setinin yönetimi (Validator Konseyi kararları)

**Zincir dışında yapılanlar:**
- Kullanıcı kimliği, yetkilendirme ve işlem orkestrasyonu (Cebelitarık)
- Mobil uygulama ve işletme paneli (menü, kampanya, raporlar)
- HOS ile fiziksel kasa akışı ve çevrimdışı ödemede geçici token üretimi
- Gerçek TL ödemesinin tahsili: kullanıcı kartla öder, ödemeyi TCMB lisanslı ödeme kuruluşu alır ve para doğrudan işletmenin hesabına geçer.

## 3. Neden blokzincir kullanıyor? Normal bir veritabanıyla yapılsaydı ne değişirdi?

HALOCLINE'da birden fazla bağımsız işletme aynı altyapıyı kullanıyor ve her işletmenin müşteri bakiyeleri o işletmenin ekonomisine ait. Bu kayıtların hiçbir tarafça, platformu işleten Halocline dahil, tek başına değiştirilememesi gerekiyor. Atlas'ta ekonomik kayıtlar validatörlerin ortak onayıyla bloklara yazılıyor ve bloklar kesinleştikten sonra geri alınamıyor. Validator Konseyi validatör ekleyip çıkarabiliyor ama bakiye basamıyor, kullanıcı adına harcama yapamıyor ve işletmenin kasasına dokunamıyor. Atlas Explorer ile kayıtlar herkes tarafından doğrulanabiliyor.

Normal bir veritabanı kullanılsaydı sistem daha basit ve hızlı olurdu ama bütün kayıtlar platformu işleten şirketin kontrolünde olurdu. Şirket bir bakiyeyi değiştirebilir veya silebilir, işletmeler ve müşteriler de kayıtların doğru olduğunu bağımsız olarak kontrol edemezdi. İşletmeler, kendi müşteri ekonomilerini tamamen başka bir şirketin veritabanına emanet etmiş olurdu.

## 4. Kullanıcı kime, hangi konularda güveniyor?

- **Lisanslı ödeme kuruluşuna:** Gerçek TL ödemesinin doğru tahsil edilip işletmeye aktarılması konusunda.
- **İşletmeye:** Yüklenen bakiyenin karşılığında ürünün veya hizmetin verilmesi konusunda. Bakiye sadece o işletmede geçerlidir.
- **Halocline'a (Cebelitarık'a):** Kimlik doğrulama, yetkilendirme ve işlemlerin doğru şekilde zincire iletilmesi konusunda. Zincir dışındaki bu katman doğru çalışmazsa işlem zincire hiç ulaşmayabilir.
- **Validator Konseyi'ne:** Validatör setinin dürüst kurumlardan oluşması konusunda. Kararlar 1 kurum 1 oy ile, 7 kurumdan 5'inin onayıyla ve inceleme, oylama ve bekleme süreleri sonunda alınır, veto hakkı yoktur.
- **HOS cihazına:** İnternet yokken üretilen ödeme token'ının güvenli olması ve bağlantı geldiğinde kayıtların doğru senkronize edilmesi konusunda.

## Benim yorumum

**Güçlü taraf:** Projenin en güçlü tarafı, blokzinciri kullanıcıya hissettirmeden kullanmasıdır. Kullanıcıdan coin, token veya gas ücreti istenmez, gerçek para lisanslı ödeme kuruluşunda kalır ve blokzincir sadece kayıtların değiştirilemez ve doğrulanabilir olması için kullanılır. Bu tasarım hem 6493 sayılı Kanun kapsamında regülasyona uygun bir yapı kurulmasını sağlıyor hem de internet kesildiğinde bile ödeme alınabilmesiyle işletmenin gerçek bir sorununu çözüyor. Üstüne bir öğrencinin bir mahalledeki bütün işletmelere tek bir uygulamadan erişip sipariş yapabilmesi,mobil uygulama fikri gayet kullanışlı.

**Sınırlama:** Atlas izinli bir ağ olduğu ve kimlik ile işlem akışı zincir dışındaki Cebelitarık katmanında yönetildiği için kullanıcılar hala bir operatöre ve Validator Konseyi'ndeki kurumlara güvenmek zorundadır. Yani sistem açık bir blokzincir kadar merkeziyetsiz değildir. Ayrıca proje henüz gerçek bir işletme pilotunda ve ölçekte doğrulanmamıştır ve bu HALOCLINA'a benzer blokzincir kullanılmayan bir versiyon vardır maalesef :(

kaynak:ben
