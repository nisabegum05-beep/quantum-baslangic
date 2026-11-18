// AŞAMA 5 — Türetme yolu (m/44'/60'/0'/0/0)
// NE YAPAR   : Kök düğümden BIP44 yoluyla ilk Ethereum hesabının düğümüne iner.
//              Yolun anlamı:
//                m      → kök (master)
//                44'    → BIP44 standardı (hardened)
//                60'    → coin type: Ethereum (hardened)  [Bitcoin 0']
//                0'     → hesap numarası: ilk hesap (hardened)
//                0      → change: 0 = dış adresler (alma adresleri)
//                0      → adres indeksi: ilk adres. MetaMask'in ikinci hesabı …/0/1 olur.
//              ' işareti hardened türetme: alt anahtar üst public key'den hesaplanamaz.
//              Her adımda HMAC-SHA512(chain code, üst anahtar + indeks) ile bir alt düğüm üretilir.
// GİRDİ      : kokDugum — HDNodeWallet (Aşama 4'ün çıktısı)
// ÇIKTI      : { hesapDugumu, turetmeYolu }
//                hesapDugumu → yolun sonundaki HDNodeWallet
//                turetmeYolu → "m/44'/60'/0'/0/0" metni (ekranda açık gösterilir, gizli değil)
// STANDART   : BIP32 (türetme matematiği), BIP44 (yolun biçimi)
// KÜTÜPHANE  : kokDugum.derivePath("m/44'/60'/0'/0/0")
// İŞ PAKETİ  : [İP12-2]

// MetaMask ve diğer cüzdanlar ilk Ethereum hesabı için bu yolu kullanır.
export const ETHEREUM_ILK_HESAP_YOLU = "m/44'/60'/0'/0/0";

export function kokDugumdenHesapDugumuUret(kokDugum) {
  const hesapDugumu = kokDugum.derivePath(ETHEREUM_ILK_HESAP_YOLU);
  // hesapDugumu.path, ethers'ın kendi tuttuğu yoldur; sabitimizle aynı olmalı.
  const turetmeYolu = hesapDugumu.path;
  return { hesapDugumu, turetmeYolu };
}
