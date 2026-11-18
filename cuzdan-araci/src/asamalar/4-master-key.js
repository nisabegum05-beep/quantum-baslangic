// AŞAMA 4 — Master key (anahtar ağacının kökü)
// NE YAPAR   : 512 bit seed'den BIP32 anahtar ağacının kök düğümünü üretir.
//              BIP32 kuralı: HMAC-SHA512(anahtar="Bitcoin seed", veri=seed) → 64 bayt.
//              Sol 32 bayt = master private key, sağ 32 bayt = chain code.
//              Bu ikisi birlikte "extended private key" (xprv) olarak gösterilir.
//              xprv'den ağaçtaki BÜTÜN alt anahtarlar türetilebilir → en gizli değerlerden biri.
// GİRDİ      : seedHex — 0x + 128 hex (Aşama 3'ün çıktısı)
// ÇIKTI      : { kokDugum, masterKeyXprv }
//                kokDugum      → HDNodeWallet nesnesi (sonraki aşama bunun üzerinde çalışır)
//                masterKeyXprv → "xprv" ile başlayan Base58 metin (ekranda gizli gösterilecek)
// STANDART   : BIP32
// KÜTÜPHANE  : ethers.HDNodeWallet.fromSeed(seedHex)  → kök düğüm (path "m", depth 0)
//              kokDugum.extendedKey                  → xprv metni
// İŞ PAKETİ  : [İP12-2]

import { HDNodeWallet } from "ethers";

export function seeddenMasterKeyUret(seedHex) {
  const kokDugum = HDNodeWallet.fromSeed(seedHex);
  const masterKeyXprv = kokDugum.extendedKey;
  return { kokDugum, masterKeyXprv };
}
