// AŞAMA 7 — Public key (sıkıştırılmamış, 65 bayt)
// NE YAPAR   : Private key'den public key'i hesaplar.
//              secp256k1 eğrisinde: publicKey = privateKey × G  (G: eğrinin sabit başlangıç noktası).
//              Çarpma kolay, geri dönüş (public → private) pratikte imkânsız.
//              Sonuç bir noktadır (x, y). "Sıkıştırılmamış" biçim: 0x04 + x (32 bayt) + y (32 bayt) = 65 bayt.
//              Ethereum adresi bu 65 baytlık biçimden hesaplandığı için compressed=false seçildi.
//              (ethers'ın HDNodeWallet.publicKey alanı 33 baytlık sıkıştırılmış hâli verir; onu kullanmadık.)
// GİRDİ      : privateKeyHex — 0x + 64 hex (Aşama 6'nın çıktısı)
// ÇIKTI      : publicKeyHex — 0x04 ile başlayan 0x + 130 hex karakter (65 bayt)
// STANDART   : secp256k1 (ECDSA eğrisi; Ethereum ve Bitcoin'in ortak eğrisi)
// KÜTÜPHANE  : ethers.SigningKey.computePublicKey(privateKeyHex, false)
// İŞ PAKETİ  : [İP12-2]

import { SigningKey } from "ethers";

const SIKISTIRILMAMIS = false;

export function privateKeydenPublicKeyUret(privateKeyHex) {
  const publicKeyHex = SigningKey.computePublicKey(privateKeyHex, SIKISTIRILMAMIS);
  return publicKeyHex;
}
