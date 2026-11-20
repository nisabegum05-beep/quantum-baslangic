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
| Lisans | MIT (dosyanın ilk satırındaki `SPDX-License-Identifier` korunmuştur) |
| Takımın derleyici ayarları | Compiler: _doldurulacak_ · Optimization: _doldurulacak_ · EVM: _doldurulacak_ (Etherscan → Contract sekmesi) |

Not: Kod, Remix'e kopyalanan hâlinden aktarılmış ve solc 0.8.20 ile hatasız derlendiği doğrulanmıştır.
Etherscan'deki `src/QuantumKayit.sol` ile satır satır karşılaştırılmalıdır.

## Fonksiyon seçicileri (solc 0.8.20 çıktısı)

| Fonksiyon | Selector (Input Data'nın ilk 4 baytı) |
|---|---|
| `register(string)` | `0xf2c298be` |
| `kayitliMi(address)` | `0x8162c855` |
| `tumKayitlar()` | `0x2fc495c3` |
| `kayitSayisi()` | `0x56731f36` |

## Kendi kopyam (İP 18 sonrası doldurulacak)

| Bilgi | Değer |
|---|---|
| Kopya sözleşme adresi | _henüz deploy edilmedi_ |
| Deploy tx hash | _henüz yok_ |
| Kullanılan derleyici / optimizasyon / EVM | _henüz yok_ |
| Verify durumu | _henüz yapılmadı_ |
