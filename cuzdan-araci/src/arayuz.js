// ARAYÜZ — düğmeler, ekrana yazma, gizle/göster, temizleme
// Bu dosya hesap yapmaz; hesaplar src/asamalar/ ve src/cuzdan-zinciri.js içindedir.
// Kurallar [İP12-3]:
//  - gizli değerler console.log, localStorage, sessionStorage, cookie veya ağa GİTMEZ
//  - gizli alanlar varsayılan kapalı; her birinin kendi Göster/Gizle düğmesi var
//  - yeni cüzdan üretilince önceki değerler değişkenden ve ekrandan silinir

import { cuzdanZinciriniCalistir, kelimelerdenZinciriCalistir } from "./cuzdan-zinciri.js";
import { mnemonicDogrula } from "./dogrulama.js";
import { resmiVektoruKontrolEt, RESMI_VEKTOR } from "./test-vektoru.js";
import { ACIKLAMALAR } from "./aciklamalar.js";

// Üretilen değerler yalnızca bu değişkende, yalnızca sayfa açıkken tutulur.
let mevcutCuzdan = null;

const GIZLI_ALANLAR = ["entropi", "mnemonic", "seed", "masterKey", "privateKey"];
const ACIK_ALANLAR = ["turetmeYolu", "publicKey", "adres"];

const yeniCuzdanDugmesi = document.getElementById("yeni-cuzdan-dugmesi");
const durumMesaji = document.getElementById("durum-mesaji");
const adresKontrolMetni = document.querySelector('[data-alan="adresKontrol"]');

function alanKutusu(alanAdi) {
  return document.querySelector(`[data-alan="${alanAdi}"]`);
}

// Gizli alan: değer kutuda değil, mevcutCuzdan içinde durur; kutu yalnızca "Göster" denince dolar.
function gizliAlaniYenile(alanAdi) {
  const kutu = alanKutusu(alanAdi);
  const dugme = document.querySelector(`.goster-gizle-dugmesi[data-hedef="${alanAdi}"]`);
  const gizliMi = kutu.dataset.gizli === "true";
  const degerVarMi = mevcutCuzdan !== null;

  if (!degerVarMi) {
    kutu.textContent = "— — —";
  } else if (gizliMi) {
    kutu.textContent = "•••••••• (gizli)";
  } else {
    kutu.textContent = mevcutCuzdan[alanAdi];
  }
  dugme.textContent = gizliMi ? "Göster" : "Gizle";
}

function acikAlaniYenile(alanAdi) {
  alanKutusu(alanAdi).textContent = mevcutCuzdan === null ? "— — —" : mevcutCuzdan[alanAdi];
}

function butunAlanlariYenile() {
  for (const alanAdi of GIZLI_ALANLAR) {
    alanKutusu(alanAdi).dataset.gizli = "true"; // her yenilemede kapalı başla
    gizliAlaniYenile(alanAdi);
  }
  for (const alanAdi of ACIK_ALANLAR) {
    acikAlaniYenile(alanAdi);
  }
  if (mevcutCuzdan === null) {
    adresKontrolMetni.textContent = "";
  } else {
    adresKontrolMetni.textContent = mevcutCuzdan.adresKontrolTuttu
      ? "Kontrol: elle hesaplanan adres = ethers.computeAddress ✔"
      : "Kontrol: adresler FARKLI ✘ (beklenmiyor)";
  }
}

// --- Yeni cüzdan ---
yeniCuzdanDugmesi.addEventListener("click", () => {
  mevcutCuzdan = null;        // önce eskisi silinir
  butunAlanlariYenile();      // ekran temizlenir
  mevcutCuzdan = cuzdanZinciriniCalistir(); // 8 aşama
  butunAlanlariYenile();
  durumMesaji.textContent = "Yeni eğitim cüzdanı üretildi. Gizli alanlar kapalı; incelemek için Göster.";
});

// --- Kâğıttaki kelimelerden yeniden türetme [İP13-2] ---
const yenidenTuretmeGirdisi = document.getElementById("yeniden-turetme-girdisi");
const yenidenTuretDugmesi = document.getElementById("yeniden-turet-dugmesi");
const yenidenTuretmeSonucu = document.getElementById("yeniden-turetme-sonucu");

yenidenTuretDugmesi.addEventListener("click", () => {
  mevcutCuzdan = null;
  butunAlanlariYenile();
  try {
    mevcutCuzdan = kelimelerdenZinciriCalistir(yenidenTuretmeGirdisi.value);
    yenidenTuretmeSonucu.textContent = "Türetildi: aynı kelimeler → aynı 8 aşama. Gizli alanlar kapalı.";
    durumMesaji.textContent = "Cüzdan kâğıttaki kelimelerden yeniden türetildi.";
  } catch {
    yenidenTuretmeSonucu.textContent = "Türetilemedi: kelimeler geçersiz (liste veya checksum). Doğrulama kutusunda kontrol et.";
  }
  yenidenTuretmeGirdisi.value = ""; // kelimeler kutuda kalmasın
  butunAlanlariYenile();
});

// --- Göster / Gizle ---
for (const dugme of document.querySelectorAll(".goster-gizle-dugmesi")) {
  dugme.addEventListener("click", () => {
    const kutu = alanKutusu(dugme.dataset.hedef);
    kutu.dataset.gizli = kutu.dataset.gizli === "true" ? "false" : "true";
    gizliAlaniYenile(dugme.dataset.hedef);
  });
}

// --- Mnemonic doğrulama kutusu [İP13-3] ---
const dogrulamaGirdisi = document.getElementById("dogrulama-girdisi");
const dogrulaDugmesi = document.getElementById("dogrula-dugmesi");
const dogrulamaSonucu = document.getElementById("dogrulama-sonucu");

dogrulaDugmesi.addEventListener("click", () => {
  dogrulamaSonucu.textContent = mnemonicDogrula(dogrulamaGirdisi.value);
});

// --- Resmî test vektörü [İP12-5] ---
const testVektoruDugmesi = document.getElementById("test-vektoru-dugmesi");
const testVektoruSonucu = document.getElementById("test-vektoru-sonucu");

testVektoruDugmesi.addEventListener("click", () => {
  const { eslesti, ayrintilar } = resmiVektoruKontrolEt();
  const ozet = eslesti ? "Eşleşti" : "Eşleşmedi";
  testVektoruSonucu.textContent =
    `${ozet} — kaynak: ${RESMI_VEKTOR.kaynak}, passphrase "${RESMI_VEKTOR.passphrase}" ` +
    `(mnemonic ${ayrintilar.mnemonicEslesti ? "✔" : "✘"}, seed ${ayrintilar.seedEslesti ? "✔" : "✘"}, ` +
    `xprv ${ayrintilar.xprvEslesti ? "✔" : "✘"})`;
});

butunAlanlariYenile();

// --- Çiçekler: her basışta sıradaki açıklama (10 adet, döngüsel) ---
const cicekBalonu = document.getElementById("cicek-balonu");
let aciklamaSirasi = 0;

for (const cicek of document.querySelectorAll(".cicek-dugmesi")) {
  cicek.addEventListener("click", () => {
    const aciklama = ACIKLAMALAR[aciklamaSirasi];
    cicekBalonu.querySelector(".balon-baslik").textContent = aciklama.baslik;
    cicekBalonu.querySelector(".balon-ne").textContent = "Ne? " + aciklama.ne;
    cicekBalonu.querySelector(".balon-neden").textContent = "Neden? " + aciklama.neden;
    cicekBalonu.querySelector(".balon-sayac").textContent = `${aciklamaSirasi + 1} / ${ACIKLAMALAR.length} — tekrar bas: sıradaki`;
    cicekBalonu.hidden = false;
    aciklamaSirasi = (aciklamaSirasi + 1) % ACIKLAMALAR.length;
  });
}
document.getElementById("balon-kapat").addEventListener("click", () => { cicekBalonu.hidden = true; });
