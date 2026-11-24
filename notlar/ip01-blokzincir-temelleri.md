# İP 01: Blokzincir ve Ortak Kayıt

**Amaç:** Teknolojinin hangi probleme cevap verdiğini anlamak.

## 1. Blokzincir, işlem, blok ve dağıtık defter nedir? Birbirleriyle nasıl ilişkilidir?

**Blokzincir:** Bir DLT teknolojisidir. Sisteme giren verilerin, Node adı verilen bilgisayarlarda dünyanın her bir yanında aynı anda tutulabilen verilerin toplamıdır. Blokzincir blok olarak adlandırılmış işlemlerin paketlenmiş halinden oluşur, bloklar bir önceki bloğun parmak izini (hashini) tutar ve böylelikle önceki bir işlemde yapılan değişiklik tutulan hashi bozar, bu yüzden geçmişi değiştirmek pratikte neredeyse imkansızdır.

**İşlem:** Deftere eklenmek istenen ve sahibi tarafından dijital olarak imzalanan tek bir değişikliktir.

**Blok:** İşlemlerin paketlenmiş halidir. İçinde işlemler, zaman bilgisi ve bir önceki bloğun hashi bulunur.

**Dağıtık defter:** Aynı defterin bir sürü bilgisayarda aynı anda tutulmasıdır. Bu bilgisayarlar hangi kaydın doğru olduğuna ortak kurallarla (konsensüs) karar verir.

**İlişkileri:** İşlemler bloklara paketlenir, bloklar hash ile birbirine bağlanıp blokzinciri oluşturur, blokzincir de dağıtık defter olarak bir sürü Node'da tutulur.

## 2. Merkezi veritabanıyla blokzincir arasında kayıt kontrolü ve güven açısından ne fark vardır?

Merkezi veritabanı verileri tek bir merkeze bağlı tutar, kontroller ve yeni işlem eklemesi tek bir defter üzerindendir ve bu defterin başına bir şey gelirse tüm verilerin başına bir şey gelir. Ayrıca merkezi veritabanında yönetici kayıtları değiştirebilir veya silebilir ve kullanıcı bu kuruma güvenmek zorundadır.

Blokzincirde öyle değildir. Blokzincir teknolojisinde veri aynı anda bir sürü defter tarafından tutulur ve verilere karşı bir saldırı gerçekleşse bile ağın çoğunluğuna aynı anda saldırı yapmak gerekir. Tek bir yönetici yoktur, geçmiş kayıtlara sadece ekleme yapılabilir ve kurallar kodda yazılıdır. Bu yüzden blokzincirde güven tamamen ortadan kalkmaz, kurumdan sisteme ve ağın çoğunluğuna kayar.

## 3. Geçmiş işlemin kaydı ile sözleşmede tutulan güncel değerin değişmesi nasıl ayrılır?

Geçmiş işlemler bir kere zincire yazıldıktan sonra değiştirilemez ve silinemez. Sözleşmede tutulan güncel değer (state) ise değişebilir ama sadece yeni bir işlem ile değişir ve bu yeni işlem de geçmişe eklenir. Yani blokzincirde değişmeyen şey güncel değerler değil, geçmiş kayıtlardır.

## 4. Bir etkinlik kayıt sisteminde blokzincir kullanmanın yararı ve ek maliyeti ne olabilir?

**Yararı:** Etkinliğe erişimi olmayan kişiler tek bir kayıt defterine manipülasyon yaparak giremez çünkü veri bir sürü yerde tutulur. Ayrıca organizatör bile kayıtları tek başına silemez veya değiştiremez ve katılımcı kendi kaydını kendisi kontrol edebilir.

**Maliyeti:** Her kayıt için işlem ücreti (gas) ödenir, katılımcıların cüzdan kullanmak zorunda olması gerekir, işlemlerin onaylanması zaman alır, veriler herkese açık olur ve yanlış bir kayıt sonradan düzeltilemez. Etkinlik küçük ise merkezi sistem de gayet uygundur.

## Benim yorumum
Bir proje her zaman blokzincire ihtiyaç duymayabilir. Blokzincir kullanılıp kullanılmayacağına karar vermek için genelde şu üç temel soru sorulmalıdır:

1. **Veriyi yazan veya değiştiren birden fazla taraf var mı?** Veriyi tek bir taraf yazıyorsa blokzincire gerek yoktur.
2. **Bu taraflar arasında güven sorunu var mı?** Taraflar birbirine zaten güveniyorsa normal veritabanı yeterlidir.
3. **Bu sorun tek bir merkezle de çözülebilir mi?** Herkesin güvendiği bir merkez varsa ve bu merkez işi görüyorsa blokzincirin ek maliyetine gerek yoktur.

Bu sorulardan birine "hayır" cevabı çıkıyorsa normal veritabanını tercih ederdim. Ayrıca verilerin gizli kalması veya yanlış kayıtların düzeltilebilmesi gerekiyorsa da normal veritabanı daha uygundur. Blokzinciri ise birbirine güvenmeyen birden fazla tarafın aynı kaydı tutması gerektiğinde ve ortada herkesin güvendiği bir merkez olmadığında kullanırdım.
## Kaynaklar
- Usta, A. & Doğantekin, S. *Blockchain 101 v2* – Bölüm 1.2
- Sert, T. *Sorularla Blockchain*
- Nakamoto, S. (2008). *Bitcoin: A Peer-to-Peer Electronic Cash System*
- [ethereum.org – Intro to Ethereum](https://ethereum.org/en/developers/docs/intro-to-ethereum/)
- Wüst, K. & Gervais, A. (2018). *Do you need a Blockchain?*
