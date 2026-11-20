// CÜZDAN — MetaMask bağlantısı ve ağ kontrolü. [İP24-3]
// Bu dosya private key veya kurtarma kelimesi İSTEMEZ ve GÖRMEZ.
// İmzayı MetaMask atar; site yalnızca adresi öğrenir ve imza isteği gönderir. [İP24-6]

import { BrowserProvider } from "ethers";
import { SEPOLIA_CHAIN_ID, SEPOLIA_CHAIN_ID_HEX } from "./ayarlar.js";

export function metamaskVarMi() {
  return typeof window !== "undefined" && Boolean(window.ethereum);
}

// "Cüzdan bağla": MetaMask'ten hesap erişimi ister (eth_requestAccounts).
// İmza yok, ücret yok, zincire bir şey yazılmaz (İP 07: cüzdan bağlamak).
export async function cuzdanBagla() {
  const saglayici = new BrowserProvider(window.ethereum);
  const imzalayici = await saglayici.getSigner(); // MetaMask'in bağlan penceresini açar
  const adres = await imzalayici.getAddress();
  const ag = await saglayici.getNetwork();
  return { saglayici, imzalayici, adres, chainId: ag.chainId };
}

export function sepoliaMi(chainId) {
  return chainId === SEPOLIA_CHAIN_ID;
}

// Kullanıcıdan Sepolia'ya geçmesini MetaMask üzerinden ister.
export async function sepoliayaGecIste() {
  await window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: SEPOLIA_CHAIN_ID_HEX }],
  });
}

// Hesap ya da ağ değişince sayfayı haberdar eder.
export function degisiklikleriDinle(hesapDegisti, agDegisti) {
  window.ethereum.on("accountsChanged", hesapDegisti);
  window.ethereum.on("chainChanged", agDegisti);
}
