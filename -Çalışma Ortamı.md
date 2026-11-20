# İP 11: Çalışma Ortamını Hazırla

**Amaç:** Araştırma notlarımı düzenleyip uygulama geliştirmek için gereken araçları hazırlamak.

## 1. GitHub hesabı, Visual Studio Code ve Git

GitHub hesabım, Visual Studio Code ve Git, HALOCLINE projesinden zaten kuruluydu. Bu iş paketi için yeniden kurmadım. Git kullanıcı adım ve e-postam zaten tanımlıydı.

## 2. quantum-baslangic klasörü ve GitHub deposu

Bilgisayarımda `quantum-baslangic` adlı bir klasör ve aynı adla bir GitHub deposu oluşturdum. İP 01–10 araştırma notlarımı depoya ekledim. İP 12'de yazdığım cüzdan aracı `cuzdan-araci/` klasöründe, ekran görüntüsü kanıtları `kanitlar/` klasöründe duruyor. Takımın iç belgesi olan iş paketi PDF'i `.gitignore` ile depodan dışarıda tutuluyor.

Deponun kökündeki `README.md` çalışmanın amacını, öğrenmek istediğim konuları, klasörleri, kullandığım araçları ve iki uygulamanın nasıl çalıştırılacağını anlatıyor.

## 3. Git, GitHub, README, commit ve push

**Git:** Dosyaların sürüm geçmişini bilgisayarımda tutan sürüm kontrol sistemidir. Her değişikliği kimin, ne zaman ve neden yaptığını kaydeder ve eski bir hâle geri dönebilmemi sağlar. Git kullanıcı ayarımda adımı ve e-postamı tanımladım; commitlerimde yazar olarak bu bilgi görünür.

**GitHub:** Git depolarını internette barındıran platformdur. Depomun bir kopyası orada durur, başkaları görebilir ve birlikte çalışılabilir.

**README:** Deponun giriş sayfasıdır. GitHub depoyu açan herkese önce bu dosyayı gösterir. Projenin ne olduğu ve nasıl çalıştırılacağı burada yazar.

**Commit:** Yaptığım değişikliklerin bir açıklama mesajıyla birlikte kaydedilmiş anlık görüntüsüdür. Her commit'in bir hash'i vardır ve bir önceki commit'i gösterir. Bu yapı, blokların önceki bloğun hash'ini tutmasına çok benziyor.

**Push:** Bilgisayarımdaki commitleri GitHub'daki uzak depoya göndermektir. Push yapmadan commitler yalnızca benim bilgisayarımda kalır.

## 4. MetaMask

MetaMask'i resmî kaynağı olan metamask.io üzerinden kurdum. İP 13'te eğitim hesabını eski cüzdanlarımdan ayırmak için Brave'deki eski MetaMask eklentisini silip yeniden kurdum. Yeni kelimeleri hem bu temiz eklentiye hem de Safari'deki MetaMask'e girdim. Her kurulum kendi parolasını, hesap adını ve ağ listesini ayrı tutuyor; hesabın kendisi ise 12 kelimeden türediği için her yerde aynı adresle geliyor.

## 5. Remix IDE ve Solidity

Remix IDE'yi resmî adresi remix.ethereum.org üzerinden açtım. Remix, bu adresin app.remix.live'a taşındığını bildiriyor.

**Remix IDE:** Tarayıcıda çalışan, Solidity sözleşmesi yazıp derleyebildiğim, deploy edebildiğim ve zincirdeki mevcut bir sözleşmeye bağlanıp fonksiyonlarını çağırabildiğim geliştirme ortamıdır.

**Solidity:** Ethereum'da akıllı sözleşme yazmak için kullanılan programlama dilidir. Derlenince EVM'nin çalıştırdığı bytecode ve sözleşmenin nasıl çağrılacağını anlatan ABI üretilir.

## 6. Node.js ve paket yöneticisi

Cüzdan aracı Vite ve ethers.js ile yazıldığı için Node.js ve npm gerekiyor. Kodu yapay zekâ asistanı Claude Code yazdı, ben çalıştırıp denedim. Kullandığım sürümler Node.js v24.18.1 ve npm 11.16.0. Uygulamayı `cuzdan-araci/` klasöründe şu komutlarla çalıştırıyorum:

```
npm install     # bağımlılıkları kurar (ethers, vite)
npm run dev     # uygulamayı http://localhost:5173 adresinde açar
npm test        # resmî BIP39 test vektörü ve sabit değer testlerini çalıştırır
```

İP 24'teki etkinlik sitesi de aynı araçlarla `etkinlik-sitesi/` klasöründe çalışıyor. `npm run dev` onu http://localhost:5174 adresinde açıyor, `npm run build` ise yayın için `dist/` klasörünü üretiyor.

Araçların ve çalıştırma adımlarının ayrıntısı kökteki `README.md` dosyasında ve her uygulamanın kendi README'sinde yazıyor.

## Benim yorumum

Git, GitHub ve VS Code'u HALOCLINE'da mobil uygulama geliştirirken zaten kullanıyordum, o yüzden bunlar yeni değildi. Benim için yeni olan MetaMask'in çoklu cüzdan mantığı ve Remix'ti. MetaMask'te aynı kurulumun içine yeni kelimeler eklemeye çalışınca "zaten içe aktarıldı" hatasıyla uğraştım ve en sonunda eklentiyi silip temiz kurmak en sağlıklı yol oldu. Buradan şunu öğrendim: parola, hesap adı ve ağ listesi cihaza ait, hesabın kendisi ise kelimelere ait. Remix'te de en çok şaşırdığım şey sitenin MetaMask'te ayrı bir ağa bağlı kalabilmesiydi. Kurulumda takıldığım her yerde önce hata mesajını okuyup neyin nereye bağlı olduğunu anlamaya çalıştım.

## Kaynaklar
- [Git – Dokümantasyon](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com)
- [Visual Studio Code](https://code.visualstudio.com)
- [MetaMask](https://metamask.io)
- [Remix IDE Dokümantasyonu](https://remix-ide.readthedocs.io)
- [Solidity Docs](https://docs.soliditylang.org)
- [Node.js](https://nodejs.org)
