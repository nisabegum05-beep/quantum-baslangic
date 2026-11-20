# QuantumKayit — takım sözleşmesinin kopyası (İP 18)

Bu klasördeki `QuantumKayit.sol`, Quantum Blokzincir Takımı'nın ortak isim kayıt sözleşmesinin **kopyasıdır**.
Yalnızca İP 18 (kendi kopyanı deploy et ve verify et) deneyi için depoya eklenmiştir.
Sonraki etkinlik projesi (İP 20+) bu koddan bağımsız, sıfırdan yazılacaktır.

## Kaynak

| Bilgi | Değer |
|---|---|
| Orijinal sözleşme | Quantum Blokzincir Takımı |
| Ağ | Ethereum Sepolia |
| Takım sözleşme adresi | `0x81Dd700C459BF2806A1B5F2a349c89f0106A9036` |
| Kaynak kod | https://sepolia.etherscan.io/address/0x81Dd700C459BF2806A1B5F2a349c89f0106A9036#code → `src/QuantumKayit.sol` |
| Lisans | Kaynak dosyada `SPDX-License-Identifier: MIT`; Etherscan lisans alanı "-NA-" gösteriyor. Satır korunmuştur. |
| Takımın derleyici ayarları | Compiler v0.8.24+commit.e11b9ed9 · Optimization kapalı (200 runs) · EVM cancun (Etherscan → Contract, "Exact Match") |

Not: Kod, Etherscan'den Remix'e kopyalanan hâlinden aktarıldı ve solc 0.8.20 ile hatasız derlendi.
Derlemenin ürettiği ABI, Etherscan'deki doğrulanmış sözleşmenin ABI'siyle aynı: `Registered` event'i ile `register(string name)`, `kayitliMi`, `kayitSayisi` ve `tumKayitlar` fonksiyonları. İP 16'daki gerçek `register` işleminin seçicisi (`0xf2c298be`) de bu kopyadan hesaplananla eşleşiyor.

## Fonksiyon seçicileri (solc 0.8.20 çıktısı)

| Fonksiyon | Selector (Input Data'nın ilk 4 baytı) |
|---|---|
| `register(string)` | `0xf2c298be` |
| `kayitliMi(address)` | `0x8162c855` |
| `tumKayitlar()` | `0x2fc495c3` |
| `kayitSayisi()` | `0x56731f36` |

## Kendi kopyam (İP 18)

İP 18 (kendi kopyayı Sepolia'ya deploy ve verify) henüz yapılmadı. Yapıldığında kopya adresi ve deploy tx hash'i buraya eklenecek; verify yukarıdaki takım ayarlarıyla (0.8.24, optimizer kapalı, cancun) yapılmalı.
