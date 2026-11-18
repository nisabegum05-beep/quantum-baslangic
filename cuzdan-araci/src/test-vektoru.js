// RESMÎ BIP39 TEST VEKTÖRÜ — isteğe bağlı doğrulama [İP12-5]
// NE YAPAR   : Resmî BIP39 test vektörlerinin İLKİ ile Aşama 2 ve 3'ü (ve BIP32 kökünü) doğrular.
// KAYNAK     : trezor/python-mnemonic deposu, vectors.json, "english" listesi, 0. vektör.
//              (BIP39 metni test vektörleri için bu depoya yönlendirir.)
// DİKKAT     : Resmî vektörler "TREZOR" passphrase'iyle üretilmiştir.
//              Kullanıcı deneyi (3-seed.js) BOŞ passphrase kullanır. İki ayar birbirinden ayrı tutulur;
//              bu dosya yalnızca "aynı girdi + aynı ayar = aynı sonuç" kontrolü yapar.
// KÜTÜPHANE  : ethers.Mnemonic.fromEntropy(entropi, "TREZOR") → .phrase, .computeSeed()
//              ethers.HDNodeWallet.fromSeed(seed).extendedKey  → xprv (BIP32 kökü)
// ÇIKTI      : { eslesti, ayrintilar }  — "Eşleşti" / "Eşleşmedi" ve alan alan sonuç

import { Mnemonic, HDNodeWallet } from "ethers";

export const RESMI_VEKTOR = {
  kaynak: "trezor/python-mnemonic vectors.json → english[0]",
  passphrase: "TREZOR",
  entropi: "0x00000000000000000000000000000000",
  mnemonic: "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about",
  seed: "0xc55257c360c07c72029aebc1b53c05ed0362ada38ead3e3e9efa3708e53495531f09a6987599d18264c1e1c92f2cf141630c7a3c4ab7c81b2f001698e7463b04",
  xprv: "xprv9s21ZrQH143K3h3fDYiay8mocZ3afhfULfb5GX8kCBdno77K4HiA15Tg23wpbeF1pLfs1c5SPmYHrEpTuuRhxMwvKDwqdKiGJS9XFKzUsAF",
};

export function resmiVektoruKontrolEt() {
  const mnemonicNesnesi = Mnemonic.fromEntropy(RESMI_VEKTOR.entropi, RESMI_VEKTOR.passphrase);
  const uretilenMnemonic = mnemonicNesnesi.phrase;
  const uretilenSeed = mnemonicNesnesi.computeSeed();
  const uretilenXprv = HDNodeWallet.fromSeed(uretilenSeed).extendedKey;

  const ayrintilar = {
    mnemonicEslesti: uretilenMnemonic === RESMI_VEKTOR.mnemonic,
    seedEslesti: uretilenSeed === RESMI_VEKTOR.seed,
    xprvEslesti: uretilenXprv === RESMI_VEKTOR.xprv,
  };
  const eslesti = ayrintilar.mnemonicEslesti && ayrintilar.seedEslesti && ayrintilar.xprvEslesti;
  return { eslesti, ayrintilar };
}
