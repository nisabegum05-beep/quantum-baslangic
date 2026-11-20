// SÖZLEŞME — okuma ve yazma çağrıları. Ekrana yazmaz (o iş arayuz.js'de).

import { Contract, isError } from "ethers";
import { SOZLESME_ADRESI, KADINZINCIR_ABI } from "./ayarlar.js";

export function sozlesmeOlustur(calistirici) {
  // calistirici: okuma için saglayici (provider), yazma için imzalayici (signer)
  return new Contract(SOZLESME_ADRESI, KADINZINCIR_ABI, calistirici);
}

// --- OKUMA (eth_call: ücretsiz, imza yok) [İP24-2] [İP24-4] ---

export async function etkinlikBilgisiOku(sozlesme) {
  const [etkinlikAdi, kapasite, toplamKayit, gorevli] = await Promise.all([
    sozlesme.etkinlikAdi(),
    sozlesme.kapasite(),
    sozlesme.toplamKayit(),
    sozlesme.gorevli(),
  ]);
  return { etkinlikAdi, kapasite, toplamKayit, gorevli };
}

export async function kullaniciDurumuOku(sozlesme, adres) {
  const [kayitli, takmaAd, girisYapti] = await Promise.all([
    sozlesme.kayitliMi(adres),
    sozlesme.takmaAdi(adres),
    sozlesme.girisYaptiMi(adres),
  ]);
  return { kayitli, takmaAd, girisYapti };
}

// --- YAZMA (imzalı işlem) [İP24-4] [İP24-5] ---
// Her çağrı iki aşamalı: (1) MetaMask onayı → tx hash, (2) zincir sonucu → makbuz.
// Aşamaları ayrı bildirmek için iki geri çağırma (callback) alır.

async function islemGonder(gonder, asamalar) {
  asamalar.onayBekleniyor();
  const islem = await gonder();          // kullanıcı Onayla'ya basınca döner; tx hash artık var
  asamalar.zincirBekleniyor(islem.hash);
  const makbuz = await islem.wait();     // bloğa girip makbuz oluşunca döner
  // Başarı makbuzdaki status ile kanıtlanır, hash ile değil (İP 07).
  if (!makbuz || makbuz.status !== 1) {
    throw new Error("İşlem zincirde başarısız oldu (status 0).");
  }
  return makbuz;
}

export function kayitOl(sozlesme, takmaAd, kadinBeyani, gelistiriciBeyani, asamalar) {
  return islemGonder(() => sozlesme.kayitOl(takmaAd, kadinBeyani, gelistiriciBeyani), asamalar);
}

export function girisOnayla(sozlesme, katilimciAdresi, asamalar) {
  return islemGonder(() => sozlesme.girisOnayla(katilimciAdresi), asamalar);
}

// Hataları kullanıcının anlayacağı tek cümleye çevirir.
export function hatayiAcikla(hata) {
  if (isError(hata, "ACTION_REJECTED")) {
    return "İşlemi MetaMask'te reddettin. Hiçbir şey gönderilmedi.";
  }
  // Sözleşmenin require mesajı (gönderimden önceki gas tahmininde ya da zincirde)
  if (hata?.reason) {
    return `Sözleşme reddetti: "${hata.reason}"`;
  }
  if (isError(hata, "INSUFFICIENT_FUNDS")) {
    return "Bu hesapta işlem ücretini karşılayacak kadar Sepolia ETH yok.";
  }
  return hata?.shortMessage || hata?.message || "Bilinmeyen hata.";
}
