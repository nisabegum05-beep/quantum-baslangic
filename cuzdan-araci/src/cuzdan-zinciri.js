// CÜZDAN ZİNCİRİ — 8 aşamayı sırayla çağıran tek fonksiyon
// Hesap yapmaz, yalnızca aşamaları birbirine bağlar ve sonuçları tek nesnede toplar.
// Ekrana yazmaz (arayuz.js'in işi). Hiçbir şeyi saklamaz, loglamaz, göndermez. [İP12-3]
//
//   1-entropi        → entropiHex
//   2-mnemonic       → mnemonicKelimeler
//   3-seed           → seedHex
//   4-master-key     → masterKeyXprv (+ kokDugum)
//   5-turetme-yolu   → turetmeYolu (+ hesapDugumu)
//   6-private-key    → privateKeyHex
//   7-public-key     → publicKeyHex
//   8-adres          → adres, adresKontrolTuttu
//
// İŞ PAKETİ : [İP12-2] (sıra), [İP12-4] (her dönüşüm ayrı dosyada, çağrısı başlığında)

import { entropiUret } from "./asamalar/1-entropi.js";
import { entropidenMnemonicUret } from "./asamalar/2-mnemonic.js";
import { mnemonictenSeedUret } from "./asamalar/3-seed.js";
import { seeddenMasterKeyUret } from "./asamalar/4-master-key.js";
import { kokDugumdenHesapDugumuUret } from "./asamalar/5-turetme-yolu.js";
import { hesapDugumundenPrivateKeyAl } from "./asamalar/6-private-key.js";
import { privateKeydenPublicKeyUret } from "./asamalar/7-public-key.js";
import { publicKeydenAdresUret } from "./asamalar/8-adres.js";

// entropiHex verilmezse yeni güvenli entropi üretilir (normal kullanım).
// Verilirse o entropiden devam edilir (testlerde sabit vektör için).
export function cuzdanZinciriniCalistir(entropiHex = entropiUret()) {
  const mnemonicKelimeler = entropidenMnemonicUret(entropiHex);          // Aşama 2
  const seedHex = mnemonictenSeedUret(mnemonicKelimeler);                // Aşama 3
  const { kokDugum, masterKeyXprv } = seeddenMasterKeyUret(seedHex);     // Aşama 4
  const { hesapDugumu, turetmeYolu } = kokDugumdenHesapDugumuUret(kokDugum); // Aşama 5
  const privateKeyHex = hesapDugumundenPrivateKeyAl(hesapDugumu);        // Aşama 6
  const publicKeyHex = privateKeydenPublicKeyUret(privateKeyHex);        // Aşama 7
  const { adres, adresKontrolTuttu } = publicKeydenAdresUret(publicKeyHex); // Aşama 8

  return {
    entropi: entropiHex,
    mnemonic: mnemonicKelimeler,
    seed: seedHex,
    masterKey: masterKeyXprv,
    turetmeYolu,
    privateKey: privateKeyHex,
    publicKey: publicKeyHex,
    adres,
    adresKontrolTuttu,
  };
}

// KELİMELERDEN YENİDEN TÜRETME — kâğıttaki 12 kelimeyle aynı cüzdanı tekrar ekrana getirmek için.
// Sayfa yenilenince değerler silinir (bilerek). Bu fonksiyon kelimelerden entropiye GERİ gider
// (BIP39 tersine çevrilebilir: kelimeler = entropi + checksum) ve zinciri aynı entropiyle baştan çalıştırır.
// Böylece Aşama 1–8 yeniden, aynı değerlerle üretilir. Kelimeler yine yalnızca bellekte kalır.
// KÜTÜPHANE : ethers.Mnemonic.phraseToEntropy(kelimeler) → entropiHex (checksum tutmazsa hata fırlatır)
// İŞ PAKETİ : [İP12-3] (yerel inceleme), [İP13-2] (eşleşme kanıtını yeniden gösterebilme)
import { Mnemonic } from "ethers";

export function kelimelerdenZinciriCalistir(mnemonicKelimeler) {
  const entropiHex = Mnemonic.phraseToEntropy(mnemonicKelimeler.trim());
  return cuzdanZinciriniCalistir(entropiHex);
}
