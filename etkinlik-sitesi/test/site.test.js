// Testler: ayarların ve ABI'nin İP 23 sözleşmesiyle uyumu. Zincire bağlanmaz.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { Interface, isAddress, getAddress } from "ethers";
import { SOZLESME_ADRESI, SEPOLIA_CHAIN_ID, SEPOLIA_CHAIN_ID_HEX, KADINZINCIR_ABI } from "../src/ayarlar.js";

const tamAbi = JSON.parse(readFileSync(new URL("../../etkinlik-sozlesmesi/Kadinzincir_v3.abi.json", import.meta.url)));

test("[İP24-2] sözleşme adresi geçerli ve EIP-55 biçiminde", () => {
  assert.ok(isAddress(SOZLESME_ADRESI));
  assert.equal(getAddress(SOZLESME_ADRESI), SOZLESME_ADRESI);
});

test("[İP24-3] Sepolia chain ID ondalık ve onaltılık hâlleri tutarlı", () => {
  assert.equal(SEPOLIA_CHAIN_ID, 11155111n);
  assert.equal(BigInt(SEPOLIA_CHAIN_ID_HEX), SEPOLIA_CHAIN_ID);
});

test("[İP24-2] okunabilir ABI, derleyicinin ABI'siyle aynı fonksiyon ve event'leri içeriyor", () => {
  const okunabilir = new Interface(KADINZINCIR_ABI);
  const derleyici = new Interface(tamAbi);
  const imzalar = (arayuz) => {
    const liste = [];
    arayuz.forEachFunction((f) => liste.push(`${f.format("sighash")}:${f.selector}`));
    arayuz.forEachEvent((e) => liste.push(`${e.format("sighash")}:${e.topicHash}`));
    return liste.sort();
  };
  assert.deepEqual(imzalar(okunabilir), imzalar(derleyici));
});
