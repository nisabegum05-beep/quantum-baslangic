// AŞAMA 8 — Ethereum adresi (EIP-55)
// NE YAPAR   : Public key'den adresi ELLE türetir, sonra ethers'ın hazır fonksiyonuyla karşılaştırır.
//              Adım adım:
//                1. 65 baytlık public key'in başındaki 0x04 önekini at → 64 bayt (x ve y)
//                2. Bu 64 baytın Keccak-256 hash'ini al → 32 bayt
//                3. Son 20 baytı al (bayt 12'den 32'ye) → ham adres (hep küçük harf hex)
//                4. EIP-55: adresin kendi hash'ine göre bazı harfleri büyük yap → checksum'lı adres
//              Kontrol: ethers.computeAddress(publicKey) aynı sonucu vermeli. Verirse
//              "kütüphaneye sormakla" değil, dönüşümü kendimiz yapmakla aynı adrese ulaştık demektir.
// GİRDİ      : publicKeyHex — 0x04… 65 bayt (Aşama 7'nin çıktısı)
// ÇIKTI      : { adres, adresKontrolTuttu }
//                adres            → 0x + 40 hex, EIP-55 büyük/küçük harfli
//                adresKontrolTuttu→ true/false (elle hesaplanan == computeAddress)
// STANDART   : Keccak-256 (adres), EIP-55 (büyük/küçük harf checksum'ı)
// KÜTÜPHANE  : ethers.dataSlice(veri, bas, son) → bayt aralığı kesme
//              ethers.keccak256(veri)           → Keccak-256 hash
//              ethers.getAddress(hamAdres)      → EIP-55 checksum'lı adres
//              ethers.computeAddress(publicKey) → kontrol için hazır fonksiyon
// İŞ PAKETİ  : [İP12-2], [İP12-4]

import { dataSlice, keccak256, getAddress, computeAddress } from "ethers";

export function publicKeydenAdresUret(publicKeyHex) {
  // 1. 0x04 önekini at: 1. bayttan itibaren al (65 → 64 bayt)
  const koordinatBaytlari = dataSlice(publicKeyHex, 1);

  // 2. Keccak-256 (SHA-3'ün Ethereum'da kullanılan hâli; 32 bayt üretir)
  const hashHex = keccak256(koordinatBaytlari);

  // 3. 32 baytın son 20 baytı: 12. bayttan sona kadar
  const hamAdresHex = dataSlice(hashHex, 12);

  // 4. EIP-55: harf hatalarını yakalayan büyük/küçük harf düzeni
  const adres = getAddress(hamAdresHex);

  // Kontrol: ethers'ın tek satırlık hazır yolu aynı adresi veriyor mu?
  const kutuphaneAdresi = computeAddress(publicKeyHex);
  const adresKontrolTuttu = adres === kutuphaneAdresi;

  return { adres, adresKontrolTuttu };
}
