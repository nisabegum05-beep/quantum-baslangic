# İP 07: Bir İşlemin Yolculuğu

**Amaç:** İmza ile zincirdeki sonuç arasındaki aşamaları anlamak.

## 1. Cüzdan bağlamak, mesaj imzalamak ve işlem göndermek hangi farklı işlemlerdir?

**Cüzdan bağlamak:** Uygulamanın kullanıcının adresini görmesine izin vermektir. İmza atılmaz, ücret ödenmez ve zincire hiçbir şey yazılmaz. Uygulama sadece adresi okuyabilir, kullanıcı adına bir şey yapamaz.

**Mesaj imzalamak:** Kullanıcının private key'i ile bir mesajı imzalamasıdır. Genelde "bu adres gerçekten benim" demek için kullanılır. Zincir dışında olur, bloğa girmez ve gas ücreti ödenmez. Ama bazı imzalar (izin veren imzalar) kullanıcının token'larını harcama yetkisi verebildiği için ne imzalandığı mutlaka okunmalıdır.

**İşlem göndermek:** Kullanıcının imzaladığı bir işlemin ağa gönderilmesidir. Gas ücreti ödenir, işlem bir bloğa girer ve state değişir. Para göndermek, sözleşmeye kayıt olmak veya sözleşme deploy etmek bu türdendir.



## 2. Gas limit, gas used, işlem ücreti, nonce ve chain ID ne işe yarar?

**Gas limit:** İşlemi gönderen kişinin "bu işlem en fazla bu kadar gas harcayabilir" diye koyduğu sınırdır. İşlem bu sınıra ulaşırsa yarıda kesilir, yapılan değişiklikler geri alınır ama harcanan gas geri gelmez.Dolandırıldık laaaaa

**Gas used:** İşlemin çalışırken gerçekten harcadığı gas miktarıdır. Gas limitten küçük veya ona eşittir.

**İşlem ücreti:** Gas used ile gas fiyatının çarpımıdır ve ETH ile ödenir. Gas fiyatı ağın yoğunluğuna göre belirlenen base fee ile validatöre verilen priority fee'den oluşur.

**Nonce:** Bir hesabın gönderdiği kaçıncı işlem olduğunu gösteren sayaçtır ve 0'dan başlar. İşlemlerin sırasını belirler ve aynı işlemin ikinci kez kullanılmasını engeller. Aynı nonce ile daha yüksek ücretli yeni bir işlem gönderilirse bekleyen eski işlemin yerine geçer.

**Chain ID:** İşlemin hangi ağ için hazırlandığını gösteren sayıdır (Ethereum mainnet 1, Sepolia 11155111). Chain ID imzaya dahil edildiği için bir ağ için imzalanan işlem başka bir ağda kullanılamaz.

## 3. Txid/transaction hash, sözleşme adresi ve block hash neyi tanımlar?

**Transaction hash (txid):** Bir işlemin benzersiz kimliğidir. İmzalanmış işlemin hash'idir ve işlem explorer'da bu hash ile aranır.

**Sözleşme adresi:** Bir akıllı sözleşmenin zincirde bulunduğu adrestir. Sözleşme deploy edildiğinde oluşur ve sözleşmeyle işlem yapmak için bu adres kullanılır.

**Block hash:** Bir bloğun benzersiz kimliğidir. Bloğun başlığının hash'idir ve bir sonraki blok bu hash'i tutarak zincire bağlanır.

Yani transaction hash bir işlemi, sözleşme adresi bir sözleşmeyi, block hash de bir bloğu tanımlar.

## 4. Pending, receipt ve status nedir? İşlem hash'i neden tek başına başarı kanıtı değildir?

**Pending:** İşlemin ağa gönderildiği ama henüz bir bloğa girmediği bekleme durumudur.

**Receipt (makbuz):** İşlem bir bloğa girdikten sonra oluşan sonuç belgesidir. İçinde işlemin hangi blokta olduğu, ne kadar gas harcadığı, yayımlanan event'ler ve status bilgisi bulunur.

**Status:** İşlemin başarılı olup olmadığını gösterir. 1 başarılı, 0 başarısız demektir. Status 0 olan bir işlem de bloğa girmiş ve gas ücretini ödemiştir ama state değişmemiştir.

İşlem hash'i tek başına başarı kanıtı değildir çünkü hash işlem imzalandığı anda oluşur. Hash'i olan bir işlem hala bekliyor olabilir, hiç bloğa girmeden düşmüş olabilir, aynı nonce ile gönderilen başka bir işlem onun yerine geçmiş olabilir veya bloğa girip başarısız olmuş olabilir. Başarının kanıtı makbuzdaki status değerinin 1 olmasıdır. Ayrıca blok kesinleşene kadar işlem teorik olarak geri alınabilir.

## 5. Akış şeması

    A[Uygulama işlemi hazırlar] --> B{Kullanıcı cüzdanda onaylıyor mu?}
    B -- Reddetti --> X1[İşlem oluşmadı · tx hash yok]
    B -- Onayladı --> C{Cüzdan ön kontrolü geçti mi?}
    C -- Hata --> X2[Gönderilmedi · tx hash yok]
    C -- Geçti --> D[İmzalandı ve gönderildi · tx hash oluştu]
    D --> E[Pending · bloğa girmeyi bekliyor]
    E -- Düştü / yerine başka işlem geçti --> X3[Bloğa girmedi]
    E -- Bağlantı koptu --> X4[Sonuç bilinmiyor · hash ile tekrar kontrol et]
    E --> F[Bloğa alındı · receipt oluştu]
    F --> G{Receipt status?}
    G -- 0 --> X5[Başarısız · revert · gas ödendi · state değişmedi]
    G -- 1 --> H[Başarılı · state değişti · event yayımlandı]
    H --> I[Kesinleşti · finalized]


> Bu şema İP 17'de kendi kayıt işlemimin tx hash'i ile güncellenecektir.

## Benim yorumum

"İşlem başarısız" ile "sonucunu öğrenemedim" farklıdır çünkü birincisi kesin bir bilgi, ikincisi ise bilginin olmamasıdır. İşlem başarısız dendiğinde işlem bloğa girmiştir ve makbuzdaki status değeri 0'dır, yani sonuç bellidir. Sonucunu öğrenemedim dendiğinde ise bağlantı kopmuş veya işlem hala bekliyor olabilir ve işlem aslında başarılı da olmuş olabilir. Bu iki durum karıştırılırsa kullanıcı aynı işlemi tekrar gönderebilir ve iki kere ödeme yapmış veya iki kere kayıt olmaya çalışmış olur. Bu yüzden sonuç bilinmiyorsa önce mevcut tx hash ile tekrar kontrol edilmeli, otomatik olarak yeni işlem gönderilmemelidir.

## Kaynaklar
- [ethereum.org – Transactions](https://ethereum.org/en/developers/docs/transactions/)
- [ethereum.org – Gas and fees](https://ethereum.org/en/developers/docs/gas/)
- [ethereum.org – Accounts (nonce)](https://ethereum.org/en/developers/docs/accounts/)
- [EIP-155 – Chain ID](https://eips.ethereum.org/EIPS/eip-155)
- [EIP-1559 – Fee market](https://eips.ethereum.org/EIPS/eip-1559)
- Antonopoulos, A. M. & Wood, G. *Mastering Ethereum* – Bölüm 6 (Transactions)
