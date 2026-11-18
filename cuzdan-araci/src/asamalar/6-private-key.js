// AŞAMA 6 — Private key (256 bit)
// NE YAPAR   : Yolun sonundaki düğümün gizli anahtarını alır.
//              Bu 32 baytlık sayı hesabın harcama yetkisinin tamamıdır:
//              işlemleri imzalayan şey budur. Bilen herkes hesabı kontrol eder.
// GİRDİ      : hesapDugumu — HDNodeWallet (Aşama 5'in çıktısı)
// ÇIKTI      : privateKeyHex — 0x + 64 hex karakter (32 bayt)
// STANDART   : BIP32 (düğümün private key'i), secp256k1 (sayının aralığı)
// KÜTÜPHANE  : hesapDugumu.privateKey
// İŞ PAKETİ  : [İP12-2]

export function hesapDugumundenPrivateKeyAl(hesapDugumu) {
  const privateKeyHex = hesapDugumu.privateKey;
  return privateKeyHex;
}
