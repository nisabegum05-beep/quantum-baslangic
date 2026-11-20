// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title  Kadınzincir — İKİNCİ SÜRÜM (İP 21)
/// @notice Kadın geliştiricileri bir araya getiren, kapasiteli bir etkinlik.
///         Kayıt için iki beyan zorunlu: kendini kadın olarak tanımlamak ve geliştirici olmak.
///         İlk sürüm (EtkinlikKaydi_v1.sol) silinmeden duruyor.
/// @dev    Sözleşme cinsiyeti de geliştiriciliği de DOĞRULAYAMAZ; yalnızca beyanları zorunlu kılar.
///         Zincire "gizli cevap" koymak da işe yaramaz: Input Data herkese açıktır.
///         Gerçek kontrol İP 22'de görevlinin giriş onayında yapılır.
contract Kadinzincir {
    // Etkinliğin adı (deploy'da verilir, ör. "Kadınzincir").
    string public etkinlikAdi;

    // Kapasite deploy'da verilir ve bir daha değişmez (immutable).
    // İş paketi denemeleri için 3, gerçek etkinlik için 30.
    uint256 public immutable kapasite;

    // Şu ana kadar kabul edilen kayıt sayısı. Dışarıdan okunabilir (İP 21-2).
    uint256 public toplamKayit;

    // Adres → takma ad. Veri sözleşmenin storage'ında durur.
    mapping(address => string) public takmaAdi;

    // Adres → kayıtlı mı? Tekrar kaydı engellemek için ayrı tutuyoruz.
    mapping(address => bool) public kayitliMi;

    constructor(string memory _etkinlikAdi, uint256 _kapasite) {
        require(_kapasite > 0, "Kapasite 0 olamaz");
        etkinlikAdi = _etkinlikAdi;
        kapasite = _kapasite;
    }

    /// @param _takmaAd  Eğitim takma adı (gerçek isim değil).
    /// @param _kendimiKadinOlarakTanimliyorum  Katılım koşulu 1; true olmalı.
    /// @param _gelistiriciyim  Katılım koşulu 2; true olmalı.
    function kayitOl(
        string calldata _takmaAd,
        bool _kendimiKadinOlarakTanimliyorum,
        bool _gelistiriciyim
    ) external {
        // Kural 1: Katılım koşulu — kadın beyanı.
        require(_kendimiKadinOlarakTanimliyorum, "Bu etkinlik kendini kadin olarak tanimlayanlar icindir");

        // Kural 1b: Katılım koşulu — geliştirici beyanı.
        require(_gelistiriciyim, "Bu etkinlik gelistiriciler icindir");

        // Kural 2: Boş takma ad reddedilir (İP 21-1).
        require(bytes(_takmaAd).length > 0, "Takma ad bos olamaz");

        // Kural 3: Aynı adres ikinci kez kayıt olamaz (İP 21-1).
        require(!kayitliMi[msg.sender], "Bu adres zaten kayitli");

        // Kural 4: Kapasite dolunca yeni kayıt reddedilir (İP 21-2).
        require(toplamKayit < kapasite, "Kapasite dolu");

        // Bütün kurallar geçtiyse state değişir.
        // Yukarıdaki require'lardan biri tutmazsa işlem revert olur ve
        // bu satırların hiçbiri çalışmaz → reddedilen işlem toplamKayit'i artırmaz (İP 21-3).
        kayitliMi[msg.sender] = true;
        takmaAdi[msg.sender] = _takmaAd;
        toplamKayit += 1;
    }
}
