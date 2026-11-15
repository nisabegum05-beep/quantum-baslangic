# İP 04: Bitcoin, Ethereum ve Token

**Amaç:** Ağ ile varlık türlerini ayırt etmek.

## 1. Bitcoin ve Ethereum'un temel amaçları ve programlanabilirliği nasıl farklılaşır?

Bitcoin'in temel amacı merkezi bir kuruma ihtiyaç duymadan değer saklanabilen ve transfer edilebilen dijital bir para olmaktır Bitcoin: Esler Arası Elektronik Bir Ödeme Sistemi makalesinde de bulunduğu gibi.Ethereum'un temel amacı ise üzerinde herkesin kendi kurallarını yazıp çalıştırabildiği genel amaçlı programlanabilir bir platform olmaktır.

Bitcoin'in programlanabilirliği bilinçli olarak sınırlı tutulmuştur, sadece basit bir betik dili (Script) vardır. Ethereum'da ise EVM sayesinde neredeyse her türlü mantık akıllı sözleşme olarak yazılabilir. Token'ların, NFT'lerin ve akıllı sözleşmelerin Ethereum üzerinde olmasının sebebi budur.


## 2. Native varlık ve token nedir? ETH ve USDC üzerinden açıklayın.

**Native varlık:** Ağın protokolüne gömülü olan kendi parasıdır. Ethereum'un native varlığı ETH'dir. ETH bakiyesi doğrudan hesabın state'inde tutulur ve transferini protokolün kendisi yapar. Gas ücreti protokol düzeyinde sadece native varlıkla ödenir.

**Token:** Ağın protokolünün bir parçası olmayan, ağın üzerindeki bir akıllı sözleşme tarafından üretilen ve kayıtları o sözleşmede tutulan birimdir. Kendi kuralları sözleşmenin kodunda yazılıdır. USDC, Circle şirketinin çıkardığı bir ERC-20 token'ıdır. USDC bakiyesi kullanıcının hesabında değil USDC sözleşmesinin kendi kayıtlarında tutulur.

ETH gönderirken işlemin alıcı (To) alanında alıcının adresi yazar, miktar Value alanındadır ve Input Data boştur. USDC gönderirken ise aslında USDC sözleşmesinin transfer fonksiyonu çağrılır. Bu yüzden To alanında USDC sözleşmesinin adresi yazar, Value alanı 0 olur, alıcı ve miktar Input Data içinde yer alır ve sözleşme bir Transfer event'i yayımlar. USDC gönderilirken de gas ücreti ETH'den ödenir.

USDC'nin değeri ETH'ye bağlı değildir. Değeri Circle'ın kasasında tuttuğu dolar rezervlerinden gelir ve 1 USDC yaklaşık 1 dolardır. Circle sözleşmede belirli adresleri dondurabildiği için USDC kullanan kişi Ethereum'a ek olarak Circle'a da güvenmek zorundadır.

Tokenler, ağın protokolünün bir parçası olmayan, ağın üzerindeki bir akıllı sözleşme tarafından üretilen ve kayıtları o sözleşmede tutulan birimlerdir. Kendi kuralları sözleşmenin kodunda yazılıdır. Değerleri native varlığa bağlı olabilir de olmayabilir de, ama transfer ücretleri her zaman native varlıkla ödenir.
## 3. Stablecoin, NFT ve ERC-20 kavramları neyi ifade eder?

Bu üç kavram aynı türden değildir. ERC-20 ve NFT token'ın teknik yapısını, stablecoin ise token'ın ekonomik amacını ifade eder.

**ERC-20:** Ethereum'da birbirinin aynısı (fungible) olan token'lar için standart arayüzdür. Her birim diğerinin aynısıdır. Bütün ERC-20 sözleşmeleri aynı fonksiyonlara (totalSupply, balanceOf, transfer, approve, allowance, transferFrom) ve aynı event'lere (Transfer, Approval) sahip olduğu için cüzdanlar ve diğer uygulamalar hepsiyle aynı şekilde çalışabilir. Sözleşme her adresin ne kadar token'ı olduğunu tutar.

**NFT:** Her biri benzersiz olan, birbirinin yerine geçemeyen (non-fungible) token'dır. Standardı ERC-721'dir. Sözleşme her token'ın kimlik numarasını (tokenId) ve sahibini tutar. NFT bir sahiplik kaydıdır, görsel veya dosya genelde zincirde değil zincir dışında durur ve zincirde sadece sahiplik kaydı ile dosyaya giden bağlantı tutulur.

**Stablecoin:** Değerini bir referansa, genelde 1 ABD dolarına sabitlemeye çalışan token'dır ve teknik olarak çoğu ERC-20'dir. Fiat teminatlı stablecoin'lerde karşılığı bir şirketin kasasında tutulur ve şirkete güven gerekir. Kripto teminatlı stablecoin'lerde teminat sözleşmelere kilitlenmiş kripto varlıklardır ve fazladan teminat tutulur. Algoritmik stablecoin'lerde ise arz bir algoritmayla ayarlanır ve en riskli türdür.


## 4. Mainnet ve testnet neden ayrılır? Test ETH ve test USDC gerçek varlıklarla aynı ekonomik değeri taşır mı?

Mainnet gerçek ekonomik değerin olduğu asıl ağdır. Testnet ise aynı yazılımla çalışan ama tamamen ayrı bir zincirdir. Hatalı bir sözleşmeyi yayınlamak veya bir işlem akışını denemek gerçek para kaybettirmesin diye bu iki ağ birbirinden ayrılır. Her ağın chain ID'si farklıdır (mainnet 1, Sepolia 11155111) ve chain ID imzaya dahil edildiği için bir ağ için imzalanan işlem diğer ağda geçerli olmaz.

Test ETH ve test USDC gerçek varlıklarla aynı ekonomik değeri taşımaz, değerleri yoktur. Faucet'lerden ücretsiz dağıtılırlar ve gerçek varlıklara çevrilemezler. Test USDC'nin arkasında bir rezerv yoktur ve mainnet'teki USDC'den farklı adreste duran ayrı bir sözleşmedir.

## Benim yorumum

Etkinliğe giriş hakkını temsil etmek için mutlaka token gerekmez. Sözleşmede her adresin kayıtlı olup olmadığını ve giriş yapıp yapmadığını tutan basit bir kayıt da yeterlidir. Token kullanmak giriş hakkının başka bir adrese devredilebilmesini ve cüzdanlarda görünmesini sağlar. Ama devredilebilir bir giriş hakkı biletlerin karaborsada satılması gibi istenmeyen durumlara da yol açabilir. Bu yüzden giriş hakkının başkasına devredilmesi gerekmiyorsa token yerine sözleşmede tutulan kayıt daha basit ve daha uygun bir çözümdür. Devredilmesi gerekiyorsa her bilet benzersiz olduğu için NFT tercih edilebilir.

## Kaynaklar
- Usta, A. & Doğantekin, S. *Blockchain 101 v2* – "Token Nedir?", "Blockchain Platformları: Bitcoin, Ethereum"
- Sert, T. *Sorularla Blockchain* – "Ethereum ve Akıllı Kontratlar", "Nedir bu SabitPara?"
- Nakamoto, S. (2008). *Bitcoin: A Peer-to-Peer Electronic Cash System*
- [ethereum.org – What is ether?](https://ethereum.org/en/eth/)
- [ethereum.org – ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)
- [ethereum.org – ERC-721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/)
- [ethereum.org – Stablecoins](https://ethereum.org/en/stablecoins/)
- [ethereum.org – Networks](https://ethereum.org/en/developers/docs/networks/)
- Circle – USDC dokümantasyonu

> Kitaplardaki düzeltmeler: *Blockchain 101* "tüm para birimleri ve kripto paralar birer token" diyor; bu kavramsal bir tanımdır, Ethereum'un teknik dilinde ETH token değil native varlıktır. *Sorularla Blockchain*'de anlatılan Libra projesi 2022'de kapanmıştır. İki kitapta da ERC-20, NFT, USDC ve testnet konuları yer almıyor.
