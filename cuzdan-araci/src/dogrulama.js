// MNEMONIC DOĞRULAMA KUTUSU — İP 13 checksum deneyi için
// NE YAPAR   : Kullanıcının yazdığı kelimeleri üç sonuçtan biriyle değerlendirir:
//                "Geçerli (checksum tuttu)"
//                "Geçersiz — kelime listede yok"
//                "Geçersiz — checksum tutmadı"
//              Önce her kelime 2048'lik listede aranır; biri yoksa ikinci sonuç.
//              Hepsi listedeyse BIP39 checksum'ı (son kelimedeki 4 bit) kontrol edilir.
//              Checksum 4 bit olduğu için listede olan yanlış bir kelime ~1/16 olasılıkla geçer. [İP13-3]
// GİRDİ      : kelimeMetni — kullanıcının yazdığı metin
// ÇIKTI      : sonuç metni (yukarıdaki üçünden biri) veya kelime sayısı uyarısı
// STANDART   : BIP39
// KÜTÜPHANE  : ethers.wordlists.en.split(metin)        → kelimelere ayır (küçük harf, boşluk temizliği)
//              ethers.wordlists.en.getWordIndex(kelime) → listede yoksa -1
//              ethers.Mnemonic.isValidMnemonic(metin)   → liste + uzunluk + checksum kontrolü
// GÜVENLİK   : Yazılan kelimeler hiçbir yere gönderilmez, saklanmaz, loglanmaz.
// İŞ PAKETİ  : [İP13-3]

import { Mnemonic, wordlists } from "ethers";

export const SONUC_GECERLI = "Geçerli (checksum tuttu)";
export const SONUC_KELIME_YOK = "Geçersiz — kelime listede yok";
export const SONUC_CHECKSUM = "Geçersiz — checksum tutmadı";
export const SONUC_SAYI = "Geçersiz — 12 kelime bekleniyor";

const ingilizceListe = wordlists.en;

export function mnemonicDogrula(kelimeMetni) {
  // trim: kopyala-yapıştırla gelen baş/son boşluk ve satır sonu, split'te boş parça üretip
  // kelime sayısını yanlış saydırıyordu. Önce kırpılır, sonra kelimelere ayrılır.
  const kelimeler = ingilizceListe.split(kelimeMetni.trim());

  if (kelimeler.length !== 12) {
    return SONUC_SAYI;
  }

  // 1. Her kelime listede var mı?
  const listedeOlmayanVar = kelimeler.some((kelime) => ingilizceListe.getWordIndex(kelime) === -1);
  if (listedeOlmayanVar) {
    return SONUC_KELIME_YOK;
  }

  // 2. Hepsi listede: geriye yalnızca checksum kalır.
  const gecerliMi = Mnemonic.isValidMnemonic(kelimeler.join(" "), ingilizceListe);
  return gecerliMi ? SONUC_GECERLI : SONUC_CHECKSUM;
}
