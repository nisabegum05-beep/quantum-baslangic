# İP 02: Node ve Konsensüs

**Amaç:** Ağdaki rollerin ve uzlaşmanın görevini kavramak.

## 1. Node ve validator nedir? Her node blok üretir mi?

Node, blokzincir yazılımını çalıştıran, verilerin bir kopyasını tutan ve gelen işlemleri ve blokları kurallara göre kontrol eden bilgisayardır. Bir sürü node olabilir, blokzincirin temeli bir sürü node'dan oluşur.

Validatör normal node'lardan daha yetkili bir node'dur, konsensüs kurallarına göre blok yazabilir ve diğer validatörlerin önerdiği bloklara oy verir. Ethereum'da validatör olmak için 32 ETH teminat (stake) kilitlemek gerekir.

Her node blok üretmez. Bütün node'lar blokları kontrol eder ama sadece validatörler blok üretir.

## 2. Konsensüs neyi sağlar? PoW ve PoS'un temel yaklaşımları nasıl farklılaşır?

Konsensüs ağın kanunlarıdır, yeni bir bloğun hangi kurallarla yazılacağını belirler. Merkezde bir yönetici olmadan, birbirini tanımayan ve aralarında kötü niyetli olanlar da bulunabilen node'ların aynı geçmişte anlaşmasını sağlar. Sıradaki bloğu kimin üreteceğine ve zincir ikiye ayrılırsa hangi dalın geçerli olacağına karar verir. Böylece aynı paranın iki kere harcanması engellenir.

**PoW (Proof of Work):** Bitcoin'de kullanılan, madencilik (mining) ve işlem gücü temelli, enerji açısından verimsiz bir konsensüstür. Madenciler bloğun hash'i belirli bir hedefin altına düşene kadar "nonce" adlı sayıyı değiştirerek sürekli deneme yapar. Bulmacayı ilk çözen madenci bloğu üretir ve ödül alır. Bulmacayı çözmek çok enerji harcatır ama çözümün doğru olup olmadığını kontrol etmek kolaydır. Güvenliği harcanan enerjiden gelir, geçmişi değiştirmek için ağın işlem gücünün yarısından fazlasını ele geçirmek gerekir (%51 saldırısı).

**PoS (Proof of Stake):** Ethereum'da kullanılan, "parayı veren düdüğü çalar" mantığında bir konsensüstür. Validatörler teminat olarak para kilitler ve blok üretecek validatör, kilitlenen miktara göre ağırlıklı olarak rastgele seçilir. Kurallara aykırı davranan validatörün kilitlediği paranın bir kısmı veya tamamı kesilir (slashing). Güvenliği kilitlenen paradan gelir ve PoW'a göre enerji açısından çok daha verimlidir. Ethereum 2022'de "The Merge" ile PoW'dan PoS'a geçmiştir.

## 3. Public/private ve permissionless/permissioned ağ kavramları hangi özellikleri anlatır?

Bu iki kavram çifti farklı izinleri anlatır. Public/private ağın okuma iznini anlatır, yani verileri herkes okuyabiliyor mu ona bakar. Permissionless/permissioned ise katılım iznini anlatır, yani ağa herkes işlem gönderebiliyor mu ve herkes validatör olabiliyor mu ona bakar.

Bu yüzden üç izin ayrı ayrı düşünülmelidir:
- **Okuma izni:** Public ağda herkes verileri okuyabilir, private ağda sadece izin verilenler okuyabilir.
- **İşlem gönderme izni:** Permissionless ağda herkes işlem gönderebilir, permissioned ağda sadece izin verilenler gönderebilir.
- **Validatör olma izni:** Permissionless ağda kurallara uyan herkes validatör olabilir, permissioned ağda sadece seçilmiş taraflar validatör olabilir.

Bu izinler birbirinden bağımsız olabilir. Bir ağ herkesin okuyabildiği ve işlem gönderebildiği bir public ağ olup aynı zamanda sadece seçilmiş tarafların validatör olabildiği bir ağ olabilir.

## 4. İşlemin bloğa alınması, başarılı çalışması ve kesinleşmesi neden farklıdır?

Bu üç aşama birbirinden farklıdır:
- **Bloğa alınma:** İşlemin bir bloğa girmesidir.
- **Başarılı çalışma:** Bloğa giren işlem başarısız da olabilir. Sözleşme işlemi reddederse (revert) işlem yine blokta yer alır ve gas ücreti yine ödenir ama state değişmez. İşlemin başarılı olup olmadığı işlem makbuzundaki (receipt) status değerinden anlaşılır, 1 başarılı, 0 başarısız demektir.
- **Kesinleşme:** Blok kesinleşene kadar zincirde bir ayrılma olursa geri alınabilir. Kesinleştikten sonra artık geri alınamaz. Ethereum'da bir blok yaklaşık 13 dakika sonra kesinleşir.

Yani bir işlemin blokta olması, işlemin başarılı olduğu veya kalıcı olduğu anlamına gelmez.

## Benim yorumum

Tek bir node kapanınca bütün ağın durup durmayacağı o node'un rolüne bağlıdır. Eğer kapanan node tek validatörse sıkıntıdır çünkü blok üretecek başka kimse kalmaz ve ağ durur. Ağda bir sürü validatör varsa diğerleri blok üretmeye devam eder ve ağ çalışır. Ama validatörlerin çoğu aynı anda kapanırsa konsensüs için gereken çoğunluk sağlanamaz ve ağ yine sıkıntı yaşar. Ayrıca kapanan node benim ağa bağlanmak için kullandığım node ise ağ çalışmaya devam eder ama ben ağa ulaşamam.

## Kaynaklar
- Usta, A. & Doğantekin, S. *Blockchain 101 v2* – "Blockchain Türleri", Bölüm 2.2
- Sert, T. *Sorularla Blockchain* – "Bizans generallerinin problemi ne?", "Uzlaşma mekanizmaları neler?"
- [ethereum.org – Nodes and clients](https://ethereum.org/en/developers/docs/nodes-and-clients/)
- [ethereum.org – Proof-of-stake](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/)
- [ethereum.org – The Merge](https://ethereum.org/en/roadmap/merge/)

