// AŞAMA 3 — Seed (512 bit)
// NE YAPAR   : 12 kelimeyi 512 bitlik seed'e çevirir.
//              BIP39 kuralı: PBKDF2-HMAC-SHA512, 2048 tur,
//              şifre = kelimeler, tuz (salt) = "mnemonic" + passphrase.
//              Bu deneyde passphrase BOŞ ("") → tuz yalnızca "mnemonic".
// GİRDİ      : mnemonicKelimeler — 12 kelimelik metin (Aşama 2'nin çıktısı)
// ÇIKTI      : seedHex — 0x ile başlayan 128 hex karakter (64 bayt = 512 bit)
// STANDART   : BIP39
// KÜTÜPHANE  : ethers.Mnemonic.fromPhrase(kelimeler, "")  → Mnemonic nesnesi (passphrase boş)
//              nesne.computeSeed()                         → seed (hex metin)
// İŞ PAKETİ  : [İP12-2]  (passphrase boş kabul edilir)

import { Mnemonic } from "ethers";

// İş paketi gereği passphrase boş. Resmî test vektöründe "TREZOR"dur; o ayrı dosyada (test-vektoru.js).
const BOS_PASSPHRASE = "";

export function mnemonictenSeedUret(mnemonicKelimeler) {
  // fromPhrase önce kelimeleri ve checksum'ı doğrular; bozuksa hata fırlatır.
  const mnemonicNesnesi = Mnemonic.fromPhrase(mnemonicKelimeler, BOS_PASSPHRASE);
  const seedHex = mnemonicNesnesi.computeSeed();
  return seedHex;
}
