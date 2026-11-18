// AŞAMA 1 — Entropi
// NE YAPAR   : Kriptografik olarak güvenli 16 bayt (128 bit) rastgele veri üretir.
// GİRDİ      : Yok.
// ÇIKTI      : 0x ile başlayan 32 karakterlik hex metin (örn. biçim: 0x + 32 hex).
// STANDART   : BIP39 (128 bit entropi → 12 kelime için gereken giriş boyutu)
// KÜTÜPHANE  : ethers.randomBytes(16)  (tarayıcıda crypto.getRandomValues'i çağırır)
//              ethers.hexlify(baytlar)  (Uint8Array'i 0x'li hex metne çevirir)
// İŞ PAKETİ  : [İP12-1]

import { randomBytes, hexlify } from "ethers";

// 12 kelimelik mnemonic için BIP39'un istediği entropi boyutu: 128 bit = 16 bayt
const ENTROPI_BAYT_SAYISI = 16;

export function entropiUret() {
  // Math.random KULLANILMAZ: tahmin edilebilir sayı üretir, cüzdan güvensiz olur.
  // randomBytes işletim sisteminin güvenli rastgelelik kaynağını kullanır.
  const entropiBaytlari = randomBytes(ENTROPI_BAYT_SAYISI);
  const entropiHex = hexlify(entropiBaytlari);
  return entropiHex;
}
