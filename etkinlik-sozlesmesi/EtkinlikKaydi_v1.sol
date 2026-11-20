// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title  Etkinlik Kaydı — İLK SÜRÜM (İP 20)
/// @notice Tek bir etkinliğin adını tutar. Her adres yalnızca KENDİ adına takma ad kaydeder.
///         Bu sürüm bilerek basit: boş ad, tekrar kayıt ve kapasite kuralları YOK (İP 21'de eklenecek).
contract EtkinlikKaydi {
    // Etkinliğin adı. Deploy sırasında bir kez verilir, sonra değiştirilemez.
    // "public" olduğu için Solidity otomatik bir okuma fonksiyonu üretir: etkinlikAdi()
    string public etkinlikAdi;

    // Hangi adres hangi takma adla kayıtlı? Veri burada, sözleşmenin storage'ında durur.
    // "public" → takmaAdi(adres) ile herkes okuyabilir. Kayıtsız adres için "" (boş) döner.
    mapping(address => string) public takmaAdi;

    // constructor: yalnızca deploy anında, bir kez çalışır.
    // Etkinlik adını burada parametre olarak alıyoruz; Remix'te Deploy kutusuna yazılır.
    constructor(string memory _etkinlikAdi) {
        etkinlikAdi = _etkinlikAdi;
    }

    // Kayıt fonksiyonu. Kimin adına kayıt yapılacağı parametre DEĞİL, msg.sender.
    // msg.sender = bu işlemi imzalayan adres → kimse başkasının adına kayıt yapamaz.
    function kayitOl(string calldata _takmaAd) external {
        takmaAdi[msg.sender] = _takmaAd;
    }
}
