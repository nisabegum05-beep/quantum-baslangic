// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title  Kadınzincir — ÜÇÜNCÜ SÜRÜM (İP 22)
/// @notice Kadın geliştiricileri bir araya getiren, kapasiteli bir etkinlik.
///         v2'nin bütün kayıt kuralları + görevli + giriş onayı + event'ler.
/// @dev    Beyanlar zincirde doğrulanamaz. Gerçek kontrol kapıda yapılır:
///         görevli kişiyi doğruladıktan sonra girisOnayla ile işaretler.
///         Yetki arayüzde değil, burada (require ile) denetlenir.
contract Kadinzincir {
    // --- Durum (state) ---

    string public etkinlikAdi;
    uint256 public immutable kapasite;
    uint256 public toplamKayit;

    // Görevli: sözleşmeyi deploy eden adres. Deploy'da bir kez belirlenir (İP 22-1).
    address public immutable gorevli;

    mapping(address => string) public takmaAdi;
    mapping(address => bool) public kayitliMi;

    // Katılımcı giriş yaptı mı? Dışarıdan okunabilir (İP 22-2).
    mapping(address => bool) public girisYaptiMi;

    // --- Event'ler (İP 22-3): makbuza yazılan, explorer ve sitenin okuyacağı kayıtlar ---

    // indexed → explorer'da ve sitede bu adrese göre filtrelenebilir.
    event Kaydoldu(address indexed katilimci, string takmaAd, uint256 sira);
    event GirisYapti(address indexed katilimci, address indexed onaylayanGorevli);

    constructor(string memory _etkinlikAdi, uint256 _kapasite) {
        require(_kapasite > 0, "Kapasite 0 olamaz");
        etkinlikAdi = _etkinlikAdi;
        kapasite = _kapasite;
        gorevli = msg.sender; // deploy eden adres görevli olur
    }

    // --- Kayıt (v2 ile aynı kurallar + event) ---

    function kayitOl(
        string calldata _takmaAd,
        bool _kendimiKadinOlarakTanimliyorum,
        bool _gelistiriciyim
    ) external {
        require(_kendimiKadinOlarakTanimliyorum, "Bu etkinlik kendini kadin olarak tanimlayanlar icindir");
        require(_gelistiriciyim, "Bu etkinlik gelistiriciler icindir");
        require(bytes(_takmaAd).length > 0, "Takma ad bos olamaz");
        require(!kayitliMi[msg.sender], "Bu adres zaten kayitli");
        require(toplamKayit < kapasite, "Kapasite dolu");

        kayitliMi[msg.sender] = true;
        takmaAdi[msg.sender] = _takmaAd;
        toplamKayit += 1;

        emit Kaydoldu(msg.sender, _takmaAd, toplamKayit);
    }

    // --- Giriş onayı (yalnızca görevli) ---

    /// @param _katilimci  Kapıda doğrulanan katılımcının adresi.
    function girisOnayla(address _katilimci) external {
        // Kural 1: Yalnızca görevli giriş verebilir (İP 22-1).
        require(msg.sender == gorevli, "Yalnizca gorevli giris onaylayabilir");

        // Kural 2: Kayıtsız adrese giriş verilmez (İP 22-2).
        require(kayitliMi[_katilimci], "Bu adres kayitli degil");

        // Kural 3: Aynı kişi ikinci kez giriş yapamaz; ilk giriş kaydı korunur (İP 22-2).
        require(!girisYaptiMi[_katilimci], "Bu katilimci zaten giris yapti");

        girisYaptiMi[_katilimci] = true;
        emit GirisYapti(_katilimci, msg.sender);
    }
}
