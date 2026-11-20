// KONUŞAN KARAKTERLER — kedi ve çilek, sırayla bu 10 bilgiyi söyler.
// Her bilgi İP 01–24 boyunca öğrenilen bir kavramdır; parantez içinde ilgili iş paketi.

export const BLOKZINCIR_BILGILERI = [
  "Blokzincir bir defterdir: işlemler bloklara, her blok bir öncekinin hash'ine bağlanır. Geçmişi değiştirmek pratikte imkânsızdır. (İP 01)",
  "Konsensüs, merkezi bir yönetici olmadan bütün node'ların aynı geçmişte anlaşmasını sağlar. Ethereum bunu PoS ile yapar. (İP 02)",
  "12 kelime → seed → anahtar ağacı → private key → public key → adres. Her adım tek yönlüdür; adresten geri gidilemez. (İP 03, İP 12)",
  "Adresini paylaşmak harcama yetkisi vermez. Yetki, private key'in attığı imzadadır. (İP 14)",
  "Kelimelerdeki checksum yalnızca 4 bittir: yanlış kelimelerin 15/16'sını yakalar, 1/16'sı geçer. Geçerli olmak güvenli olmak değildir. (İP 13)",
  "Tx hash imzalandığı anda doğar. Başarının kanıtı hash değil, makbuzdaki status 1'dir. (İP 07, İP 14)",
  "ETH ağın kendi parasıdır; USDC ise bir sözleşmenin içindeki bakiye tablosudur. Token gönderirken bile ücret ETH ile ödenir. (İP 04, İP 15)",
  "Okumak (call) ücretsizdir ve iz bırakmaz. Yazmak (işlem) imza ve gas ister, bloğa girer. (İP 05, İP 20)",
  "require tutmazsa işlem revert olur: state değişmez, ama işlem bloğa girdiyse gas yine ödenir. (İP 16, İP 21)",
  "Aynı kod farklı bir adrese deploy edilince boş bir state'le başlar; kayıtlar koda değil adrese bağlıdır. (İP 05, İP 23)",
];
