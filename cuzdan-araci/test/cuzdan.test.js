// TESTLER — Node'un yerleşik test aracı (node --test). Ek paket yok.
// Yalnızca resmî test vektörü ve sabit test değerleri kullanılır; gerçek cüzdan değeri YOK.

import { test } from "node:test";
import assert from "node:assert/strict";

import { entropiUret } from "../src/asamalar/1-entropi.js";
import { cuzdanZinciriniCalistir, kelimelerdenZinciriCalistir } from "../src/cuzdan-zinciri.js";
import { resmiVektoruKontrolEt, RESMI_VEKTOR } from "../src/test-vektoru.js";
import {
  mnemonicDogrula, SONUC_GECERLI, SONUC_KELIME_YOK, SONUC_CHECKSUM, SONUC_SAYI,
} from "../src/dogrulama.js";

// Sabit, herkese açık test entropisi (resmî vektörün girdisi)
const SIFIR_ENTROPI = RESMI_VEKTOR.entropi;

test("[İP12-5] resmî BIP39 vektörü (TREZOR passphrase) eşleşir", () => {
  const { eslesti, ayrintilar } = resmiVektoruKontrolEt();
  assert.deepEqual(ayrintilar, { mnemonicEslesti: true, seedEslesti: true, xprvEslesti: true });
  assert.equal(eslesti, true);
});

test("[İP12-1] entropi 0x + 32 hex ve her çağrıda farklı", () => {
  const birinci = entropiUret();
  const ikinci = entropiUret();
  assert.match(birinci, /^0x[0-9a-f]{32}$/);
  assert.notEqual(birinci, ikinci);
});

test("[İP12-2] sabit entropi her seferinde aynı mnemonic ve adresi verir", () => {
  const birinci = cuzdanZinciriniCalistir(SIFIR_ENTROPI);
  const ikinci = cuzdanZinciriniCalistir(SIFIR_ENTROPI);
  assert.equal(birinci.mnemonic, RESMI_VEKTOR.mnemonic); // kelimeler passphrase'e bağlı değil
  assert.equal(birinci.adres, ikinci.adres);
  assert.equal(birinci.seed, ikinci.seed);
});

test("[İP12-2] boş passphrase seed'i TREZOR passphrase seed'inden farklıdır", () => {
  const bosPassphraseIle = cuzdanZinciriniCalistir(SIFIR_ENTROPI);
  assert.notEqual(bosPassphraseIle.seed, RESMI_VEKTOR.seed);
});

test("[İP12-2] biçimler: seed 128 hex, private key 64 hex, public key 0x04 + 128 hex, adres 40 hex, yol", () => {
  const cuzdan = cuzdanZinciriniCalistir(SIFIR_ENTROPI);
  assert.match(cuzdan.seed, /^0x[0-9a-f]{128}$/);
  assert.match(cuzdan.privateKey, /^0x[0-9a-f]{64}$/);
  assert.match(cuzdan.publicKey, /^0x04[0-9a-f]{128}$/);
  assert.match(cuzdan.adres, /^0x[0-9a-fA-F]{40}$/);
  assert.match(cuzdan.masterKey, /^xprv/);
  assert.equal(cuzdan.turetmeYolu, "m/44'/60'/0'/0/0");
});

test("[İP12-4] elle hesaplanan adres ethers.computeAddress ile aynı", () => {
  assert.equal(cuzdanZinciriniCalistir(SIFIR_ENTROPI).adresKontrolTuttu, true);
  assert.equal(cuzdanZinciriniCalistir().adresKontrolTuttu, true);
});

test("[İP13-3] doğrulama kutusu üç sonucu da verir", () => {
  const gecerli = RESMI_VEKTOR.mnemonic;
  assert.equal(mnemonicDogrula(gecerli), SONUC_GECERLI);

  // listede olmayan kelime
  assert.equal(mnemonicDogrula(gecerli.replace("about", "xyzxyz")), SONUC_KELIME_YOK);

  // listede olan ama checksum'ı bozan kelime: "about" → "abandon" (12 × abandon geçersizdir)
  assert.equal(mnemonicDogrula(gecerli.replace("about", "abandon")), SONUC_CHECKSUM);

  // kelime sayısı
  assert.equal(mnemonicDogrula("abandon abandon"), SONUC_SAYI);

  // kopyala-yapıştırdan gelen baş/son boşluk ve satır sonu geçerliliği bozmamalı
  assert.equal(mnemonicDogrula("  " + gecerli + "\n"), SONUC_GECERLI);
});

test("[İP13-2] kelimelerden yeniden türetme aynı adresi verir; bozuk kelimeler hata fırlatır", () => {
  const ilk = cuzdanZinciriniCalistir(SIFIR_ENTROPI);
  const yeniden = kelimelerdenZinciriCalistir(" " + ilk.mnemonic + "\n");
  assert.equal(yeniden.entropi, SIFIR_ENTROPI);
  assert.equal(yeniden.adres, ilk.adres);
  assert.throws(() => kelimelerdenZinciriCalistir(ilk.mnemonic.replace("about", "abandon")));
});
