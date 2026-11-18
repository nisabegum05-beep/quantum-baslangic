// ÇİÇEK AÇIKLAMALARI — çiçeğe her basışta sıradaki açıklama gösterilir (10 adet).
// Her madde: aşamanın adı, NE yapıldı, NEDEN yapıldı. Gizli değer yok; yalnızca anlatım metni.
export const ACIKLAMALAR = [
  { baslik: "1 · Entropi", ne: "16 bayt (128 bit) güvenli rastgele sayı üretildi.", neden: "Cüzdandaki her şey bu sayıdan türer; tahmin edilebilir olsaydı hesap çalınabilirdi. Math.random bu yüzden yasak." },
  { baslik: "2 · 12 kelime", ne: "Entropiye 4 bit checksum eklenip 11'er bitlik 12 parça olarak kelimelere çevrildi (BIP39).", neden: "Hex sayıyı kâğıda yazmak zordur; kelimeler yedeklenebilir ve checksum yazım hatalarının çoğunu yakalar." },
  { baslik: "3 · Seed", ne: "12 kelime PBKDF2-HMAC-SHA512 ile 2048 tur karıştırılıp 512 bit seed oldu; passphrase boş.", neden: "Anahtar ağacı kelime değil bayt ister. Passphrase boş çünkü MetaMask da boş kullanır; aksi hâlde adresler eşleşmezdi." },
  { baslik: "4 · Master key", ne: "Seed'den BIP32 ağacının kökü (xprv) üretildi.", neden: "Tek kökten sınırsız hesap türetmek için. xprv bütün hesapların anahtarıdır, bu yüzden gizli." },
  { baslik: "5 · Türetme yolu", ne: "Kökten m/44'/60'/0'/0/0 yoluyla ilk Ethereum hesabına inildi (BIP44).", neden: "Her cüzdan aynı yolu kullanır; böylece aynı kelimelerden her yerde aynı adres çıkar." },
  { baslik: "6 · Private key", ne: "Yolun sonundaki düğümün 32 baytlık gizli anahtarı alındı.", neden: "İşlemleri imzalayan sayı budur. Bilen herkes hesabı boşaltır; o yüzden kapalı başlar." },
  { baslik: "7 · Public key", ne: "Private key'den secp256k1 eğri çarpımıyla 65 baytlık public key hesaplandı.", neden: "Adres public key'den türer. Tek yönlü işlem: public'ten private'a dönülemez, bu yüzden açık gösterilebilir." },
  { baslik: "8 · Adres", ne: "Public key'in Keccak-256 hash'inin son 20 baytı alındı, EIP-55 harfleri uygulandı; computeAddress ile aynı çıktığı kontrol edildi.", neden: "Hazır fonksiyona güvenmek yerine dönüşümü görmek için. Harf büyüklüğü bir checksum'dır, adresi değiştirmez." },
  { baslik: "★ Doğrulama", ne: "Yazılan 12 kelime önce listede aranır, sonra checksum kontrol edilir; üç sonuçtan biri verilir.", neden: "Checksum 4 bit: yanlış kelimelerin 15/16'sını yakalar, 1/16'sı geçer. İP 13 deneyi bunu gösterir." },
  { baslik: "★ Geri türetme", ne: "12 kelimeden entropiye geri gidilip zincir aynı entropiyle yeniden çalıştırılır.", neden: "Sayfa yenilenince değerler bilerek silinir. Aynı kelimelerin aynı adresi vermesi determinizmin kanıtıdır." },
];
