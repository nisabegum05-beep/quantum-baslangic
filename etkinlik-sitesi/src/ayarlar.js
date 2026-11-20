// AYARLAR — sitenin bağlandığı sözleşme ve ağ. Sürüm değişirse YALNIZCA bu dosya güncellenir. [İP24-2]
//
// Adres: İP 23'te Sepolia'ya deploy edilen Kadinzincir_v3.
//   Deploy tx: 0x5dcd7f9efc6588beac8812801ab7136f0218035ba15cca2853903a407ca2678a
// ABI: etkinlik-sozlesmesi/Kadinzincir_v3.abi.json ile aynı fonksiyon ve event'ler,
//   okunabilir (human-readable) biçimde. test/site.test.js ikisinin eşleştiğini kontrol eder.

export const SOZLESME_ADRESI = "0x2Ee529a07e98dEEe473bE9bb0f2a63e757a01e65";

// Sepolia'nın chain ID'si. Cüzdan başka ağdaysa işlem GÖNDERİLMEZ. [İP24-3]
export const SEPOLIA_CHAIN_ID = 11155111n;
export const SEPOLIA_CHAIN_ID_HEX = "0xaa36a7"; // 11155111'in onaltılık hâli (wallet_switchEthereumChain için)

export const ETHERSCAN = "https://sepolia.etherscan.io";

export const KADINZINCIR_ABI = [
  // Okuma (view) — ücretsiz, işlem değil
  "function etkinlikAdi() view returns (string)",
  "function kapasite() view returns (uint256)",
  "function toplamKayit() view returns (uint256)",
  "function gorevli() view returns (address)",
  "function kayitliMi(address) view returns (bool)",
  "function takmaAdi(address) view returns (string)",
  "function girisYaptiMi(address) view returns (bool)",
  // Yazma — imzalı işlem, gas öder, MetaMask onaylar
  "function kayitOl(string _takmaAd, bool _kendimiKadinOlarakTanimliyorum, bool _gelistiriciyim)",
  "function girisOnayla(address _katilimci)",
  // Event'ler
  "event Kaydoldu(address indexed katilimci, string takmaAd, uint256 sira)",
  "event GirisYapti(address indexed katilimci, address indexed onaylayanGorevli)",
];
