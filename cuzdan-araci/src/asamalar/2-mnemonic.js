// AŞAMA 2 — Mnemonic (12 kelime)
// NE YAPAR   : 128 bit entropiyi 12 İngilizce kelimeye çevirir.
//              Adım adım: entropinin SHA-256 hash'inin ilk 4 biti checksum olarak
//              entropinin sonuna eklenir (128 + 4 = 132 bit). 132 bit, 11'er bitlik
//              12 parçaya bölünür. Her parça 0–2047 arası bir sayıdır ve BIP39'un
//              2048 kelimelik İngilizce listesinden o sıradaki kelimeyi seçer.
// GİRDİ      : entropiHex — 0x ile başlayan 32 hex karakter (Aşama 1'in çıktısı)
// ÇIKTI      : 12 kelimenin tek boşlukla ayrılmış metni
// STANDART   : BIP39
// KÜTÜPHANE  : ethers.Mnemonic.fromEntropy(entropiHex)  → Mnemonic nesnesi
//              nesne.phrase                              → kelimeler (metin)
//              (passphrase verilmedi → boş kabul edilir, wordlist verilmedi → İngilizce)
// İŞ PAKETİ  : [İP12-2]

import { Mnemonic } from "ethers";

export function entropidenMnemonicUret(entropiHex) {
  // fromEntropy checksum'ı hesaplar, bitleri böler ve kelimeleri listeden seçer.
  const mnemonicNesnesi = Mnemonic.fromEntropy(entropiHex);
  const mnemonicKelimeler = mnemonicNesnesi.phrase;
  return mnemonicKelimeler;
}
