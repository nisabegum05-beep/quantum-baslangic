// ARAYÜZ — düğmeler ve ekrana yazma. Hesap mantığı cuzdan.js ve sozlesme.js'de.
// Bu sayfa private key / kurtarma kelimesi istemez; İP 12 cüzdan aracına hiçbir veri aktarmaz. [İP24-6] [İP24-7]

import { isAddress } from "ethers";
import { SOZLESME_ADRESI, ETHERSCAN } from "./ayarlar.js";
import { BLOKZINCIR_BILGILERI } from "./bilgiler.js";
import { metamaskVarMi, cuzdanBagla, sepoliaMi, sepoliayaGecIste, degisiklikleriDinle } from "./cuzdan.js";
import {
  sozlesmeOlustur, etkinlikBilgisiOku, kullaniciDurumuOku, kayitOl, girisOnayla, hatayiAcikla,
} from "./sozlesme.js";

const $ = (id) => document.getElementById(id);

let baglanti = null;        // { saglayici, imzalayici, adres, chainId }
let gorevliAdresi = null;
let islemSuruyor = false;

// ---------- yardımcılar ----------

function evetHayir(deger) { return deger ? "Evet" : "Hayır"; }

function islemDurumuYaz(metin, durum) {
  $("islem-durumu").textContent = metin;
  $("islem-durumu").dataset.durum = durum;
}

function islemBaglantisiGoster(hash) {
  const baglantiOgesi = $("islem-baglantisi");
  baglantiOgesi.href = `${ETHERSCAN}/tx/${hash}`;
  baglantiOgesi.hidden = false;
}

function gondermeDugmeleriniAyarla() {
  const gonderilebilir = baglanti !== null && sepoliaMi(baglanti.chainId) && !islemSuruyor;
  $("kayit-ol-dugmesi").disabled = !gonderilebilir;
  $("giris-onayla-dugmesi").disabled = !gonderilebilir;
}

// ---------- okuma ----------

async function bilgileriYenile() {
  if (!baglanti || !sepoliaMi(baglanti.chainId)) return;
  const okuma = sozlesmeOlustur(baglanti.saglayici);

  const bilgi = await etkinlikBilgisiOku(okuma);
  gorevliAdresi = bilgi.gorevli;
  // Sayfa başlığı sabit ("Geliştirici Kadınlar Etkinliği"); sözleşmedeki ad aşağıdaki satırda gösterilir. [İP24-2]
  $("bilgi-etkinlik-adi").textContent = bilgi.etkinlikAdi;
  $("bilgi-kapasite").textContent = bilgi.kapasite.toString();
  $("bilgi-toplam-kayit").textContent = bilgi.toplamKayit.toString();
  $("bilgi-gorevli").textContent = bilgi.gorevli;

  const durum = await kullaniciDurumuOku(okuma, baglanti.adres);
  $("durum-kayitli").textContent = evetHayir(durum.kayitli);
  $("durum-takma-ad").textContent = durum.takmaAd || "—";
  $("durum-giris").textContent = evetHayir(durum.girisYapti);

  const benGorevliyim = baglanti.adres.toLowerCase() === bilgi.gorevli.toLowerCase();
  $("gorevli-mi-notu").textContent = benGorevliyim
    ? "Bağlı hesap görevli."
    : "Bağlı hesap görevli değil. Onay denemesi sözleşmede reddedilir.";
}

// ---------- bağlantı ----------

async function baglanVeGoster() {
  baglanti = await cuzdanBagla();
  $("bagli-adres").textContent = baglanti.adres;
  const dogruAg = sepoliaMi(baglanti.chainId);
  $("ag-durumu").textContent = dogruAg ? "Sepolia (11155111)" : `Yanlış ağ (chain ID ${baglanti.chainId})`;
  $("yanlis-ag-uyarisi").hidden = dogruAg;
  gondermeDugmeleriniAyarla();
  if (dogruAg) await bilgileriYenile();
}

// ---------- işlem gönderme ----------

async function islemYap(gonder) {
  if (!baglanti || !sepoliaMi(baglanti.chainId)) {
    islemDurumuYaz("Önce cüzdanı bağla ve Sepolia'ya geç. İşlem gönderilmedi.", "hata");
    return;
  }
  islemSuruyor = true;
  gondermeDugmeleriniAyarla();
  $("islem-baglantisi").hidden = true;
  let sonHash = null;

  const asamalar = {
    onayBekleniyor: () => islemDurumuYaz("MetaMask onayı bekleniyor…", "bekliyor"),
    zincirBekleniyor: (hash) => {
      sonHash = hash;
      islemBaglantisiGoster(hash);
      islemDurumuYaz("Gönderildi. Zincir sonucu bekleniyor…", "bekliyor");
    },
  };

  try {
    const yazma = sozlesmeOlustur(baglanti.imzalayici);
    await gonder(yazma, asamalar);
    islemDurumuYaz("Başarılı: makbuzda status 1.", "basarili");
    await bilgileriYenile(); // başarıdan sonra ekran yenilenir [İP24-6]
  } catch (hata) {
    const aciklama = hatayiAcikla(hata);
    if (sonHash && !hata?.reason && !hata?.receipt) {
      // Hash var ama sonuç alınamadı: başarısız demiyoruz, tekrar göndertmiyoruz. [İP25-4]
      islemDurumuYaz(`Sonuç henüz doğrulanamadı (${aciklama}). İşlemi Etherscan bağlantısından kontrol et; tekrar gönderme.`, "bilinmiyor");
    } else {
      islemDurumuYaz(aciklama, "hata");
    }
  } finally {
    islemSuruyor = false;
    gondermeDugmeleriniAyarla();
  }
}

// ---------- olaylar ----------

$("cuzdan-bagla-dugmesi").addEventListener("click", async () => {
  try { await baglanVeGoster(); }
  catch (hata) { islemDurumuYaz(hatayiAcikla(hata), "hata"); }
});

$("sepoliaya-gec-dugmesi").addEventListener("click", async () => {
  try { await sepoliayaGecIste(); }
  catch (hata) { islemDurumuYaz(hatayiAcikla(hata), "hata"); }
});

$("bilgileri-yenile-dugmesi").addEventListener("click", async () => {
  try { await bilgileriYenile(); }
  catch (hata) { islemDurumuYaz(hatayiAcikla(hata), "hata"); }
});

$("kayit-ol-dugmesi").addEventListener("click", () => {
  const takmaAd = $("takma-ad-girdisi").value.trim();
  const kadin = $("kadin-beyani").checked;
  const gelistirici = $("gelistirici-beyani").checked;
  // Kuralları burada değil sözleşmede denetliyoruz; arayüz yalnızca değerleri iletir.
  islemYap((sozlesme, asamalar) => kayitOl(sozlesme, takmaAd, kadin, gelistirici, asamalar));
});

$("giris-onayla-dugmesi").addEventListener("click", () => {
  const katilimci = $("katilimci-adresi-girdisi").value.trim();
  if (!isAddress(katilimci)) {
    islemDurumuYaz("Geçerli bir adres gir (0x ile başlayan 42 karakter). İşlem gönderilmedi.", "hata");
    return;
  }
  islemYap((sozlesme, asamalar) => girisOnayla(sozlesme, katilimci, asamalar));
});

// ---------- giriş sayfası ↔ uygulama ----------
// Giriş yalnızca bir karşılama ekranıdır; cüzdan bağlantısı uygulamada "Cüzdan bağla" ile yapılır.

$("giris-dugmesi").addEventListener("click", () => {
  $("giris-sayfasi").hidden = true;
  $("uygulama").hidden = false;
  window.scrollTo(0, 0);
  $("cuzdan-bagla-dugmesi").focus();
});

$("girise-don-dugmesi").addEventListener("click", () => {
  $("uygulama").hidden = true;
  $("giris-sayfasi").hidden = false;
  $("giris-dugmesi").focus();
});

// ---------- konuşan kedi ve çilek ----------
// İkisi ortak bir sırayı paylaşır: hangisine dokunulursa dokunulsun sıradaki bilgi gelir (1 → 10 → 1).

let bilgiSirasi = 0;

function karakterKonussun(karakterAdi) {
  const balon = $(`${karakterAdi}-balonu`);
  const digerBalon = $(karakterAdi === "kedi" ? "cilek-balonu" : "kedi-balonu");
  digerBalon.hidden = true;

  balon.querySelector(".balon-metni").textContent = BLOKZINCIR_BILGILERI[bilgiSirasi];
  balon.querySelector(".balon-sayaci").textContent = `${bilgiSirasi + 1} / ${BLOKZINCIR_BILGILERI.length}`;
  balon.hidden = false;
  bilgiSirasi = (bilgiSirasi + 1) % BLOKZINCIR_BILGILERI.length;

  // Konuşurken kısa bir "zıplama" animasyonu (CSS: .konusuyor)
  const karakter = $(`${karakterAdi}-dugmesi`);
  karakter.classList.remove("konusuyor");
  void karakter.offsetWidth; // animasyonu yeniden başlatmak için
  karakter.classList.add("konusuyor");
}

$("kedi-dugmesi").addEventListener("click", () => karakterKonussun("kedi"));
$("cilek-dugmesi").addEventListener("click", () => karakterKonussun("cilek"));
for (const kapat of document.querySelectorAll(".balon-kapat")) {
  kapat.addEventListener("click", () => { $(kapat.dataset.balon).hidden = true; });
}

// ---------- açılış ----------

$("sozlesme-baglantisi").textContent = SOZLESME_ADRESI;
$("sozlesme-baglantisi").href = `${ETHERSCAN}/address/${SOZLESME_ADRESI}`;
gondermeDugmeleriniAyarla();

if (!metamaskVarMi()) {
  $("metamask-yok-uyarisi").hidden = false;
  $("cuzdan-bagla-dugmesi").disabled = true;
} else {
  // Hesap veya ağ değişince bilgiler yeniden okunur. [İP25-3]
  degisiklikleriDinle(
    () => { if (baglanti) baglanVeGoster().catch((h) => islemDurumuYaz(hatayiAcikla(h), "hata")); },
    () => { if (baglanti) baglanVeGoster().catch((h) => islemDurumuYaz(hatayiAcikla(h), "hata")); },
  );
}
